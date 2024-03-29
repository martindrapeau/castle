(function() {

  var sequenceDelay = 50,
      flyVelocity = 250,
      flyAcceleration = 400,
      koHurtVelocity = 200,
      fallAcceleration = 1200,
      fallVelocity = 600,
      koDelay = 100;
  
  var animations = {
    "idle-left": {
      sequences: [
        {frame: 0, x: 0, y: 0},
        {frame: 1, x: 0, y: -2},
        {frame: 2, x: -2, y: -2},
        {frame: 3, x: -2, y: 0},
        {frame: 4, x: 0, y: 0},
        {frame: 5, x: 0, y: 2},
        {frame: 6, x: 2, y: 2},
        {frame: 7, x: 2, y: 0}
      ],
      delay: sequenceDelay,
      scaleX: -1,
      scaleY: 1
    },
    "idle-right": {
      sequences: [
        {frame: 0, x: 0, y: 0},
        {frame: 1, x: 0, y: -2},
        {frame: 2, x: -2, y: -2},
        {frame: 3, x: -2, y: 0},
        {frame: 4, x: 0, y: 0},
        {frame: 5, x: 0, y: 2},
        {frame: 6, x: 2, y: 2},
        {frame: 7, x: 2, y: 0}
      ],
      delay: sequenceDelay,
      scaleX: 1,
      scaleY: 1
    },
    "fly-left": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      velocity: flyVelocity,
      acceleration: flyAcceleration,
      yVelocity: flyVelocity,
      yAcceleration: flyAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "fly-right": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      velocity: flyVelocity,
      acceleration: flyAcceleration,
      yVelocity: flyVelocity,
      yAcceleration: flyAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [16, 17, 18, 19, 20],
      delay: koDelay,
      velocity: -koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [16, 17, 18, 19, 20],
      delay: koDelay,
      velocity: koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    }
  };

  var hurtAnimation = {
    sequences: [16, 17, 16],
    delay: 100
  };
  animations["idle-hurt-left"] = _.extend({}, animations["idle-left"], hurtAnimation, {velocity: -koHurtVelocity});
  animations["idle-hurt-right"] = _.extend({}, animations["idle-right"], hurtAnimation, {velocity: koHurtVelocity});
  animations["fly-hurt-left"] = _.extend({}, animations["fly-left"], hurtAnimation, {velocity: -koHurtVelocity});
  animations["fly-hurt-right"] = _.extend({}, animations["fly-right"], hurtAnimation, {velocity: koHurtVelocity});

  var attackAnimation = {
    sequences: [8, 9, 10, 11, 12, 13, 14]
  };
  animations["idle-attack-left"] = _.extend({}, animations["idle-left"], attackAnimation);
  animations["idle-attack-right"] = _.extend({}, animations["idle-right"], attackAnimation);
  animations["fly-attack-left"] = _.extend({}, animations["fly-left"], attackAnimation);
  animations["fly-attack-right"] = _.extend({}, animations["fly-right"], attackAnimation);

  var collisionVelocity = 200,
      collisionAnimation = {
        sequences: [0, 1, 2, 3]
      };
  animations["idle-collision-left"] = _.extend({}, animations["idle-left"], collisionAnimation, {velocity: -collisionVelocity});
  animations["idle-collision-right"] = _.extend({}, animations["idle-right"], collisionAnimation, {velocity: collisionVelocity});
  animations["fly-collision-left"] = _.extend({}, animations["fly-left"], collisionAnimation, {velocity: -collisionVelocity});
  animations["fly-collision-right"] = _.extend({}, animations["fly-right"], collisionAnimation, {velocity: collisionVelocity});


	Backbone.Fly = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      name: "fly",
      spriteSheet: "fly",
      width: 104,
      height: 110,
      state: "idle-left",
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      health: 2,
      attackDamage: 2,
      aiDelay: 500,
      collision: false,
      dX: 0,
      dY: 0
    }),
    animations: animations,
    hurt: function(sprite, dir) {
      this.ouch(dir);
      var fly = this,
          opo = dir == "left" ? "right" : "left";
      this.startNewAnimation(
        this.buildState("fly", "hurt", opo), {
          velocity: this.animations["fly-hurt-"+opo].velocity,
        }, function() {
          fly.set({
            state: this.buildState("idle", dir),
            velocity: 0
          });
          fly._lastAiEvent = _.now();
        }
      );
      return this;
    },
    knockout: Backbone.Spider.prototype.knockout,
    ouch: Backbone.Spider.prototype.ouch,
    hit: function(sprite, dir, dir2) {
      var cur = this.getStateInfo(),
          opo = _.opo(dir);

      if (this._handlingSpriteHit || cur.mov == "ko" || cur.mov2 == "hurt") return this;
      this._handlingSpriteHit = sprite;

      if (sprite.get("hero") && sprite.isAttacking(this) ||
          sprite.get("type") == "projectile") {
        // Damage from an attack
        this.cancelUpdate = true;
        var attackDamage = sprite.get("attackDamage") || 0;
        this.set({health: Math.max(this.get("health") - attackDamage, 0)}, {sprite: sprite, dir: dir, dir2: dir2});
      } else {
        // Wiplash from a collision
        this.cancelUpdate = true;
        this.startNewAnimation(
          this.buildState("fly", "collision", cur.dir),
          {velocity: this.animations["fly-collision-"+opo].velocity},
          this.endHurt
        );
      }

      sprite.trigger("hit", this, opo);

      this._handlingSpriteHit = undefined;
      return this;
    },
    endHurt: function() {
      var cur = this.getStateInfo();
      this.set({
        state: this.buildState("idle", cur.dir),
        velocity: 0,
        yVelocity: 0
      });
      this._lastAiEvent = _.now();
      return this;
    },
    endAttack: function() {
      var cur = this.getStateInfo();
      this.set({
        state: this.buildState("idle", cur.dir),
        velocity: 0,
        yVelocity: 0
      });
      this._lastAiEvent = _.now();
      return this;
    },
    ai: function(dt) {
      var cur = this.getStateInfo();
      if (cur.mov == "ko" || cur.mov2 == "hurt") return this;

      var hero = this.world.sprites.findWhere({hero: true});
      if (!hero || hero.isInsideHouse()) {
        this.set({
          state: this.buildState("idle", cur.dir),
          velocity: 0,
          yVelocity: 0
        });
        this.cancelUpdate = true;
        return this;
      }

      var heroBbox = hero.getBbox(true),
          bbox = this.getBbox(true),
          padding = 64,
          dX = this.get("dX"),
          dY = this.get("dY"),
          newMov = cur.mov,
          newMov2 = cur.mov2,
          newDir = cur.dir,
          newDX = dX,
          newDY = dY,
          attrs = {};

      // Horizontal displacement and state
      if (heroBbox.x2 < bbox.x1) {
        if (cur.mov == "fly" && cur.dir == "right") {
          newMov = "idle";
          newDX = 0;
        } else {
          newMov = "fly";
          newDir = "left";
          newDX = -1;
        }
      } else if (heroBbox.x1 > bbox.x2) {
        if (cur.mov == "fly" && cur.dir == "left") {
          newMov = "idle";
          newDX = 0;
        } else {
          newMov = "fly";
          newDir = "right";
          newDX = 1;
        }
      } else if (cur.mov != "idle") {
        newMov = "idle";
        newDX = 0;
      }

      // Vertical displacement
      if (newMov == "fly") {
        if (heroBbox.y1 < bbox.y1) {
          newDY = -1;
        } else if (heroBbox.y1 > bbox.y1) {
          newDY = 1;
        } else {
          newDY = 0;
        }
      } else {
        newDY = 0;
      }

      if (newDX != dX)
        attrs.dX = dX = newDX;
      if (newDY != dY)
        attrs.dY = dY = newDY;
      if (newMov == "idle") {
        attrs.velocity = 0;
        attrs.yVelocity = 0;
      }

      // Attack hero if in line of sight
      if (newMov2 == null && heroBbox.y2 > bbox.y1 - padding && heroBbox.y1 < bbox.y2 + padding) {
        if (newMov == "idle" && heroBbox.x2 > bbox.x1 && heroBbox.x1 < bbox.x2) {
          newMov2 = "attack";
        } else if (newMov == "fly") {
          var heroWidth = heroBbox.x2 - heroBbox.x1;
          if (newDir == "left" && heroBbox.x2 > bbox.x1 - heroWidth*2 && heroBbox.x1 < bbox.x2) {
            newMov2 = "attack";
          } else if (newDir =="right" && heroBbox.x1 < bbox.x2 + heroWidth*2 && heroBbox.x2 > bbox.x1) {
            newMov2 = "attack";
          }
        }
        if (newMov2 == "attack") {
          this.cancelUpdate = true;
          this.startNewAnimation(this.buildState(newMov, newMov2, newDir), attrs, this.endAttack);
          return this;
        }
      }

      if (newMov != cur.mov || newMov2 != cur.mov2 || newDir != cur.dir)
        attrs.state = this.buildState(newMov, newMov2, newDir);

      if (!_.isEmpty(attrs)) {
        this.cancelUpdate = true;
        this.set(attrs);
      }
      return this;
    },
    update: function(dt) {
      if (!this.world) return true;
      this.cancelUpdate = false;

      var cur = this.getStateInfo();
      if (cur.mov == "ko") return Backbone.Character.prototype.update.apply(this, arguments);

      // Velocity and state
      var velocity = this.get("velocity") || 0,
          yVelocity = this.get("yVelocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          animation = this.getAnimation(),
          aiDelay = this.get("aiDelay"),
          attrs = {};

      attrs.sequenceIndex = this.updateSequenceIndex();

      this.handleAi();
      if (this.cancelUpdate) return true;

      // Handle acceleration
      if (cur.mov == "fly") {
        var targetVelocity = this.get("dX") * animation.velocity;
        if (velocity < targetVelocity) velocity += animation.acceleration * (dt/1000);
        if (velocity >= targetVelocity) velocity = targetVelocity;
        attrs.velocity = velocity;

        var targetYVelocity = this.get("dY") * animation.yVelocity/2;
        if (yVelocity < targetYVelocity) yVelocity += animation.yAcceleration * (dt/1000);
        if (yVelocity >= targetYVelocity) yVelocity = targetYVelocity;
        attrs.yVelocity = yVelocity;
      }

      // Collision detection
      var tileWidth = this.get("width"),
          tileHeight = this.get("height"),
          paddingLeft = this.get("paddingLeft"),
          paddingRight = this.get("paddingRight"),
          paddingBottom = this.get("paddingBottom"),
          paddingTop = this.get("paddingTop"),
          charWidth = tileWidth - paddingLeft - paddingRight,
          charHeight = tileHeight - paddingTop - paddingBottom,
          charBottomY = Math.round(y + yVelocity * (dt/1000)) + tileHeight - paddingBottom,
          charTopY = charBottomY - charHeight,
          charLeftX = Math.round(x + velocity * (dt/1000)) + paddingLeft,
          charRightX = charLeftX + charWidth;

      // When not in play mode, do not allow horizontal displacements or animations
      if (this.world.get("state") != "play") {
        attrs.velocity = velocity = 0;
        attrs.yVelocity = yVelocity = 0;
        attrs.sequenceIndex = this.get("sequenceIndex");

      } else {

        this.buildCollisionMap(charTopY, charRightX, charBottomY, charLeftX);
        this.world.findCollisions(this.collisionMap, null, this, true);
        
        // Walls and other obstacles
        if (velocity <= 0) {
          // Turn around if obstacle left
          var worldLeft = -tileWidth,
              leftSprite = this.collisionMap.left.sprite,
              leftX = _.maxNotNull([
                worldLeft,
                leftSprite ? leftSprite.getRight(true) : null
              ]);

          if (charLeftX <= leftX) {
            if (charLeftX <= worldLeft) {
              this.world.remove(this);
              return false;
            }
            if (leftSprite && cur.mov2 != "hurt") {
              if (leftSprite) leftSprite.trigger("hit", this, "right");
              if (this.cancelUpdate) return true;
            }
          }
        }

        if (velocity >= 0) {
          // Turn around if obstacle to the right
          var worldRight = this.world.width(),
              rightSprite = this.collisionMap.right.sprite,
              rightX = _.minNotNull([
                worldRight,
                rightSprite ? rightSprite.getLeft(true) : null
              ]);

          if (charRightX >= rightX) {
            if (charRightX >= worldRight) {
              this.world.remove(this);
              return false;
            }
            if (rightSprite && cur.mov2 != "hurt") {
              if (rightSprite) rightSprite.trigger("hit", this, "left");
              if (this.cancelUpdate) return true;
            }
          }
        }
      }

      if (velocity) attrs.x = x = x + velocity * (dt/1000);
      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      if (typeof this.onUpdate == "function") return this.onUpdate(dt);
      return true;
    }
	});

  Backbone.pagedSprites.c.push("fly");

}).call(this);
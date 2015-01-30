(function() {

  var sequenceDelay = 50,
      flyVelocity = 250,
      flyAcceleration = 200,
      koHurtVelocity = 200,
      fallAcceleration = 1200,
      fallVelocity = 600,
      koDelay = 100;
  
  var animations = {
    "idle-left": {
      sequences: [
        {frame: 0, x: 0, y: 0},
        {frame: 1, x: 0, y: -1},
        {frame: 2, x: -1, y: -1},
        {frame: 3, x: -1, y: 0},
        {frame: 4, x: 0, y: 0},
        {frame: 5, x: 0, y: 1},
        {frame: 6, x: 1, y: 1},
        {frame: 7, x: 1, y: 0}
      ],
      delay: sequenceDelay,
      scaleX: -1,
      scaleY: 1
    },
    "idle-right": {
      sequences: [
        {frame: 0, x: 0, y: 0},
        {frame: 1, x: 0, y: -1},
        {frame: 2, x: -1, y: -1},
        {frame: 3, x: -1, y: 0},
        {frame: 4, x: 0, y: 0},
        {frame: 5, x: 0, y: 1},
        {frame: 6, x: 1, y: 1},
        {frame: 7, x: 1, y: 0}
      ],
      delay: sequenceDelay,
      scaleX: 1,
      scaleY: 1
    },
    "fly-left": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      velocity: -flyVelocity,
      acceleration: flyAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "fly-right": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      velocity: flyVelocity,
      acceleration: flyAcceleration,
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
      aiDelay: 1500,
      collision: false
    }),
    animations: animations,
    onHealthChange: function(model, health, options) {
      options || (options = {});
      var cur = this.getStateInfo(),
          dir = options.dir || cur.dir,
          opo = dir == "left" ? "right" : "left";
      
      if (health == 0)
        return this.knockout(null, dir);
      else if (health < this.previous("health")) {
        var fly = this;
        this.startNewAnimation(
          this.buildState("fly", "hurt", opo), {
            velocity: this.animations["fly-hurt-"+opo].velocity,
          }, function() {
            fly.set({
              state: this.buildState("idle", dir),
              velocity: 0
            });
            fly.lastAIEvent = _.now();
          }
        );
      }
      this.lastAIEvent = _.now();

      return this;
    },
    hit: function(sprite, dir, dir2) {
      var cur = this.getStateInfo(),
          opo = dir == "left" ? "right" : "left";

      if (cur.mov2 == "hurt") return this;

      if (dir2 == "attack") {
        // Damage from an attack
        this.cancelUpdate = true;
        var attackDamage = sprite.get("attackDamage") || 1;
        this.set({health: Math.max(this.get("health") - attackDamage, 0)}, {sprite: sprite, dir: dir, dir2: dir2});
      } else if (dir2 == "collision") {
        // Wiplash from a collision
        this.cancelUpdate = true;
        var fly = this;
        this.startNewAnimation(
          this.buildState("fly", "collision", cur.dir), {
            velocity: this.animations["fly-collision-"+opo].velocity,
          }, function() {
            fly.set({
              state: this.buildState("idle", cur.dir),
              velocity: 0
            });
            fly.lastAIEvent = _.now();
          }
        );
      }

      return this;
    },
    update: function(dt) {
      if (!this.world) return true;
      this.cancelUpdate = false;

      var cur = this.getStateInfo();
      if (cur.mov == "ko") return Backbone.Character.prototype.update.apply(this, arguments);

      // Velocity and state
      var now = _.now(),
          velocity = this.get("velocity") || 0,
          yVelocity = this.get("yVelocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          animation = this.getAnimation(),
          aiDelay = this.get("aiDelay"),
          attrs = {};

      attrs.sequenceIndex = this.updateSequenceIndex();

      // AI
      // !*@* very linear and mechanic for now - gotta change this...
      if (!this.lastAIEvent)
        this.lastAIEvent = now;
      else if (now > this.lastAIEvent + aiDelay && cur.mov != "ko" && cur.mov2 == null) {
        var hero = this.world.sprites.findWhere({hero: true});

        if (hero) {
          var bbox = hero.getBbox(true),
              newMov = cur.mov,
              newDir = cur.dir,
              newVelocity = velocity,
              newYVelocity = yVelocity;

          // Horizontal displacement and state
          if (bbox.x2 < this.getLeft(true)) {
            if (cur.mov == "fly" && cur.dir == "right") {
              newMov = "idle";
              newVelocity = 0;
            } else {
              newMov = "fly";
              newDir = "left";
              newVelocity = -flyVelocity;
            }
          } else if (bbox.x1 > this.getRight(true)) {
            if (cur.mov == "fly" && cur.dir == "left") {
              newMov = "idle";
              newVelocity = 0;
            } else {
              newMov = "fly";
              newDir = "right";
              newVelocity = flyVelocity;
            }
          } else if (cur.mov != "idle") {
            newMov = "idle";
            newVelocity = 0;
          }

          // Vertical displacement
          if (newMov == "fly") {
            if (bbox.y2 < this.getTop(true)) {
              newYVelocity = -flyVelocity/2;
            } else if (bbox.y1 > this.getBottom(true)) {
              newYVelocity = flyVelocity/2;
            } else {
              newYVelocity = 0;
            }
          } else {
            newYVelocity = 0;
          }

          if (newMov != cur.mov || newDir != cur.dir)
            attrs.state = this.buildState(newMov, newDir);
          if (newVelocity != velocity)
            attrs.velocity = velocity = newVelocity;
          if (newYVelocity != yVelocity)
            attrs.yVelocity = yVelocity = newYVelocity;
          this.lastAIEvent = now;

        } else if (cur.mov != "idle") {
          attrs.state = this.buildState("idle", cur.dir);
          attrs.velocity = velocity = 0;
          attrs.yVelocity = yVelocity =0;
        }
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
              sprite1 = this.collisionMap.leftTop.sprite,
              sprite2 = this.collisionMap.leftBottom.sprite,
              leftX = _.maxNotNull([
                worldLeft,
                sprite1 ? sprite1.getRight(true) : null,
                sprite2 ? sprite2.getRight(true) : null
              ]);

          if (charLeftX <= leftX) {
            if (charLeftX <= worldLeft) {
              this.world.remove(this);
              return false;
            }
            /*velocity = velocity * -1;
            attrs.state = this.buildState(cur.mov, null, cur.opo);
            attrs.x = x = leftX - charWidth - paddingLeft;*/
            if ((sprite1 || sprite2) && cur.mov2 != "hurt" && cur.mov2 != "collision") {
              if (sprite1) sprite1.trigger("hit", this, "right");
              if (sprite2) sprite2.trigger("hit", this, "right");
              if (this.cancelUpdate) return true;
            }
          }
        }

        if (velocity >= 0) {
          // Turn around if obstacle to the right
          var worldRight = this.world.width(),
              sprite1 = this.collisionMap.rightTop.sprite,
              sprite2 = this.collisionMap.rightBottom.sprite,
              rightX = _.minNotNull([
                worldRight,
                sprite1 ? sprite1.getLeft(true) : null,
                sprite2 ? sprite2.getLeft(true) : null
              ]);

          if (charRightX >= rightX) {
            if (charRightX >= worldRight) {
              this.world.remove(this);
              return false;
            }
            /*velocity = velocity * -1;
            attrs.state = this.buildState(cur.mov, null, cur.opo);
            attrs.x = x = rightX - paddingLeft;*/
            if ((sprite1 || sprite2) && cur.mov2 != "hurt" && cur.mov2 != "collision") {
              if (sprite1) sprite1.trigger("hit", this, "left");
              if (sprite2) sprite2.trigger("hit", this, "left");
              if (this.cancelUpdate) return true;
            }
          }
        }
      }

      if (velocity) attrs.x = x = x + velocity * (dt/1000);
      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      //if (this.engine.debugPanel) this.engine.debugPanel.set({state: this.get("state")})
      return true;      
    },
    buildCollisionMap: function(top, right, bottom, left) {
      this.collisionMap || (this.collisionMap = {
        topLeft: {x: 0, y: 0, dir: "top", sprites: [], sprite: null},
        topRight: {x: 0, y: 0, dir: "top", sprites: [], sprite: null},
        rightTop: {x: 0, y: 0, dir: "right", sprites: [], sprite: null},
        rightBottom: {x: 0, y: 0, dir: "right", sprites: [], sprite: null},
        bottomLeft: {x: 0, y: 0, dir: "bottom", sprites: [], sprite: null},
        bottomRight: {x: 0, y: 0, dir: "bottom", sprites: [], sprite: null},
        leftTop: {x: 0, y: 0, dir: "left", sprites: [], sprite: null},
        leftBottom: {x: 0, y: 0, dir: "left", sprites: [], sprite: null}
      });

      var width = right - left,
          height = bottom - top;
      this.collisionMap.topLeft.x = this.collisionMap.bottomLeft.x = left + width*0.2;
      this.collisionMap.topRight.x = this.collisionMap.bottomRight.x = left + width*0.8;
      this.collisionMap.topLeft.y = this.collisionMap.topRight.y = top;
      this.collisionMap.bottomLeft.y = this.collisionMap.bottomRight.y = bottom;
      this.collisionMap.leftTop.y = this.collisionMap.rightTop.y = top + height*0.2;
      this.collisionMap.leftBottom.y = this.collisionMap.rightBottom.y = top + height*0.8;
      this.collisionMap.leftTop.x = this.collisionMap.leftBottom.x = left;
      this.collisionMap.rightTop.x = this.collisionMap.rightBottom.x = right;
    }
	});

  Backbone.pagedSprites.c.push("fly");

}).call(this);
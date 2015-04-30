(function() {

  var sequenceDelay = 50,
      walkVelocity = 150,
      fallAcceleration = 1200,
      fallVelocity = 600,
      koDelay = 100;
  
  var animations = {
    "idle-left": {
      sequences: [0],
      delay: sequenceDelay,
      velocity: 0,
      scaleX: -1,
      scaleY: 1
    },
    "idle-right": {
      sequences: [0],
      delay: sequenceDelay,
      velocity: 0,
      scaleX: 1,
      scaleY: 1
    },
    "walk-left": {
      sequences: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      delay: sequenceDelay,
      velocity: -walkVelocity,
      scaleX: -1,
      scaleY: 1
    },
    "walk-right": {
      sequences: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      delay: sequenceDelay,
      velocity: walkVelocity,
      scaleX: 1,
      scaleY: 1
    },
    "fall-left": {
      sequences: [17],
      delay: sequenceDelay,
      velocity: -walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "fall-right": {
      sequences: [17],
      delay: sequenceDelay,
      velocity: walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [21, 22, 23, 24],
      delay: koDelay,
      velocity: -walkVelocity*0.5,
      yVelocity: fallVelocity*0.75,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [21, 22, 23, 24],
      delay: koDelay,
      velocity: walkVelocity*0.5,
      yVelocity: fallVelocity*0.75,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    }
  };

  var hurtAnimation = {
        sequences: [21],
        delay: 300,
        yVelocity: fallVelocity,
        yAcceleration: fallAcceleration
      };
  animations["idle-hurt-left"] = _.extend({}, animations["idle-left"], hurtAnimation);
  animations["idle-hurt-right"] = _.extend({}, animations["idle-right"], hurtAnimation);
  animations["walk-hurt-left"] = _.extend({}, animations["walk-left"], hurtAnimation);
  animations["walk-hurt-right"] = _.extend({}, animations["walk-right"], hurtAnimation);
  animations["fall-hurt-left"] = _.extend({}, animations["fall-left"], hurtAnimation);
  animations["fall-hurt-right"] = _.extend({}, animations["fall-right"], hurtAnimation);

  var attackAnimation = {
    sequences: [13, 14, 15, 16, 17, 18, 19, 19]
  };
  animations["idle-attack-left"] = _.extend({}, animations["idle-left"], attackAnimation);
  animations["idle-attack-right"] = _.extend({}, animations["idle-right"], attackAnimation);
  animations["walk-attack-left"] = _.extend({}, animations["walk-left"], attackAnimation);
  animations["walk-attack-right"] = _.extend({}, animations["walk-right"], attackAnimation);

	Backbone.Skeleton1 = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      name: "skeleton1",
      spriteSheet: "skeletons",
      width: 160,
      height: 128,
      state: "idle-left",
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 32,
      paddingBottom: 4,
      health: 2,
      attackDamage: 2,
      aiDelay: 250,
      aiState: null, // patrol, think or charge
      aiPatrolDelay: 1000
    }),
    animations: animations,
    onBeforeFall: function(condition) {
      var cur = this.getStateInfo();
      if (cur.mov2 == "hurt") return this;
      this.set({
        state: this.buildState("walk", cur.opo),
        velocity: this.animations["walk-"+cur.opo].velocity
      });
      this.cancelUpdate = true;
      return this;
    },
    endAttack: function() {
      var cur = this.getStateInfo();
      this.set({
        state: this.buildState("idle", cur.dir),
        velocity: 0
      });
      this.lastAIEvent = _.now();
      return this;
    },
    knockout: function(sprite, dir) {
      this.ouch(dir);
      Backbone.Character.prototype.knockout.apply(this, arguments);
      this.set("ignorePhysics", false);
      return this;
    },
    hurt: function(sprite, dir) {
      this.ouch(dir);
      return Backbone.Character.prototype.hurt.apply(this, arguments);
    },
    ouch: function(dir) {
      if (!this.ouchSprite) this.ouchSprite = new Backbone.Explosion();
      this.ouchSprite.set({
        x: dir == "left" ? this.getLeft(true) : (this.getRight(true) - this.ouchSprite.get("width")),
        y: this.getTop(true)
      });
      this.world.add(this.ouchSprite);
      return this;
    },
    hit: function(sprite, dir, dir2) {
      var cur = this.getStateInfo(),
          opo = _.opo(dir);

      if (this._handlingSpriteHit || cur.mov == "ko" || cur.mov2 == "hurt") return this;
      this._handlingSpriteHit = sprite;

      if (sprite.get("hero") && sprite.isAttacking(this) ||
          sprite.get("type") == "projectile") {
        this.cancelUpdate = true;
        var attackDamage = sprite.get("attackDamage") || 0;
        this.set({health: Math.max(this.get("health") - attackDamage, 0)}, {sprite: sprite, dir: dir, dir2: dir2});
      } else if (cur.dir == dir) {
        this.cancelUpdate = true;
        if (cur.mov2 == null)
          this.set("state", this.buildState(cur.mov, cur.opo));
        else
          this.set("state", this.buildState("idle", cur.mov2, cur.dir));
      }

      sprite.trigger("hit", this, opo);

      this._handlingSpriteHit = undefined;
      return this;
    },
    changeWalkVelocity: function(velocity, sequenceDelay) {
      this.animations["walk-left"].velocity =
        this.animations["walk-hurt-left"].velocity =
        this.animations["fall-left"].velocity = 
        this.animations["fall-hurt-left"].velocity = 
        this.animations["walk-attack-left"].velocity = -velocity;
      this.animations["walk-right"].velocity =
        this.animations["walk-hurt-right"].velocity =
        this.animations["fall-right"].velocity = 
        this.animations["fall-hurt-right"].velocity = 
        this.animations["walk-attack-right"].velocity = velocity;
      this.animations["walk-left"].delay = 
      this.animations["walk-right"].delay = sequenceDelay;
    },
    changeAiState: function(newAiState, newDir) {
      var cur = this.getStateInfo();
      switch (newAiState) {
        case "charge":
            this.cancelUpdate = true;
            this.set({
              aiState: "charge",
              state: this.buildState(cur.mov, cur.mov2, newDir || cur.dir)
            });
            this.changeWalkVelocity(walkVelocity, sequenceDelay);
          break;
        case "patrol":
            this.cancelUpdate = true;
            this.set({
              aiState: "patrol",
              state: this.buildState(cur.mov, cur.mov2, newDir || cur.dir)
            });
            this.changeWalkVelocity(walkVelocity*0.5, sequenceDelay*1.5);
          break;
      }
    },
    isSpriteInLigneOfSight: function(sprite, lineOfSight) {
      var spriteBbox = sprite.getBbox(true),
          bbox = this.getBbox(true),
          spriteWidth = bbox.x2 - bbox.x1,
          heroInDir = sprite.getCenterX(true) < this.getCenterX(true) ? "left" : "right";
      lineOfSight || (lineOfSight = spriteWidth * 3);

      if (spriteBbox.y2 < bbox.y1 || spriteBbox.y1 > bbox.y2) return false;
      if (spriteBbox.x2 < bbox.x1 - lineOfSight || spriteBbox.x1 > bbox.x2 + lineOfSight) return false;

      return true;
    },
    ai: function(dt) {
      Backbone.Character.prototype.ai.apply(this, arguments);
      if (this.cancelUpdate) return this;

      var cur = this.getStateInfo();
      if ((cur.mov != "walk" && cur.mov != "idle") || cur.mov2 != null) return this;

      var hero = this.world.sprites.findWhere({hero: true});
      if (!hero) return this;

      var heroBbox = hero.getBbox(true),
          bbox = this.getBbox(true),
          heroWidth = bbox.x2 - bbox.x1,
          heroInDir = hero.getCenterX(true) < this.getCenterX(true) ? "left" : "right",
          inLighOfSight = this.isSpriteInLigneOfSight(hero);
      if (heroBbox.y2 < bbox.y1 || heroBbox.y1 > bbox.y2) return this;

      var aiState = this.get("aiState");

      switch (aiState) {
        case "patrol":
          if (cur.dir == heroInDir && inLighOfSight)
            this.changeAiState("charge");
          break;

        case "charge":
          // Attack if real close
          if ((cur.dir == "left" && heroBbox.x2 >= bbox.x1 - heroWidth && heroBbox.x1 <= bbox.x2) ||
              (cur.dir == "right" && heroBbox.x1 <= bbox.x2 + heroWidth && heroBbox.x2 >= bbox.x1)) {
            this.cancelUpdate = true;
            this.startNewAnimation(this.buildState("walk", "attack", cur.dir), null, this.endAttack);
            return this;
          }

          // Walk in hero's direction
          if (cur.mov == "idle" || cur.dir != heroInDir) {
            var newState = this.buildState("walk", heroInDir);
            this.cancelUpdate = true;
            this.set({
              state: newState,
              velocity: this.animations[newState].velocity
            });
            return this;
          }

          // Fall back in patrol mode if out of sight
          if (!inLighOfSight) {
            this.changeAiState("patrol", cur.opo);
          }

        break;

        default:
          this.changeAiState("patrol");
          break;

      }

      return this;
    }
	});

  Backbone.pagedSprites.c.push("skeleton1");

}).call(this);
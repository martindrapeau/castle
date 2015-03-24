(function() {

  var sequenceDelay = 50,
      walkVelocity = 200,
      fallAcceleration = 1200,
      fallVelocity = 600,
      koDelay = 100;
  
  var animations = {
    "idle-left": {
      sequences: [0, 1, 2, 3, 4, 5],
      delay: sequenceDelay,
      velocity: 0,
      scaleX: -1,
      scaleY: 1
    },
    "idle-right": {
      sequences: [0, 1, 2, 3, 4, 5],
      delay: sequenceDelay,
      velocity: 0,
      scaleX: 1,
      scaleY: 1
    },
    "walk-left": {
      sequences: [8, 9, 10, 11, 12, 13, 14, 15],
      delay: sequenceDelay,
      velocity: -walkVelocity,
      scaleX: -1,
      scaleY: 1
    },
    "walk-right": {
      sequences: [8, 9, 10, 11, 12, 13, 14, 15],
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
      sequences: [25, 26, 27, 28, 29, 30],
      delay: koDelay,
      velocity: -walkVelocity*0.5,
      yVelocity: fallVelocity*0.75,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [25, 26, 27, 28, 29, 30],
      delay: koDelay,
      velocity: walkVelocity*0.5,
      yVelocity: fallVelocity*0.75,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    }
  };

  var hurtAnimation = {
        sequences: [24, 25],
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
    sequences: [16, 17, 18, 19, 20, 21]
  };
  animations["idle-attack-left"] = _.extend({}, animations["idle-left"], attackAnimation);
  animations["idle-attack-right"] = _.extend({}, animations["idle-right"], attackAnimation);
  animations["walk-attack-left"] = _.extend({}, animations["walk-left"], attackAnimation);
  animations["walk-attack-right"] = _.extend({}, animations["walk-right"], attackAnimation);

	Backbone.Spider = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      name: "spider",
      spriteSheet: "spider",
      width: 130,
      height: 80,
      state: "idle-left",
      paddingTop: 32,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      health: 2,
      attackDamage: 2,
      aiDelay: 500
    }),
    animations: animations,
    hit: function(sprite, dir, dir2) {
      if (dir == "top" && sprite.get("type") == "breakable-tile") {
        if (this._handlingSpriteHit) return this;
        this._handlingSpriteHit = sprite;
        sprite.trigger("hit", this, "bottom");
        this._handlingSpriteHit = undefined;
        return this;
      }
      return Backbone.Character.prototype.hit.apply(this, arguments);
    },
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
      return Backbone.Character.prototype.knockout.apply(this, arguments);
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
    ai: function(dt) {
      Backbone.Character.prototype.ai.apply(this, arguments);
      if (this.cancelUpdate) return this;

      var cur = this.getStateInfo();
      if ((cur.mov != "walk" && cur.mov != "idle") || cur.mov2 != null) return this;

      var hero = this.world.sprites.findWhere({hero: true});
      if (!hero) return this;

      var heroBbox = hero.getBbox(true),
          bbox = this.getBbox(true);
      if (heroBbox.y2 < bbox.y1 || heroBbox.y1 > bbox.y2) return this;

      if (cur.mov == "idle") {
        this.cancelUpdate = true;
        this.set({
          state: this.buildState("walk", cur.dir),
          velocity: this.animations["walk-"+cur.dir].velocity
        });
        return this;
      }

      // Attack hero if in line of sight
      var heroWidth = heroBbox.x2 - heroBbox.x1;
      if ((cur.dir == "left" && heroBbox.x2 >= bbox.x1 - heroWidth*1.5 && heroBbox.x1 <= bbox.x2) ||
          (cur.dir == "right" && heroBbox.x1 <= bbox.x2 + heroWidth*1.5 && heroBbox.x2 >= bbox.x1)) {
        this.cancelUpdate = true;
        this.startNewAnimation(this.buildState(cur.mov, "attack", cur.dir), null, this.endAttack);
      }

      return this;
    }
	});

  Backbone.pagedSprites.c.push("spider");

}).call(this);
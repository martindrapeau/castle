(function() {

  // Velocity and acceleration values in absolute values
  var walkVelocity = 160,
      walkMinVelocity = 60,
      walkAcceleration = 300,
      runVelocity = 220,
      runMinVelocity = 100,
      runAcceleration = 400,
      releaseDeceleration = 200,
      skidDeceleration = 400,
      jumpVelocity = 650,
      jumpDeceleration = 1400,
      jumpHoldDeceleration = 900,
      fallAcceleration = 1200,
      airTurnaroundDeceleration = 400,
      fallVelocity = 600,
      idleDelay = 2500,
      walkDelay = 75,
      koDelay = 100,
      runDelay = 50,
      attackDelay = 50,
      attackSequences = [84, 85, 86, 87, 88, 89],
      jumpAttackSequences = [98, 99, 100, 101, 102, 103],
      skidAttackSequences = [112, 113, 114, 115, 116],
      walkSequences = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      runSequences = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
      hurtDelay = 300,
      hurtBounceVelocity = -300,
      hurtSequences = [71, 71];

  var animations = {
    "idle-left": {
      sequences: [0, 1],
      delay: idleDelay,
      velocity: 0,
      acceleration: 0,
      scaleX: -1,
      scaleY: 1
    },
    "idle-right": {
      sequences: [0, 1],
      delay: idleDelay,
      velocity: 0,
      acceleration: 0,
      scaleX: 1,
      scaleY: 1
    },
    "walk-left": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: -walkVelocity,
      minVelocity: -walkMinVelocity,
      acceleration: walkAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "walk-right": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: walkVelocity,
      minVelocity: walkMinVelocity,
      acceleration: walkAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "run-left": {
      sequences: runSequences,
      delay: runDelay,
      velocity: -runVelocity,
      minVelocity: -runMinVelocity,
      acceleration: runAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "run-right": {
      sequences: runSequences,
      delay: runDelay,
      velocity: runVelocity,
      minVelocity: runMinVelocity,
      acceleration: runAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "release-left": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: 0,
      acceleration: releaseDeceleration,
      scaleX: -1,
      scaleY: 1
    },
    "release-right": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: 0,
      acceleration: releaseDeceleration,
      scaleX: 1,
      scaleY: 1
    },
    "skid-left": {
      sequences: [42],
      velocity: 0,
      acceleration: skidDeceleration,
      scaleX: 1,
      scaleY: 1
    },
    "skid-right": {
      sequences: [42],
      velocity: 0,
      acceleration: skidDeceleration,
      scaleX: -1,
      scaleY: 1
    },
    "jump-left": {
      sequences: [56, 57],
      delay: 1000,
      velocity: -walkVelocity,
      acceleration: airTurnaroundDeceleration,
      yStartVelocity: -jumpVelocity,
      yEndVelocity: fallVelocity,
      yAscentAcceleration: jumpDeceleration,
      yHoldAscentAcceleration: jumpHoldDeceleration,
      yDescentAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "jump-right": {
      sequences: [56, 57],
      delay: 1000,
      velocity: walkVelocity,
      acceleration: airTurnaroundDeceleration,
      yStartVelocity: -jumpVelocity,
      yEndVelocity: fallVelocity,
      yAscentAcceleration: jumpDeceleration,
      yHoldAscentAcceleration: jumpHoldDeceleration,
      yDescentAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [70, 71, 72],
      delay: koDelay,
      velocity: -walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [70, 71, 72],
      delay: koDelay,
      velocity: walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "dead-left": {
      sequences: [73],
      velocity: 0,
      scaleX: -1,
      scaleY: 1
    },
    "dead-right": {
      sequences: [73],
      velocity: 0,
      scaleX: 1,
      scaleY: 1
    }
  };
  animations["idle-attack-left"] = _.extend({}, animations["idle-left"], {sequences: attackSequences, delay: attackDelay});
  animations["idle-attack-right"] = _.extend({}, animations["idle-right"], {sequences: attackSequences, delay: attackDelay});
  animations["walk-attack-left"] = _.extend({}, animations["walk-left"], {sequences: attackSequences, delay: attackDelay});
  animations["walk-attack-right"] = _.extend({}, animations["walk-right"], {sequences: attackSequences, delay: attackDelay});
  animations["run-attack-left"] = _.extend({}, animations["run-left"], {sequences: attackSequences, delay: attackDelay});
  animations["run-attack-right"] = _.extend({}, animations["run-right"], {sequences: attackSequences, delay: attackDelay});
  animations["release-attack-left"] = _.extend({}, animations["release-left"], {sequences: attackSequences, delay: attackDelay});
  animations["release-attack-right"] = _.extend({}, animations["release-right"], {sequences: attackSequences, delay: attackDelay});
  animations["jump-attack-left"] = _.extend({}, animations["jump-left"], {sequences: jumpAttackSequences, delay: attackDelay});
  animations["jump-attack-right"] = _.extend({}, animations["jump-right"], {sequences: jumpAttackSequences, delay: attackDelay});
  animations["skid-attack-left"] = _.extend({}, animations["skid-left"], {sequences: skidAttackSequences, delay: attackDelay});
  animations["skid-attack-right"] = _.extend({}, animations["skid-right"], {sequences: skidAttackSequences, delay: attackDelay});

  var hurtAnimation = {sequences: hurtSequences, delay: hurtDelay};
  animations["idle-hurt-left"] = _.extend({}, animations["idle-left"], hurtAnimation);
  animations["idle-hurt-right"] = _.extend({}, animations["idle-right"], hurtAnimation);
  animations["walk-hurt-left"] = _.extend({}, animations["walk-left"], hurtAnimation);
  animations["walk-hurt-right"] = _.extend({}, animations["walk-right"], hurtAnimation);
  animations["run-hurt-left"] = _.extend({}, animations["run-left"], hurtAnimation);
  animations["run-hurt-right"] = _.extend({}, animations["run-right"], hurtAnimation);
  animations["release-hurt-left"] = _.extend({}, animations["release-left"], hurtAnimation);
  animations["release-hurt-right"] = _.extend({}, animations["release-right"], hurtAnimation);
  animations["jump-hurt-left"] = _.extend({}, animations["jump-left"], hurtAnimation);
  animations["jump-hurt-right"] = _.extend({}, animations["jump-right"], hurtAnimation);
  animations["skid-hurt-left"] = _.extend({}, animations["skid-left"], hurtAnimation);
  animations["skid-hurt-right"] = _.extend({}, animations["skid-right"], hurtAnimation);

  Backbone.Hero1 = Backbone.Hero.extend({
    defaults: _.extend({}, Backbone.Hero.prototype.defaults, {
      name: "hero1",
      type: "character",
      hero: true,
      spriteSheet: "hero1",
      width: 128,
      height: 128,
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 24,
      paddingBottom: 4,
      state: "idle-right",
      velocity: 0,
      acceleration: 0,
      yVelocity: 0,
      yAcceleration: 0,
      collision: true,
      dead: false,
      health: 8,
      healthMax: 8,
      attackDamage: 1,
      maxAttackDamage: 1,
      ignoreInput: false,
      canAttack: true,
      canTurnInJump: true,
      coins: 0,
      key: false,
      potion: null,
      houseId: undefined
    }),
    animations: animations,
    isInsideHouse: function() {
      return !!this.get("houseId");
    },
    knockout: function(sprite, dir) {
      dir || (dir = cur.dir);
      var cur = this.getStateInfo(),
          opo = dir == "left" ? "right" : "left",
          state = this.buildState("ko", opo);
      
      this.set({
        state: state,
        velocity: this.animations[state].velocity,
        yVelocity: -this.animations[state].yVelocity/2,
        nextState: this.buildState("dead", null, opo),
        dead: true,
        collision: true
      });
      this.cancelUpdate = true;
      return this;
    },
    hurt: function(sprite, dir) {
      dir = dir == "right" ? "right" : "left";
      var opo = _.opo(dir);
      this.set({
        state: this.buildState("jump", "hurt", opo),
        nextState: this.buildState("idle", dir),
        yVelocity: hurtBounceVelocity,
        velocity: hurtBounceVelocity * (dir == "left" ? -1 : 1) / 2,
        sequenceIndex: 0
      });
      return this;
    },
    hit: function(sprite, dir, dir2) {
      if (this._handlingSpriteHit) return this;
      this._handlingSpriteHit = sprite;

      var cur = this.getStateInfo(),
          type = sprite.get("type"),
          attackDamage = this.get("attackDamage");

      if (type == "barrier") return this;

      if (type == "breakable-tile") {
        if (this.isAttacking(sprite)) {
          this.set("attackDamage", Math.min(attackDamage-1, 0));
        }
      } if (type == "artifact") {
        switch (sprite.get("name")) {
          case "a-coin":
            this.cancelUpdate = true;
            this.set("coins", this.get("coins") + 1);
            break;
          case "a-coin-bag":
            this.cancelUpdate = true;
            this.set("coins", this.get("coins") + 5);
            break;
          case "a-health":
            if (cur.mov2 != "hurt") {
              this.cancelUpdate = true;
              this.set({health: Math.min(this.get("health") + 2, this.get("healthMax"))}, {sprite: sprite, dir: dir, dir2: dir2});
            }
            break;
          case "a-death":
            if (cur.mov2 != "hurt" && cur.mov2 != "attack") {
              this.cancelUpdate = true;
              this.set({health: Math.max(this.get("health") - 4, 0)}, {sprite: sprite, dir: dir, dir2: dir2});
            }
            break;
          case "a-key":
            this.cancelUpdate = true;
            this.set("key", true);
            break;
          case "a-red-potion":
            if (cur.mov2 != "hurt") {
              this.cancelUpdate = true;
              this.set({health: Math.min(this.get("health") + 8, this.get("healthMax"))}, {sprite: sprite, dir: dir, dir2: dir2});
            }
            break;
          case "a-blue-potion":
            this.cancelUpdate = true;
            this.set("potion", "blue");
            break;
          case "a-green-potion":
            this.cancelUpdate = true;
            this.set("potion", "green");
            break;
        }
      } else if (type == "character" && cur.mov2 != "hurt") {
        if (this.isAttacking(sprite)) {
          // Hero is attacking
          this.set("attackDamage", Math.min(attackDamage-1, 0));
        } else if (sprite.isAttacking(this)) {
          this.cancelUpdate = true;
          var attackDamage = sprite.get("attackDamage") || 1;
          this.set({health: Math.max(this.get("health") - attackDamage, 0)}, {sprite: sprite, dir: dir, dir2: dir2});
        }
        sprite.trigger("hit", this, cur.opo);
      }

      this._handlingSpriteHit = undefined;
      return this;
    },
    startAttack: function() {
      this.attackingSprite = undefined;
      this.set("attackDamage", this.get("maxAttackDamage"));
      return Backbone.Hero.prototype.startAttack.apply(this, arguments);
    },
    endAttack: function() {
      this.attackingSprite = undefined;
      this.set("attackDamage", this.get("maxAttackDamage"));
      return Backbone.Hero.prototype.endAttack.apply(this, arguments);
    },
    getAttackPoint: function() {
      if (this.attributes.state.indexOf("-attack") == -1) return null;

      this.attackCollisionPoints || (this.attackCollisionPoints = [
        {x: 40, y: 0},
        {x: 70, y: 0},
        {x: 110, y: 10},
        {x: 114, y: 60},
        {x: 120, y: 90},
        {x: 114, y: 120}
      ]);

      var sequenceIndex =  this.get("sequenceIndex"),
          point = this.attackCollisionPoints[sequenceIndex],
          x = this.get("x") + (this.attributes.state.indexOf("-left") >= 0 ? this.get("width") - point.x : point.x),
          y = this.get("y") + point.y;

      return {x: x, y: y};
    },
    isAttacking: function(sprite) {
      if (this.attackingSprite != sprite || !this.get("attackDamage")) return false;

      var attackPoint = this.getAttackPoint();
      if (!attackPoint) return false;

      return sprite.overlaps(attackPoint);
    },
    onUpdate: function(dt) {
      var attackPoint = this.getAttackPoint();
      if (!attackPoint) return true;

      this.attackSpriteTypes || (this.attackSpriteTypes = ["character", "breakable-tile", "artifact"]);

      var sprite = this.world.findAt(attackPoint.x, attackPoint.y, this.attackSpriteTypes, this, undefined);

      if (sprite) {
        var cur = this.getStateInfo();
        this.attackingSprite = sprite;
        sprite.trigger("hit", this, cur.opo);
      }

      return true;
    }
  });

  Backbone.pagedSprites.c.push("hero1");

}).call(this);
(function() {

  // Velocity and acceleration values in absolute values
  var walkVelocity = 160,
      walkMinVelocity = 60,
      walkAcceleration = 300,
      runVelocity = 260,
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
      flyBoostVelocity = -500,
      flyFallVelocity = 100,
      idleDelay = 2500,
      walkDelay = 75,
      koDelay = 100,
      runDelay = 50,
      attackDelay = 30,
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

  var seq2glow = {
    0: {x: 52, y: 98, r: -0.10},
    1: {x: 52, y: 98, r: -0.08},
    14: {x: 52, y: 98, r: -0.09},
    15: {x: 49, y: 99, r: -0.02},
    16: {x: 44, y: 99, r: 0.07},
    17: {x: 40, y: 98, r: 0.13},
    18: {x: 44, y: 99, r: 0.07},
    19: {x: 49, y: 98, r: -0.01},
    20: {x: 52, y: 98, r: -0.09},
    21: {x: 54, y: 99, r: -0.13},
    22: {x: 58, y: 99, r: -0.18},
    23: {x: 58, y: 99, r: -0.21},
    24: {x: 57, y: 99, r: -0.18},
    25: {x: 56, y: 99, r: -0.15},
    42: {x: 50, y: 105, r: -0.10},
    56: {x: 35, y: 88, r: 0.14},
    57: {x: 41, y: 91, r: 0},
    70: {x: 39, y: 97, r: 0.15},
    71: {x: 47, y: 101, r: 0.07},
    72: {x: 65, y: 107, r: -0.10},
    73: {x: 75, y: 110, r: -0.20},
    28: {x: 41, y: 97, r: -0.01},
    29: {x: 39, y: 96, r: 0.04},
    30: {x: 37, y: 96, r: 0.08},
    31: {x: 31, y: 94, r: 0.23},
    32: {x: 37, y: 96, r: 0.08},
    33: {x: 40, y: 96, r: 0.04},
    34: {x: 41, y: 97, r: -0.01},
    35: {x: 44, y: 97, r: -0.06},
    36: {x: 48, y: 96, r: -0.15},
    37: {x: 48, y: 96, r: -0.18},
    38: {x: 53, y: 94, r: -0.32},
    39: {x: 49, y: 96, r: -0.19},
    40: {x: 48, y: 96, r: -0.15},
    41: {x: 44, y: 97, r: -0.07},
    84: {x: 52, y: 69, r: -0.98},
    85: {x: 66, y: 78, r: -0.64},
    86: {x: 85, y: 77, r: -0.32},
    87: {x: 82, y: 90, r: -0.14},
    88: {x: 70, y: 103, r: 0.11},
    89: {x: 44, y: 92, r: 0.30},
    98: {x: 45, y: 60, r: -1.02},
    99: {x: 61, y: 67, r: -0.64},
    100: {x: 76, y: 70, r: -0.30},
    101: {x: 72, y: 92, r: -0.03},
    102: {x: 48, y: 100, r: 0.23},
    103: {x: 36, y: 92, r: 0.34},
    112: {x: 45, y: 104, r: 0.04},
    113: {x: 62, y: 108, r: 0.01},
    114: {x: 72, y: 107, r: -0.08},
    115: {x: 78, y: 104, r: -0.11},
    116: {x: 85, y: 99, r: -0.16}
  };

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
      fireAttackClass: null,
      swordColor: null,
      houseId: undefined
    }),
    animations: animations,
    initialize: function(attributes, options) {
      Backbone.Hero.prototype.initialize.apply(this, arguments);
      this.fireAttack = _.debounce(this.fireAttack, 250, true);
      this._glowStartTime = 0;
      this._glowEasingTime = 2000;
      this._glowEasing = "linear";
      this._fartPool = new Backbone.Collection([
        new Backbone.Fart(),
        new Backbone.Fart(),
        new Backbone.Fart(),
        new Backbone.Fart(),
        new Backbone.Fart(),
        new Backbone.Fart()
      ]);
      this._lastFartTime = 0;
    },
    isInsideHouse: function() {
      return !!this.get("houseId");
    },
    knockout: function(sprite, dir) {
      Backbone.Hero.prototype.knockout.apply(this, arguments);
      this.set("ignorePhysics", false);
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
      this.hurtStartTime = _.now();
      return this;
    },
    bounce: function(sprite, dir, dir2) {
      var cur = this.getStateInfo(),
          state = this.buildState("jump", cur.dir);
      this.set({
        state: state,
        yVelocity: this.animations[state].yStartVelocity*0.5,
        nextState: this.buildState("idle", cur.dir)
      });
      this.cancelUpdate = true;
      return this;
    },
    hit: function(sprite, dir, dir2) {
      if (this._handlingSpriteHit) return this;
      this._handlingSpriteHit = sprite;

      var cur = this.getStateInfo(),
          type = sprite.get("type"),
          name = sprite.get("name"),
          attackDamage = this.get("attackDamage");

      if (type == "barrier") {

      } else if (type == "breakable-tile") {
        if (this.isAttacking(sprite))
          this.set("attackDamage", Math.min(attackDamage-1, 0));
      } else if (type == "tile") {
        if (sprite.get("name").indexOf("bc-spikes") === 0) {
          this.cancelUpdate = true;
          this.set({health: 0}, {sprite: sprite, dir: dir, dir2: dir2});
        }
      } else if (type == "artifact") {
        if (this.isAttacking(sprite))
          this.set("attackDamage", Math.min(attackDamage-1, 0));
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
              this.set({health: Math.min(this.get("health") + 4, this.get("healthMax"))}, {sprite: sprite, dir: dir, dir2: dir2});
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
            this.cancelUpdate = true;
            this.set("potion", "red");
            /*if (cur.mov2 != "hurt") {
              this.cancelUpdate = true;
              this.set({health: Math.min(this.get("health") + 8, this.get("healthMax"))}, {sprite: sprite, dir: dir, dir2: dir2});
            }*/
            break;
          case "a-blue-potion":
            this.cancelUpdate = true;
            this.set("potion", "blue");
            break;
          case "a-green-potion":
            this.cancelUpdate = true;
            this.set({potion: "green"});
            break;
          case "a-blue-sword":
            this.cancelUpdate = true;
            this.set({
              fireAttackClass: Backbone.Fireball,
              swordColor: "rgba(0, 125, 249, {0})"
            });
            break;
        }
      } else if (name == "spider" && dir == "bottom") {
        this.bounce.apply(this, arguments);
      } else if (type == "character" && cur.mov2 != "hurt") {
        if (this.isAttacking(sprite) && !sprite.get("dead")) {
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
    buttonAToggled: function() {
      if (this.ignoreInput()) return this;

      if (this.get("potion") == "green" && !this.get("dead") && this.get("yVelocity") > 0 &&
          this.input && this.input.buttonAPressed()) {
        this.set("yVelocity", flyBoostVelocity);
        return this;
      }

      return Backbone.Hero.prototype.buttonAToggled.apply(this, arguments);
    },
    startAttack: function() {
      this.attackingSprite = undefined;
      this.set("attackDamage", this.get("maxAttackDamage"));
      return Backbone.Hero.prototype.startAttack.apply(this, arguments);
    },
    fireAttack: function() {
      var cur = this.getStateInfo(),
          dir = cur.dir,
          Cls = this.get("fireAttackClass");

      if (this.input)
        if (this.input.leftPressed()) dir = "left";
        else if (this.input.rightPressed()) dir = "right";

      this.world.add(new Cls({
        x: (dir == "left" ? this.getLeft(true) : this.getRight(true)) - Backbone.Fireball.prototype.defaults.width/2,
        y: this.getCenterY(),
        state: this.buildState("fly", dir),
        parentId: this.id
      }));

      return this;
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
        {x: 70, y: 10},
        {x: 120, y: 30},
        {x: 120, y: 70},
        {x: 120, y: 100},
        {x: 120, y: 120}
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
    update: function(dt) {
      if (this.get("potion") == "green" && !this.get("dead") && this.input && this.input.buttonAPressed()) {
        var yVelocity = this.get("yVelocity");
        if (yVelocity > flyFallVelocity) this.set("yVelocity", flyFallVelocity);
      }
      if (this.get("state").indexOf("hurt") != -1 && this.hurtStartTime && _.now() > this.hurtStartTime + 1000) {
        var cur = this.getStateInfo();
        this.set({state: this.buildState(cur.mov, cur.dir)}, {silent:true});
        this.hurtStartTime = undefined;
      }
      return Backbone.Hero.prototype.update.apply(this, arguments);
    },
    onUpdate: function(dt) {
      var attackPoint = this.getAttackPoint();
      if (!attackPoint) return true;

      if (this.get("fireAttackClass") && this.get("sequenceIndex") == 2) this.fireAttack();

      this.attackSpriteTypes || (this.attackSpriteTypes = ["character", "breakable-tile", "artifact"]);

      var sprite = this.world.findAt(attackPoint.x, attackPoint.y, this.attackSpriteTypes, this, undefined);

      if (sprite) {
        var cur = this.getStateInfo();
        this.attackingSprite = sprite;
        sprite.trigger("hit", this, cur.opo);
      }

      return true;
    },
    draw: function(context, options) {
      if (this.world && this.world.get("state") == "play" && this.get("potion") == "green") {
        var now = _.now(),
            time = 500 / (this.attributes.yVelocity ? 6 : 1);

        if (now > this._lastFartTime + time) {
          var fart = this._fartPool.find(function(fart) {return !fart.world;});
          if (fart) {
            var width = this.get("width"),
                x = this.get("x") + width/2 + (this.attributes.state.indexOf("-left") >= 0 ? 10 : -30),
                y = this.get("y") + 100;
            fart.set({
              x: x + Math.round((0.5-Math.random())*10),
              y: y + Math.round((0.5-Math.random())*10)
            });
            this.world.add(fart);
          }
          this._lastFartTime = now;
        }
      }

      return Backbone.Hero.prototype.draw.apply(this, arguments);
    },
    onDraw: function(context, options) {
      if (!this.world || !this.get("swordColor")) return this;

      var animation = this.getAnimation(),
          sequenceIndex = this.get("sequenceIndex") || 0;
      if (sequenceIndex >= animation.sequences.length) sequenceIndex = 0;

      var sequence = animation.sequences[sequenceIndex],
          frameIndex = _.isNumber(sequence) ? sequence : sequence.frame,
          scaleX = animation.scaleX && animation.scaleX != 1 ? animation.scaleX : null,
          scaleY = animation.scaleY && animation.scaleY != 1 ? animation.scaleY : null,
          x = Math.round(this.get("x") + (options.offsetX || 0) + (sequence.x || 0)),
          y = Math.round(this.get("y") + (options.offsetY || 0) + (sequence.y || 0)),
          now = _.now(),
          color = this.get("swordColor");

      if (now > this._glowStartTime + this._glowEasingTime) this._glowStartTime = now;
      
      var opacity = 0.8 - Math.abs(0.5-Backbone.EasingFunctions[this._glowEasing]((now - this._glowStartTime) / this._glowEasingTime))*1.2,
          unit = 1,
          glowParams = seq2glow[frameIndex] ? seq2glow[frameIndex] : seq2glow[0];

      context.save();
      context.beginPath();
      context.translate(x, y);
      if (_.isNumber(scaleX) || _.isNumber(scaleY)) context.scale(scaleX || 1, scaleY || 1);
      context.translate(glowParams.x - (scaleX < 0 ? frame.width : 0) , glowParams.y - (scaleY < 0 ? frame.height : 0));
      context.rotate(Math.PI * glowParams.r);
      context.lineTo(0, unit*0);
      context.lineTo(unit*30, -2);
      context.lineTo(unit*36, unit*3);
      context.lineTo(unit*30, unit*6);
      context.lineTo(0, unit*5);
      context.closePath();
      context.lineWidth = 1;
      context.fillStyle = color.replace("{0}", opacity);
      context.shadowColor = color.replace("{0}", 1);
      context.shadowBlur = 20;
      context.fill();
      context.restore();

      return this;
    }
  });

  Backbone.pagedSprites.c.push("hero1");

}).call(this);
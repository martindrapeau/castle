(function() {

  // y = -0.0037x2 + 3.3306x - 246.05

  var sequenceDelay = 50,
      flyVelocity = 250,
      flyAcceleration = 400,
      flyYVelocity = 350,
      flyYAcceleration = 800,
      koHurtVelocity = 200,
      fallAcceleration = 1200,
      fallVelocity = 600,
      koDelay = 200;
  
  var animations = {
    "idle-left": {
      sequences: [
        {frame: 0, x: 0, y: 0},
        {frame: 1, x: 0, y: -2},
        {frame: 2, x: -2, y: -2},
        {frame: 3, x: -2, y: 0},
        {frame: 0, x: 0, y: 0},
        {frame: 1, x: 0, y: 2},
        {frame: 2, x: 2, y: 2},
        {frame: 3, x: 2, y: 0}
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
        {frame: 0, x: 0, y: 0},
        {frame: 1, x: 0, y: 2},
        {frame: 2, x: 2, y: 2},
        {frame: 3, x: 2, y: 0}
      ],
      delay: sequenceDelay,
      scaleX: 1,
      scaleY: 1
    },
    "fly-left": {
      sequences: [0, 1, 2, 3],
      delay: sequenceDelay,
      velocity: flyVelocity,
      acceleration: flyAcceleration,
      yVelocity: flyYVelocity,
      yAcceleration: flyYAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "fly-right": {
      sequences: [0, 1, 2, 3],
      delay: sequenceDelay,
      velocity: flyVelocity,
      acceleration: flyAcceleration,
      yVelocity: flyYVelocity,
      yAcceleration: flyYAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [4, 5, 6],
      delay: koDelay,
      velocity: -koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [4, 5, 6],
      delay: koDelay,
      velocity: koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    }
  };

  var hurtAnimation = {
    sequences: [5, 6, 5],
    delay: 100
  };
  animations["idle-hurt-left"] = _.extend({}, animations["idle-left"], hurtAnimation, {velocity: -koHurtVelocity});
  animations["idle-hurt-right"] = _.extend({}, animations["idle-right"], hurtAnimation, {velocity: koHurtVelocity});
  animations["fly-hurt-left"] = _.extend({}, animations["fly-left"], hurtAnimation, {velocity: -koHurtVelocity});
  animations["fly-hurt-right"] = _.extend({}, animations["fly-right"], hurtAnimation, {velocity: koHurtVelocity});

  var collisionVelocity = 200,
      collisionAnimation = {
        sequences: [5, 6, 5]
      };
  animations["idle-collision-left"] = _.extend({}, animations["idle-left"], collisionAnimation, {velocity: -collisionVelocity});
  animations["idle-collision-right"] = _.extend({}, animations["idle-right"], collisionAnimation, {velocity: collisionVelocity});
  animations["fly-collision-left"] = _.extend({}, animations["fly-left"], collisionAnimation, {velocity: -collisionVelocity});
  animations["fly-collision-right"] = _.extend({}, animations["fly-right"], collisionAnimation, {velocity: collisionVelocity});


	Backbone.Bat = Backbone.Fly.extend({
    defaults: _.extend({}, Backbone.Fly.prototype.defaults, {
      name: "bat",
      spriteSheet: "bat",
      width: 128,
      height: 128,
      aiTime: 2000,
      health: 1,
      attackDamage: 1
    }),
    animations: animations,
    isAttacking: function(sprite) {
      var cur = this.getStateInfo();
      return cur.mov == "fly" || cur.mov == "idle";
    },
    knockout: function() {
      Backbone.Fly.prototype.knockout.apply(this, arguments);
      this.set({
        paddingLeft: 40,
        paddingRight: 40
      });
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

      if (newMov != cur.mov || newMov2 != cur.mov2 || newDir != cur.dir)
        attrs.state = this.buildState(newMov, newMov2, newDir);

      if (!_.isEmpty(attrs)) {
        this.cancelUpdate = true;
        this.set(attrs);
      }
      return this;
      return this;
    }
  });

  Backbone.pagedSprites.c.push("bat");

}).call(this);
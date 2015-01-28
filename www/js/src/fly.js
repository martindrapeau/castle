(function() {

  var sequenceDelay = 50,
      walkVelocity = 200,
      fallAcceleration = 1200,
      fallVelocity = 600,
      koDelay = 100;
  
  var animations = {
    "fly-left": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      scaleX: -1,
      scaleY: 1
    },
    "fly-right": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      scaleX: 1,
      scaleY: 1
    },
    "fall-left": {
      sequences: [16],
      delay: sequenceDelay,
      velocity: -walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "fall-right": {
      sequences: [16],
      delay: sequenceDelay,
      velocity: walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [16, 17, 18, 19, 20],
      delay: koDelay,
      velocity: -walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [16, 17, 18, 19, 20],
      delay: koDelay,
      velocity: walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    }
  };

  var hurtAnimation = {
        sequences: [16, 17],
        delay: 300,
        yVelocity: fallVelocity,
        yAcceleration: fallAcceleration
      };
  animations["fly-hurt-left"] = _.extend({}, animations["fly-left"], hurtAnimation);
  animations["fly-hurt-right"] = _.extend({}, animations["fly-right"], hurtAnimation);
  animations["fall-hurt-left"] = _.extend({}, animations["fall-left"], hurtAnimation);
  animations["fall-hurt-right"] = _.extend({}, animations["fall-right"], hurtAnimation);

	Backbone.Fly = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      name: "fly",
      spriteSheet: "fly",
      width: 104,
      height: 110,
      state: "fly-left",
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      health: 2,
      attackDamage: 2
    }),
    animations: animations,
    update: function(dt) {
      if (!this.world) return true;
      this.cancelUpdate = false;

      // Velocity and state
      var self = this,
          velocity = this.get("velocity") || 0,
          yVelocity = this.get("yVelocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          cur = this.getStateInfo(),
          animation = this.getAnimation(),
          attrs = {};

      if ((cur.mov == "ko" || cur.mov2 == "hurt") &&
          this.get("sequenceIndex") == animation.sequences.length-1) {
        // No sequence change - stay on last one
      } else {
        attrs.sequenceIndex = this.updateSequenceIndex();
      }

      if (cur.mov == "ko" || cur.mov2 == "hurt") {
        if (yVelocity < animation.yVelocity)
          yVelocity += animation.yAcceleration * (dt/1000);

        if (yVelocity >= animation.yVelocity)
          yVelocity = animation.yVelocity;
        attrs.yVelocity = yVelocity;
      }



      if (velocity) attrs.x = x = x + velocity * (dt/1000);
      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      //if (this.engine.debugPanel) this.engine.debugPanel.set({state: this.get("state")})
      return true;      
    }
	});

  Backbone.pagedSprites.c.push("fly");

}).call(this);
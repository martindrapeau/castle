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
      attackDamage: 2
    }),
    animations: animations
	});

  Backbone.pagedSprites.c.push("spider");

}).call(this);
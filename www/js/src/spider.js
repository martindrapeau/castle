(function() {

  var sequenceDelay = 50,
      walkVelocity = 200,
      fallAcceleration = 1200,
      fallVelocity = 600;

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
      damage: 2
    }),
    animations: {
      "idle-left": {
        sequences: [0, 1, 2, 3, 4, 5],
        velocity: 0,
        scaleX: -1,
        scaleY: 1
      },
      "idle-right": {
        sequences: [0, 1, 2, 3, 4, 5],
        velocity: 0,
        scaleX: 1,
        scaleY: 1
      },
      "walk-left": {
        sequences: [8, 9, 10, 11, 12, 13, 14, 15],
        velocity: -walkVelocity,
        scaleX: -1,
        scaleY: 1,
        delay: sequenceDelay
      },
      "walk-right": {
        sequences: [8, 9, 10, 11, 12, 13, 14, 15],
        velocity: walkVelocity,
        scaleX: 1,
        scaleY: 1,
        delay: sequenceDelay
      },
      "fall-left": {
        sequences: [17],
        velocity: -walkVelocity,
        yVelocity: fallVelocity,
        yAcceleration: fallAcceleration,
        scaleX: -1,
        scaleY: 1
      },
      "fall-right": {
        sequences: [17],
        velocity: walkVelocity,
        yVelocity: fallVelocity,
        yAcceleration: fallAcceleration,
        scaleX: 1,
        scaleY: 1
      },
      "ko-left": {
        sequences: [24, 25, 26, 27, 28, 29],
        velocity: -walkVelocity,
        yVelocity: fallVelocity,
        yAcceleration: fallAcceleration,
        scaleX: -1,
        scaleY: -1
      },
      "ko-right": {
        sequences: [24, 25, 26, 27, 28, 29],
        velocity: walkVelocity,
        yVelocity: fallVelocity,
        yAcceleration: fallAcceleration,
        scaleX: 1,
        scaleY: -1
      }
    },
    initialize: function(attributes, options) {
      Backbone.Character.prototype.initialize.apply(this, arguments);

      this.on("attack", this.attack, this);
    }
	});

  Backbone.pagedSprites.a.push("spider");

}).call(this);
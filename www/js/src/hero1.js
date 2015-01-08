(function() {
  
  Backbone.Hero1 = Backbone.Hero.extend({
    defaults: _.extend({}, Backbone.Hero.prototype.defaults, {
      name: "hero1",
      spriteSheet: "hero1",
      width: 100,
      height: 100
    }),
    animations: {
      "idle-left": _.extend({}, Backbone.Hero.prototype.animations["idle-left"], {
        sequences: [0, 1],
        delay: 2500
      }),
      "idle-right": _.extend({}, Backbone.Hero.prototype.animations["idle-right"], {
        sequences: [0, 1],
        delay: 2500
      }),
      "walk-left": _.extend({}, Backbone.Hero.prototype.animations["walk-left"], {
        sequences: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        delay: 75
      }),
      "walk-right": _.extend({}, Backbone.Hero.prototype.animations["walk-right"], {
        sequences: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        delay: 75
      }),
      "run-left": _.extend({}, Backbone.Hero.prototype.animations["run-left"], {
        sequences: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
      }),
      "run-right": _.extend({}, Backbone.Hero.prototype.animations["run-right"], {
        sequences: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
      }),
      "release-left": _.extend({}, Backbone.Hero.prototype.animations["release-left"], {
        sequences: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
      }),
      "release-right": _.extend({}, Backbone.Hero.prototype.animations["release-right"], {
        sequences: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
      }),
      "skid-left": _.extend({}, Backbone.Hero.prototype.animations["skid-left"], {
        sequences: [42]
      }),
      "skid-right": _.extend({}, Backbone.Hero.prototype.animations["skid-right"], {
        sequences: [42]
      }),
      "jump-left": _.extend({}, Backbone.Hero.prototype.animations["jump-left"], {
        sequences: [56]
      }),
      "jump-right": _.extend({}, Backbone.Hero.prototype.animations["jump-right"], {
        sequences: [56]
      }),
      "ko-left": _.extend({}, Backbone.Hero.prototype.animations["ko-left"], {
        sequences: [70, 71, 72, 73]
      }),
      "ko-right": _.extend({}, Backbone.Hero.prototype.animations["ko-right"], {
        sequences: [70, 71, 72, 73]
      })
    }
  });

}).call(this);
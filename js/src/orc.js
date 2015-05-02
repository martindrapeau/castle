(function() {

  Backbone.Orc = Backbone.Skeleton1.extend({
    defaults: _.extend({}, Backbone.Skeleton1.prototype.defaults, {
      name: "orc",
      spriteSheet: "orc",
      paddingLeft: 48,
      paddingRight: 48,
      paddingTop: 24,
      paddingBottom: 12,
      health: 3
    })
  });

  var animations =
    Backbone.Orc.prototype.animations =
    _.deepClone(Backbone.Skeleton1.prototype.animations);

  animations["idle-left"].sequences =
  animations["idle-right"].sequences = [0, 1, 2, 3, 4, 5];

  animations["walk-left"].sequences =
  animations["walk-right"].sequences = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  animations["fall-left"].sequences =
  animations["fall-right"].sequences = [24];

  animations["ko-left"].sequences =
  animations["ko-right"].sequences = [36, 37, 38, 39, 40, 41];

  animations["idle-hurt-left"].sequences =
  animations["idle-hurt-right"].sequences =
  animations["walk-hurt-left"].sequences =
  animations["walk-hurt-right"].sequences =
  animations["fall-hurt-left"].sequences =
  animations["fall-hurt-right"].sequences = [36];

  animations["idle-attack-left"].sequences = 
  animations["idle-attack-right"].sequences = 
  animations["walk-attack-left"].sequences = 
  animations["walk-attack-right"].sequences = [20, 21, 22, 23, 24, 25, 26, 27, 27];

  Backbone.pagedSprites.c.push("orc");

}).call(this);
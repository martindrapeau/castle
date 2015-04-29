(function() {

  Backbone.Boss = Backbone.Skeleton1.extend({
    defaults: _.extend({}, Backbone.Skeleton1.prototype.defaults, {
      name: "boss",
      spriteSheet: "boss",
      width: 256,
      height: 192,
      paddingLeft: 48,
      paddingRight: 48,
      paddingTop: 64,
      paddingBottom: 4,
      health: 5
    })
  });

  var animations =
    Backbone.Boss.prototype.animations =
    _.deepClone(Backbone.Skeleton1.prototype.animations);

  animations["idle-left"].sequences =
  animations["idle-right"].sequences = [0, 1, 2];

  animations["walk-left"].sequences =
  animations["walk-right"].sequences = [3, 4, 5, 6, 7, 8, 9, 10];

  animations["fall-left"].sequences =
  animations["fall-right"].sequences = [4];

  animations["ko-left"].sequences =
  animations["ko-right"].sequences = [16, 17, 18, 19];

  animations["idle-hurt-left"].sequences =
  animations["idle-hurt-right"].sequences =
  animations["walk-hurt-left"].sequences =
  animations["walk-hurt-right"].sequences =
  animations["fall-hurt-left"].sequences =
  animations["fall-hurt-right"].sequences = [16];

  animations["idle-attack-left"].sequences = 
  animations["idle-attack-right"].sequences = 
  animations["walk-attack-left"].sequences = 
  animations["walk-attack-right"].sequences = [11, 12, 13, 14, 15];

  _.each(animations, function(animation) {
    animation.scaleX *= -1;
  });

  Backbone.pagedSprites.c.push("boss");

}).call(this);
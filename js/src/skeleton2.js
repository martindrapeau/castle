(function() {

  Backbone.Skeleton2 = Backbone.Skeleton1.extend({
    defaults: _.extend({}, Backbone.Skeleton1.prototype.defaults, {
      name: "skeleton2"
    })
  });

  var animations =
    Backbone.Skeleton2.prototype.animations =
    _.deepClone(Backbone.Skeleton1.prototype.animations);

  animations["idle-left"].sequences =
  animations["idle-right"].sequences = [25];

  animations["walk-left"].sequences =
  animations["walk-right"].sequences = [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];

  animations["fall-left"].sequences =
  animations["fall-right"].sequences = [35];

  animations["ko-left"].sequences =
  animations["ko-right"].sequences = [43, 44, 45, 46];

  animations["idle-hurt-left"].sequences =
  animations["idle-hurt-right"].sequences =
  animations["walk-hurt-left"].sequences =
  animations["walk-hurt-right"].sequences =
  animations["fall-hurt-left"].sequences =
  animations["fall-hurt-right"].sequences = [43];

  animations["idle-attack-left"].sequences = 
  animations["idle-attack-right"].sequences = 
  animations["walk-attack-left"].sequences = 
  animations["walk-attack-right"].sequences = [38, 39, 40, 41, 42];

  Backbone.pagedSprites.c.push("skeleton2");

}).call(this);
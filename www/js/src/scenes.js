(function() {

  Backbone.LabelButton = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      x: 400,
      y: 400,
      width: 160,
      height: 100,
      backgroundColor: "transparent",
      text: "",
      textPadding: 12,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "40px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
      easing: "easeInCubic",
      easingTime: 400
    })
  });

  Backbone.Scene = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
			x: 0,
			y: 0,
			width: 960,
			height: 700,
			backgroundColor: "#000",
			opactity: 1,
			text: ""
  	}),
  	initialize: function(attributes, options) {
  		Backbone.Button.prototype.initialize.apply(this, arguments);
      options || (options = {});
      this.state = options.state;
      this.world = options.world;
  	}
  });


}).call(this);
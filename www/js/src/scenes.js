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
			opacity: 1,
			text: ""
  	}),
  	initialize: function(attributes, options) {
  		Backbone.Button.prototype.initialize.apply(this, arguments);
      options || (options = {});
      this.state = options.state;
      this.world = options.world;
  	}
  });

  Backbone.LevelStartScene = Backbone.Scene.extend({
    defaults: _.extend({}, Backbone.Scene.prototype.defaults, {
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "40px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
    	easing: "easeInCubic",
    	easingTime: 400
    }),
    onAttach: function() {
    	Backbone.Scene.prototype.onAttach.apply(this, arguments);
    	this.stopListening(this.engine);
    	this.start();
    },
    start: function() {
    	this.world.set("state", "pause");
    	this.set("text", "Level " + this.world.get("level") + " - " + this.world.get("name"));

    	var scene = this;
    	setTimeout(function() {
    		scene.fadeOut();
    		setTimeout(scene.end.bind(scene), 500);
    	}, 2000);
    },
    end: function() {
    	this.world.set("state", "play");
    	this.engine.remove(this);
    	this.set("opacity", 1);
    }
  });

}).call(this);
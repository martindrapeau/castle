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
			opacity: 0,
			text: "",
    	easing: "easeInCubic",
    	easingTime: 400
  	}),
  	initialize: function(attributes, options) {
  		Backbone.Button.prototype.initialize.apply(this, arguments);
      options || (options = {});
      this.state = options.state;
      this.world = options.world;
      _.bindAll(this, "enter", "exit");
  	},
    enter: function() {
    	this.set("opacity", 0);
    	this.fadeIn();
      return this;
    },
    exit: function() {
    	this.set("opacity", 1);
    	this.fadeOut();
      return this;
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
    enter: function() {
      var scene = this;
    	this.set("opacity", 1);
    	this.world.set("state", "pause");
    	this.set("text", "Level " + this.world.get("level") + " - " + this.world.get("name"));

    	setTimeout(function() {
    		scene.fadeOut(function() {
          scene.world.set("state", "play");
          scene.engine.remove(scene);
        });
    	}, 2000);

      return this;
    }
  });

  Backbone.LevelInOutScene = Backbone.Scene.extend({
    defaults: _.extend({}, Backbone.Scene.prototype.defaults, {
    	opacity: 0,
    	easing: "easeInCubic",
    	easingTime: 400
    }),
    enter: function() {
    	this.set("opacity", 1);
    	this.world.set("state", "pause");

    	this.fadeOut(function() {
        this.world.set("state", "play");
        this.engine.remove(this);
      });

      return this;
    },
    exit: function() {
    	this.set("opacity", 0);
    	this.world.set("state", "pause");

    	this.fadeIn(function() {
        this.engine.remove(this);
      });
      
      return this;
    }
   });

}).call(this);
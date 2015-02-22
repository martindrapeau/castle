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
      this.saved = options.saved;
      this.world = options.world;
      this.levels = options.levels;
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

  Backbone.Panel = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      x: 160,
      y: 720,
      width: 640,
      height: 140,
      backgroundColor: "transparent",
      img: "#gui", imgX: 0, imgY: 472, imgWidth: 640, imgHeight: 480, imgMargin: 0,
      text: "",
      textPadding: 24,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "40px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
      easing: "easeOutCubic",
      easingTime: 600
    }),
    initialize: function(attributes, options) {
      Backbone.Button.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "show");
    },
    show: function() {
      this.moveTo(this.get("x"), 200);
      return this;
    }
  });

}).call(this);
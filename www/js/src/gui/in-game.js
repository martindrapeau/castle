(function() {

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

  Backbone.PausePanel = Backbone.Panel.extend({
    defaults: _.extend({}, Backbone.Panel.prototype.defaults, {
      x: 320, y: 720, width: 320, height: 240,
      text: "Pause",
      img: "#gui", imgX: 0, imgY: 952, imgWidth: 320, imgHeight: 300, imgMargin: 0
    }),
    initialize: function(attributes, options) {
      Backbone.Panel.prototype.initialize.apply(this, arguments);
      this.pauseButton = options.pauseButton;
      this.world = options.world;
      this.input = options.input;
      this.showGui = options.showGui;
      this.levelInOutScene = options.levelInOutScene;

      this.homeButton = new Backbone.Button({
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 0, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.homeButton.on("tap", _.partial(this.action, "showTitleScreen"), this);

      this.resumeButton = new Backbone.Button({
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 140, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.resumeButton.on("tap", this.resume, this);

      this.listenTo(this.pauseButton, "tap", this.show);
    },
    onAttach: function() {
      Backbone.Panel.prototype.onAttach.apply(this, arguments);
      this.homeButton.engine = this.engine;
      this.resumeButton.engine = this.engine;
      this.homeButton.trigger("attach");
      this.resumeButton.trigger("attach");
    },
    onDetach: function() {
      Backbone.Panel.prototype.onDetach.apply(this, arguments);
      this.homeButton.trigger("detach");
      this.resumeButton.trigger("detach");
      this.homeButton.engine = undefined;
      this.resumeButton.engine = undefined;
    },
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y");

      this.homeButton.set({x: x + 80, y: y + 180}, {silent: true}).draw(context);
      this.resumeButton.set({x: x + 170, y: y + 180}, {silent: true}).draw(context);
      
      return this;
    },
    show: function() {
      this.world.set("state", "pause");

      this.homeButton.trigger("detach");
      this.resumeButton.trigger("detach");
      this.pauseButton.trigger("detach");
      this.input.trigger("detach");

      this.moveTo(this.get("x"), 200, function() {
        this.resumeButton.trigger("attach");
        this.homeButton.trigger("attach");
      });
      return this;
    },
    resume: function() {
      this.homeButton.trigger("detach");
      this.resumeButton.trigger("detach");

      this.moveTo(this.get("x"), 720, function() {
        this.world.set("state", "play");
        this.pauseButton.trigger("attach");
        this.input.trigger("attach");
      });

      return this;
    },
    action: function(event) {
      var panel = this;

      this.homeButton.trigger("detach");
      this.resumeButton.trigger("detach");

      this.engine.add(this.levelInOutScene);
      this.levelInOutScene.exit().once("detach", function() {
        panel.engine.remove(this.levelInOutScene);
        panel.pauseButton.trigger("attach");
        panel.input.trigger("attach");
        panel.set({y: 720});
        panel.engine.trigger(event);
      });

      return this;
    }
  });


  Backbone.LevelEndPanel = Backbone.Panel.extend({
    defaults: _.extend({}, Backbone.Panel.prototype.defaults, {
      x: 320, y: 720, width: 366, height: 305,
      text: "Complete!",
      textContextAttributes: {
        fillStyle: "#FFF600",
        font: "40px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
      img: "#gui", imgX: 0, imgY: 1322, imgWidth: 366, imgHeight: 375, imgMargin: 0
    }),
    initialize: function(attributes, options) {
      Backbone.Panel.prototype.initialize.apply(this, arguments);
      this.pauseButton = options.pauseButton;
      this.world = options.world;
      this.input = options.input;
      this.levelInOutScene = options.levelInOutScene;

      this.nextButton = new Backbone.Button({
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 280, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.nextButton.on("tap", _.partial(this.action, "continueGame"), this);

      this.homeButton = new Backbone.Button({
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 0, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.homeButton.on("tap", _.partial(this.action, "showTitleScreen"), this);
    },
    onAttach: function() {
      Backbone.Panel.prototype.onAttach.apply(this, arguments);
      this.homeButton.engine = this.engine;
      this.nextButton.engine = this.engine;
      this.homeButton.trigger("attach");
      this.nextButton.trigger("attach");
    },
    onDetach: function() {
      Backbone.Panel.prototype.onDetach.apply(this, arguments);
      this.homeButton.trigger("detach");
      this.nextButton.trigger("detach");
      this.homeButton.engine = undefined;
      this.nextButton.engine = undefined;
    },
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y");

      this.homeButton.set({x: x + 87, y: y + 330}, {silent: true}).draw(context);
      this.nextButton.set({x: x + 209, y: y + 330}, {silent: true}).draw(context);
      
      return this;
    },
    show: function() {
      this.world.set("state", "pause");

      this.engine.trigger("levelComplete");

      this.homeButton.trigger("detach");
      this.nextButton.trigger("detach");
      this.pauseButton.trigger("detach");
      this.input.trigger("detach");

      this.moveTo(this.get("x"), 100, function() {
        this.homeButton.trigger("attach");
        this.nextButton.trigger("attach");
      });
      return this;
    },
    action: function(event) {
      var panel = this;

      this.homeButton.trigger("detach");
      this.nextButton.trigger("detach");

      this.engine.add(this.levelInOutScene);
      this.levelInOutScene.exit().once("detach", function() {
        panel.engine.remove(this.levelInOutScene);
        panel.pauseButton.trigger("attach");
        panel.input.trigger("attach");
        panel.set({y: 720});
        panel.engine.trigger(event);
      });

      return this;
    }
  });

}).call(this);
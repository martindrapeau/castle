(function() {

  Backbone.PullOutButton = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      x: -372,
      width: 372,
      height: 76,
      backgroundColor: "transparent",
      img: "#gui", imgX: 0, imgY: 0, imgWidth: 372, imgHeight: 80, imgMargin: 0,
      textPadding: 12,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "34px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "right"
      },
      easing: "easeOutCubic",
      easingTime: 600
    })
  });

  Backbone.SavedGame = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      x: 960,
      y: 400,
      width: 333,
      height: 80,
      backgroundColor: "transparent",
      img: "#gui", imgX: 0, imgY: 225, imgWidth: 333, imgHeight: 247, imgMargin: 0,
      text: "High Score",
      textPadding: 24,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "34px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "left"
      },
      easing: "easeOutCubic",
      easingTime: 600
    }),
    initialize: function(attributes, options) {
      Backbone.Button.prototype.initialize.apply(this, arguments);
      this.world = options.world;
    },
    onAttach: function() {
      Backbone.Button.prototype.onAttach.apply(this, arguments);
      this.set("text", "Level " + this.world.get("level"));
      this.hero = this.world.sprites.findWhere({hero: true});
    },
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y"),
          coins = this.hero ? this.hero.get("coins") : "?",
          time = this.world ? this.world.getHumanTime() : "?";
      context.font = "30px arcade";
      context.fillStyle = "#FFF";
      context.fillText(coins, x+80, y+105);
      context.fillText(time, x+80, y+170);
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
    })
  });

  Backbone.Credits = Backbone.Panel.extend({
    defaults: _.extend({}, Backbone.Panel.prototype.defaults, {
      text: "Credits"
    }),
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y");

      // TO DO...
      /*
        --Credits--

        Graphics: pzUH, TikusJenaka, kemotaku, simirk, dxc, Saranai
        Music: Edvard Grieg
        Testing: Lodovic, Emilia
        Coding: Martin

        Built with Backbone Game Engine

        A Game by Martin Drapeau
      */
    }
  });

  Backbone.PausePanel = Backbone.Panel.extend({
    defaults: _.extend({}, Backbone.Panel.prototype.defaults, {
      name: "pausePanel",
      x: 320, y:720, width: 320, height: 240,
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

      this.resumeButton = new Backbone.Button({
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 140, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.resumeButton.on("tap", this.resume, this);

      this.homeButton = new Backbone.Button({
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 0, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.homeButton.on("tap", this.exit, this);

      this.listenTo(this.pauseButton, "tap", this.show);
    },
    onAttach: function() {
      Backbone.Panel.prototype.onAttach.apply(this, arguments);
      this.resumeButton.engine = this.engine;
      this.homeButton.engine = this.engine;
      this.resumeButton.trigger("attach");
      this.homeButton.trigger("attach");
    },
    onDetach: function() {
      Backbone.Panel.prototype.onDetach.apply(this, arguments);
      this.resumeButton.trigger("detach");
      this.homeButton.trigger("detach");
      this.resumeButton.engine = undefined;
      this.homeButton.engine = undefined;
    },
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y");

      this.resumeButton.set({x: x + 80, y: y + 180}, {silent: true}).draw(context);
      this.homeButton.set({x: x + 170, y: y + 180}, {silent: true}).draw(context);
      
      return this;
    },
    show: function() {
      this.world.set("state", "pause");

      this.resumeButton.trigger("detach");
      this.homeButton.trigger("detach");
      this.pauseButton.trigger("detach");
      this.input.trigger("detach");

      this.moveTo(this.get("x"), 200, function() {
        this.resumeButton.trigger("attach");
        this.homeButton.trigger("attach");
      });
      return this;
    },
    resume: function() {
      this.resumeButton.trigger("detach");
      this.homeButton.trigger("detach");

      this.moveTo(this.get("x"), 720, function() {
        this.world.set("state", "play");
        this.pauseButton.trigger("attach");
        this.input.trigger("attach");
      });

      return this;
    },
    exit: function() {
      var panel = this;

      this.engine.add(this.levelInOutScene);
      this.levelInOutScene.exit().once("detach", function() {
        panel.engine.remove(this.levelInOutScene);
        panel.pauseButton.trigger("attach");
        panel.input.trigger("attach");
        panel.set({y: 720});
        panel.showGui();
      });

      return this;
    }
  });


	Backbone.Gui = Backbone.Scene.extend({
    defaults: _.extend({}, Backbone.Scene.prototype.defaults, {
      img: "#title-screen",
      imgWidth: 960,
      imgHeight: 700
    }),
    initialize: function(attributes, options) {
      Backbone.Scene.prototype.initialize.apply(this, arguments);

      this.banner = new Backbone.Button({
        x: 0, y: 240,
        width: 960, height: 145,
        backgroundColor: "transparent",
        img: "#gui", imgX: 0, imgY: 80, imgWidth: 960, imgHeight: 144, imgMargin: 5,
        easing: "easeInOutQuad",
        easingTime: 400
      });

      this.touchStart = new Backbone.LabelButton({
        text: "Touch to start",
        opacity: 0
      });

      this.loading = new Backbone.LabelButton({
        text: "Loading...",
        easingTime: 300,
        opacity: 0
      });

      this.newGame = new Backbone.PullOutButton({
        y: 300,
        text: "New Game "
      });
      this.newGame.on("tap", _.partial(this.play, "new"), this);

      this.resume = new Backbone.PullOutButton({
        y: 420,
        text: "Resume "
      });
      this.resume.on("tap", _.partial(this.play, "resume"), this);

      this.showCredits = new Backbone.PullOutButton({
        y: 540,
        text: "Credits "
      });

      this.savedGame = new Backbone.SavedGame({}, {
        world: this.world
      });

      this.credits = new Backbone.Credits();
      this.showCredits.on("tap", _.partial(this.showPanel, this.credits), this);
    },
    postInitialize: function() {
      this.listenTo(this.engine, "tap", this.onTouchStart);

      // Hack to avoid FOUT
      this.touchStart.set("opacity", 1);
      this.newGame.textMetrics = undefined;
      this.showCredits.textMetrics = undefined;
      this.resume.textMetrics = undefined;
    },
    onAttach: function() {
      Backbone.Scene.prototype.onAttach.apply(this, arguments);
      this.stopListening(this.engine);
      this.set("opacity", 1);

      this.engine.add([this.banner, this.touchStart, this.loading, this.newGame, this.showCredits, this.credits, this.resume, this.savedGame]);

      if (!this.ready)
        setTimeout(this.postInitialize.bind(this), 200);
      else 
        setTimeout(this.showButtons.bind(this), 100);
    },
    onDetach: function() {
      Backbone.Scene.prototype.onDetach.apply(this, arguments);
      this.engine.remove([this.banner, this.touchStart, this.loading, this.newGame, this.showCredits, this.credits, this.savedGame, this.resume]);
    },
    onTouchStart: function(e) {
      // Animate some stuff
      this.banner.moveTo(this.banner.get("x"), 50);
      this.touchStart.moveTo(this.touchStart.get("x"), 700);
      this.stopListening(this.engine);
      this.ready = true;
      this.showButtons();
    },
    showButtons: function() {
      this.newGame.moveTo(-this.newGame.get("width") + this.newGame.textMetrics.width + this.newGame.get("textPadding")*2, this.newGame.get("y"));
      this.showCredits.moveTo(-this.showCredits.get("width") + this.showCredits.textMetrics.width + this.showCredits.get("textPadding")*2, this.showCredits.get("y"));
      if (this.state.saved) {
        this.resume.moveTo(-this.resume.get("width") + this.resume.textMetrics.width + this.resume.get("textPadding")*2, this.resume.get("y"));
        this.savedGame.moveTo(720, this.savedGame.get("y"));
      }
      this.loading.set("opacity", 0);
    },
    hideButtons: function() {
      this.newGame.moveTo(-this.newGame.get("width"), this.newGame.get("y"));
      this.showCredits.moveTo(-this.showCredits.get("width"), this.showCredits.get("y"));
      this.resume.moveTo(-this.resume.get("width"), this.resume.get("y"));
      this.savedGame.moveTo(960, this.savedGame.get("y"));
    },
    showPanel: function(panel) {
      this.panel = panel;
      this.panel.moveTo(this.panel.get("x"), 200);
      this.hideButtons();
      this.listenTo(this.engine, "tap", this.hidePanel);
    },
    hidePanel: function() {
      this.stopListening(this.engine);
      this.panel.moveTo(this.panel.get("x"), 720);
      this.panel = undefined;
      this.showButtons();
    },
    play: function(event) {
      var delay = 400;
      if (event == "new") {
        this.loading.fadeIn();
        delay = 600;
      }

      var gui = this;
      this.hideButtons();
      setTimeout(function() {
        gui.trigger(event);
        gui.loading.set("opacity", 0);
      }, delay);
    }
	});

}).call(this);
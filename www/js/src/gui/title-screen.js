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
      y: 300,
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
      this.saved = options.saved;
    },
    onAttach: function() {
      Backbone.Button.prototype.onAttach.apply(this, arguments);
      this.set("text", "Level " + (this.saved.size() > 0 ? this.saved.last().get("level") : "?"));
    },
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y"),
          lastState = this.saved.size() > 0 ? this.saved.last() : null,
          coins = lastState ? lastState.get("coins") : "?",
          time = lastState ? _.ms2time(lastState.get("time")) : "?";
      context.font = "30px arcade";
      context.fillStyle = "#FFF";
      context.fillText(coins, x+80, y+105);
      context.fillText(time, x+80, y+170);
    }
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

	Backbone.TitleScreenGui = Backbone.Scene.extend({
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
        y: 720,
        text: "Loading...",
        easingTime: 300
      });

      this.newGame = new Backbone.PullOutButton({
        y: 300,
        text: "New Game "
      });
      this.newGame.on("tap", _.partial(this.action, "newGame"), this);

      this.levelButton = new Backbone.PullOutButton({
        y: 420,
        text: "Levels "
      });
      this.levelButton.on("tap", _.partial(this.action, "showLevelScreen"), this);

      this.showCredits = new Backbone.PullOutButton({
        y: 540,
        text: "Credits "
      });

      this.continueGame = new Backbone.PullOutButton({
        x: 960,
        y: 300,
        text: "Continue ",
        textContextAttributes: {
          fillStyle: "#F67D00",
          font: "34px arcade",
          textBaseline: "middle",
          fontWeight: "normal",
          textAlign: "left"
        }
      });
      this.continueGame.on("tap", _.partial(this.action, "continueGame"), this);

      this.savedGame = new Backbone.SavedGame({
        y: 420
      }, {
        saved: this.saved
      });


      this.credits = new Backbone.Credits();
      this.showCredits.on("tap", _.partial(this.showPanel, this.credits), this);
    },
    postInitialize: function() {
      this.listenTo(this.engine, "tap", this.onTouchStart);

      // Hack to avoid FOUT
      this.touchStart.set("opacity", 1);
      this.newGame.textMetrics = undefined;
      this.continueGame.textMetrics = undefined;
      this.levelButton.textMetrics = undefined;
      this.showCredits.textMetrics = undefined;
    },
    onAttach: function() {
      Backbone.Scene.prototype.onAttach.apply(this, arguments);
      this.stopListening(this.engine);
      this.set("opacity", 1);
      this.loading.set("x", 720);

      this.engine.add([this.banner, this.touchStart, this.loading, this.newGame, this.levelButton, this.showCredits, this.credits, this.continueGame, this.savedGame]);

      if (!this.ready)
        setTimeout(this.postInitialize.bind(this), 200);
      else 
        setTimeout(this.showButtons.bind(this), 100);
    },
    onDetach: function() {
      Backbone.Scene.prototype.onDetach.apply(this, arguments);
      this.engine.remove([this.banner, this.touchStart, this.loading, this.newGame, this.levelButton, this.showCredits, this.credits, this.savedGame, this.continueGame]);
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
      this.levelButton.moveTo(-this.levelButton.get("width") + this.levelButton.textMetrics.width + this.levelButton.get("textPadding")*2, this.levelButton.get("y"));
      this.showCredits.moveTo(-this.showCredits.get("width") + this.showCredits.textMetrics.width + this.showCredits.get("textPadding")*2, this.showCredits.get("y"));
      if (this.saved.size() > 0) {
        this.continueGame.moveTo(960 - this.continueGame.textMetrics.width - this.continueGame.get("textPadding")*2, this.continueGame.get("y"));
        this.savedGame.moveTo(720, this.savedGame.get("y"));
      }
    },
    hideButtons: function() {
      this.newGame.moveTo(-this.newGame.get("width"), this.newGame.get("y"));
      this.levelButton.moveTo(-this.levelButton.get("width"), this.levelButton.get("y"));
      this.showCredits.moveTo(-this.showCredits.get("width"), this.showCredits.get("y"));
      this.continueGame.moveTo(960, this.continueGame.get("y"));
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
    update: function(dt) {
      if (!Backbone.Scene.prototype.update.apply(this, arguments)) return false;

      var attrs = {opacity: this.get("opacity")},
          options = {silent: true};

      this.banner.set(attrs, options);
      this.touchStart.set(attrs, options);
      this.loading.set(attrs, options);
      this.newGame.set(attrs, options);
      this.continueGame.set(attrs, options);
      this.showCredits.set(attrs, options);
      this.credits.set(attrs, options);
      this.levelButton.set(attrs, options);
      this.savedGame.set(attrs, options);

      return true;
    },
    action: function(event) {
      if (event == "newGame")
        this.loading.set("x", 400);

      var gui = this;
      this.hideButtons();
      setTimeout(function() {
        gui.fadeOut(function() {
          gui.engine.trigger(event);
        });
      }, 400);
    }
	});

}).call(this);
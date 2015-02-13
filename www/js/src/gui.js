(function() {

  Backbone.PullOutButton = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      x: -372,
      width: 372,
      height: 76,
      backgroundColor: "transparent",
      img: "#artifacts", imgX: 0, imgY: 538, imgWidth: 372, imgHeight: 80, imgMargin: 0,
      textPadding: 12,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "34px arcade, Verdana, Arial, Sans-Serif",
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
      img: "#artifacts", imgX: 0, imgY: 763, imgWidth: 333, imgHeight: 247, imgMargin: 0,
      text: "High Score",
      textPadding: 24,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "34px arcade, Verdana, Arial, Sans-Serif",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "left"
      },
      easing: "easeOutCubic",
      easingTime: 600
    }),
    initialize: function(attributes, options) {
      Backbone.Button.prototype.initialize.apply(this, arguments);
      options || (options = {});
      this.world = options.world;
    },
    onAttach: function() {
      Backbone.Button.prototype.onAttach.apply(this, arguments);
      this.set("text", "Level " + this.world.get("level"));
      this.hero = this.world.sprites.findWhere({hero: true});
    },
    draw: function(context) {
      Backbone.Button.prototype.draw.apply(this, arguments);
      var x = this.get("x"),
          y = this.get("y"),
          coins = this.hero ? this.hero.get("coins") : "?",
          time = this.world ? this.world.getHumanTime() : "?";
      context.font = "30px arcade, Verdana, Arial, Sans-Serif";
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
      img: "#artifacts", imgX: 0, imgY: 1010, imgWidth: 640, imgHeight: 480, imgMargin: 0,
      text: "",
      textPadding: 24,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "34px arcade, Verdana, Arial, Sans-Serif",
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
    draw: function(context) {
      Backbone.Panel.prototype.draw.apply(this, arguments);
      var x = this.get("x"),
          y = this.get("y");

    }
  })

  /*
    --Credits--

    Graphics: pzUH, TikusJenaka, kemotaku, simirk, dxc, Saranai
    Music: Edvard Grieg
    Testing: Lodovic, Emilia
    Coding: Martin

    Built with Backbone Game Engine

    A Game by Martin Drapeau
  */

	Backbone.Gui = Backbone.Model.extend({
    defaults: {
      img: undefined
    },
    initialize: function(attributes, options) {
      options || (options = {});
      this.state = options.state;
      this.world = options.world;

      var gui = this;
      if (!this.img && this.attributes.img) this.spawnImg();

      this.banner = new Backbone.Button({
        x: 0, y: 240,
        width: 960, height: 145,
        backgroundColor: "transparent",
        img: "#artifacts", imgX: 0, imgY: 618, imgWidth: 960, imgHeight: 145, imgMargin: 5,
        easing: "easeInOutQuad",
        easingTime: 400
      });

      this.touchStart = new Backbone.Button({
        x: 400,
        y: 400,
        width: 160,
        height: 100,
        backgroundColor: "transparent",
        text: "Touch to start",
        textPadding: 12,
        textContextAttributes: {
          fillStyle: "#F67D00",
          font: "40px arcade, Verdana, Arial, Sans-Serif",
          textBaseline: "middle",
          fontWeight: "normal",
          textAlign: "center"
        },
        easing: "easeInCubic",
        easingTime: 400
      });

      this.newGame = new Backbone.PullOutButton({
        y: 300,
        text: "New Game "
      });
      this.newGame.on("tap", function() {
        gui.trigger("new");
      });

      this.resume = new Backbone.PullOutButton({
        y: 420,
        text: "Resume "
      });
      this.resume.on("tap", function() {
        gui.trigger("resume");
      });

      this.showCredits = new Backbone.PullOutButton({
        y: 540,
        text: "Credits "
      });

      this.savedGame = new Backbone.SavedGame({}, {
        world: this.world
      });

      this.credits = new Backbone.Credits();
      this.showCredits.on("tap", _.partial(this.showPanel, this.credits), this);

      this.on("attach", this.onAttach);
      this.on("detach", this.onDetach);
    },
    spawnImg: Backbone.SpriteSheet.prototype.spawnImg,
    onAttach: function() {
      this.onDetach();

      this.engine.add([this.banner, this.touchStart, this.newGame, this.showCredits, this.credits]);
      if (this.state.saved)
        this.engine.add([this.resume, this.savedGame]);

      if (this.ready)
        setTimeout(this.showButtons.bind(this), 100);
      else
        this.listenTo(this.engine, "tap", this.onTouchStart);
    },
    onDetach: function() {
      this.stopListening(this.engine);
      this.engine.remove([this.banner, this.touchStart, this.newGame, this.showCredits, this.credits, this.savedGame, this.resume]);
    },
    onTouchStart: function(e) {
      // Animate some stuff
      this.banner.set({
        targetX: this.banner.get("x"),
        targetY: 50
      });
      this.touchStart.set({
        targetX: this.touchStart.get("x"),
        targetY: 700
      });
      this.stopListening(this.engine);
      this.ready =  true;
      this.showButtons();
    },
    showButtons: function() {
      this.newGame.set({
        targetX: -this.newGame.get("width") + this.newGame.textMetrics.width + this.newGame.get("textPadding")*2,
        targetY: this.newGame.get("y")
      });
      this.showCredits.set({
        targetX: -this.showCredits.get("width") + this.showCredits.textMetrics.width + this.showCredits.get("textPadding")*2,
        targetY: this.showCredits.get("y")
      });
      if (this.state.saved) {
        this.resume.set({
          targetX: -this.resume.get("width") + this.resume.textMetrics.width + this.resume.get("textPadding")*2,
          targetY: this.resume.get("y")
        });
        this.savedGame.set({
          targetX: 720,
          targetY: this.savedGame.get("y")
        });
      }
    },
    hideButtons: function() {
      this.newGame.set("targetX", -this.newGame.get("width"));
      this.showCredits.set("targetX", -this.showCredits.get("width"));
      this.resume.set("targetX", -this.resume.get("width"));
      this.savedGame.set("targetX", 960);
    },
    showPanel: function(panel) {
      this.panel = panel;
      this.panel.set({
        targetX: this.panel.get("x"),
        targetY: 200
      });
      this.hideButtons();
      this.listenTo(this.engine, "tap", this.hidePanel);
    },
    hidePanel: function() {
      this.stopListening(this.engine);
      this.panel.set({
        targetX: this.panel.get("x"),
        targetY: 720
      });
      this.panel = undefined;
      this.showButtons();
    },
    update: function(dt) {
      return true;
    },
    draw: function(context) {

      if (this.img) {
        var img = this.img,
            width = context.canvas.width < img.width ? context.canvas.width : img.width,
            height = context.canvas.height < img.height ? context.canvas.height : img.height;
        context.drawImage(
          img,
          0, 0, width, height,
          0, 0, width, height
        );
      }

      return this;
    }
	});

}).call(this);
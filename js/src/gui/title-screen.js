(function() {

  var SPRITES = [{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":0,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":64,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":128,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":192,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":256,"y":1216},{"name":"h-wall","state":"idle","sequenceIndex":0,"x":320,"y":1024},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":320,"y":960},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":576,"y":960},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":512,"y":896},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":384,"y":896},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":384,"y":960},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":448,"y":960},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":512,"y":960},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":320,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":384,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":448,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":512,"y":1216},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":576,"y":1216},{"name":"hero1","state":"idle-right","sequenceIndex":0,"x":192,"y":1092,"nextState":"idle-right","velocity":0,"acceleration":0,"yVelocity":0,"yAcceleration":0},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":640,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":704,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":768,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":832,"y":1216},{"name":"f-grass2","state":"idle","sequenceIndex":0,"x":896,"y":1216},{"name":"f-bush1","state":"idle","sequenceIndex":0,"x":832,"y":1152},{"name":"f-bush2","state":"idle","sequenceIndex":0,"x":896,"y":1152},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":256,"y":832},{"name":"bc-brick7","state":"idle","sequenceIndex":0,"x":256,"y":896},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":320,"y":896},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":320,"y":832},{"name":"bc-brick9","state":"idle","sequenceIndex":0,"x":640,"y":896},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":640,"y":832},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":576,"y":832},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":576,"y":896},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":320,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":384,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":448,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":512,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":576,"y":768},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":320,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":384,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":448,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":512,"y":704},{"name":"bc-brick5","state":"idle","sequenceIndex":0,"x":576,"y":704},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":640,"y":768},{"name":"bc-brick6","state":"idle","sequenceIndex":0,"x":640,"y":704},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":256,"y":768},{"name":"bc-brick4","state":"idle","sequenceIndex":0,"x":256,"y":704},{"name":"bc-brick1","state":"idle","sequenceIndex":0,"x":256,"y":640},{"name":"bc-brick2","state":"idle","sequenceIndex":0,"x":384,"y":640},{"name":"bc-brick2","state":"idle","sequenceIndex":0,"x":512,"y":640},{"name":"bc-brick3","state":"idle","sequenceIndex":0,"x":640,"y":640},{"name":"bc-block1","state":"idle","sequenceIndex":0,"x":384,"y":832},{"name":"bc-block2","state":"idle","sequenceIndex":0,"x":448,"y":832},{"name":"bc-block2","state":"idle","sequenceIndex":0,"x":448,"y":896},{"name":"bc-block1","state":"idle","sequenceIndex":0,"x":512,"y":832}],
      WORLD = {"tileWidth":64,"tileHeight":64,"width":15,"height":20,"backgroundImage":"#background-town","puzzle":false,"level":99,"name":"TitleScreen","x":0,"y":-400,"backgroundColor":"rgba(2, 10, 23, 1)","sprites":SPRITES,"state":"play","viewportBottom":0,"viewportTop":0,"viewportRight":0,"viewportLeft":0,"time":0}

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

  Backbone.SavedGame = Backbone.Element.extend({
    defaults: _.extend({}, Backbone.Element.prototype.defaults, {
      x: 960,
      y: 280,
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
      Backbone.Element.prototype.initialize.apply(this, arguments);
      this.saved = options.saved;
    },
    onAttach: function() {
      Backbone.Element.prototype.onAttach.apply(this, arguments);
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
      context.textBaseline = this.attributes.textContextAttributes.textBaseline;
      context.fontWeight = this.attributes.textContextAttributes.fontWeight;
      context.textAlign = this.attributes.textContextAttributes.textAlign;
      context.fillText(coins, x+80, y+105);
      context.fillText(time, x+80, y+170);
    }
  });

  Backbone.Credits = Backbone.Panel.extend({
    defaults: _.extend({}, Backbone.Panel.prototype.defaults, {
      text: "",
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "40px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      }
    }),
    onDraw: function(context, options) {
      var b = this.toJSON(),
          y = b.y;

      // Titles
      b.textContextAttributes.font = "30px arcade";
      b.textContextAttributes.fillStyle = "#FFC221";

      b.text = "Graphics";
      b.y = y;
      this.drawText(b, context, options);

      b.text = "Testing";
      b.y = y + 130;
      this.drawText(b, context, options);

      b.text = "Story & Coding";
      b.y = y + 230;
      this.drawText(b, context, options);

      // Content
      b.textContextAttributes.font = "24px arcade";
      b.textContextAttributes.fillStyle = "#F67D00";

      b.text = "pzUH, TikusJenaka, kemotaku,";
      b.y = y + 40;
      this.drawText(b, context, options);

      b.text = "simirk, dxc, Saranai";
      b.y = y + 70;
      this.drawText(b, context, options);

      b.text = "Ludovic & Émilia";
      b.y = y + 170;
      this.drawText(b, context, options);

      b.text = "Martin";
      b.y = y + 270;
      this.drawText(b, context, options);

      b.textContextAttributes.fillStyle = "#DDD";
      b.text = "Built with Backbone Game Engine";
      b.y = y + 340;
      this.drawText(b, context, options);

    }
  });

	Backbone.TitleScreenGui = Backbone.Scene.extend({
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
        y: Backbone.HEIGHT,
        text: "Loading...",
        easingTime: 300
      });

      this.play = new Backbone.PullOutButton({
        y: 100,
        text: "New Game "
      });
      this.play.on("tap", _.partial(this.action, "play"), this);

      this.levelButton = new Backbone.PullOutButton({
        y: 220,
        text: "Levels "
      });
      this.levelButton.on("tap", _.partial(this.action, "showLevelScreen"), this);

      this.showCredits = new Backbone.PullOutButton({
        y: 340,
        text: "Credits "
      });

      this.savedGame = new Backbone.SavedGame({
        y: 100
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
      this.play.textMetrics = undefined;
      this.levelButton.textMetrics = undefined;
      this.showCredits.textMetrics = undefined;
    },
    onAttach: function() {
      Backbone.Scene.prototype.onAttach.apply(this, arguments);
      this.stopListening(this.engine);
      this.set("opacity", 1);
      this.loading.set("x", Backbone.HEIGHT);

      this.play.set("text", this.saved.size() > 0 ? "Continue " : "New Game ");

      var camera = this.world.camera;
      this.world.camera = undefined;
      this.world.set(WORLD);
      if (this.ready) this.world.set("y", this.engine.canvas.height - this.world.height());
      this.world.spawnSprites();
      this.world.camera = camera;

      this.engine.add([this.world, this.banner, this.touchStart, this.loading, this.play, this.levelButton, this.showCredits, this.credits, this.savedGame]);

      if (!this.ready)
        setTimeout(this.postInitialize.bind(this), 200);
      else 
        setTimeout(this.showButtons.bind(this), 100);
    },
    onDetach: function() {
      Backbone.Scene.prototype.onDetach.apply(this, arguments);
      this.engine.remove([this.world, this.banner, this.touchStart, this.loading, this.play, this.levelButton, this.showCredits, this.credits, this.savedGame]);
    },
    onTouchStart: function(e) {
      // Animate some stuff
      this.banner.moveTo(this.banner.get("x"), -this.banner.get("height"));
      this.touchStart.moveTo(this.touchStart.get("x"), Backbone.HEIGHT);
      this.stopListening(this.engine);
      this.ready = true;
      this.showButtons();
      this.world.pan(0, this.engine.canvas.height - this.world.height());
    },
    showButtons: function() {
      this.play.moveTo(-this.play.get("width") + this.play.textMetrics.width + this.play.get("textPadding")*2, this.play.get("y"));
      this.levelButton.moveTo(-this.levelButton.get("width") + this.levelButton.textMetrics.width + this.levelButton.get("textPadding")*2, this.levelButton.get("y"));
      this.showCredits.moveTo(-this.showCredits.get("width") + this.showCredits.textMetrics.width + this.showCredits.get("textPadding")*2, this.showCredits.get("y"));
      if (this.saved.size() > 0)
        this.savedGame.moveTo(720, this.savedGame.get("y"));
    },
    hideButtons: function() {
      this.play.moveTo(-this.play.get("width"), this.play.get("y"));
      this.levelButton.moveTo(-this.levelButton.get("width"), this.levelButton.get("y"));
      this.showCredits.moveTo(-this.showCredits.get("width"), this.showCredits.get("y"));
      this.savedGame.moveTo(960, this.savedGame.get("y"));
    },
    showPanel: function(panel) {
      this.panel = panel;
      this.panel.moveTo(this.panel.get("x"), 50);
      this.hideButtons();
      this.listenTo(this.engine, "tap", this.hidePanel);
    },
    hidePanel: function() {
      this.stopListening(this.engine);
      this.panel.moveTo(this.panel.get("x"), Backbone.HEIGHT);
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
      this.play.set(attrs, options);
      this.showCredits.set(attrs, options);
      this.credits.set(attrs, options);
      this.levelButton.set(attrs, options);
      this.savedGame.set(attrs, options);

      return true;
    },
    action: function(event) {
      if (event == "play") this.loading.set("x", 400);

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
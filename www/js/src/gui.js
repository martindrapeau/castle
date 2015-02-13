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

  Backbone.HighScore = Backbone.Button.extend({
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
        y: 400,
        text: "Resume "
      });
      this.resume.on("tap", function() {
        gui.trigger("resume");
      });

      this.highScore = new Backbone.HighScore({}, {
        world: this.world
      });

      this.on("attach", this.onAttach);
      this.on("detach", this.onDetach);
    },
    onAttach: function() {
      this.onDetach();

      this.engine.add([this.banner, this.touchStart, this.newGame]);
      if (this.state.saved)
        this.engine.add([this.resume, this.highScore]);

      if (this.ready)
        setTimeout(this.showResume.bind(this), 100);
      else
        this.listenTo(this.engine, "tap", this.onTap);
    },
    onDetach: function() {
      this.stopListening(this.engine);
      this.engine.remove([this.banner, this.touchStart, this.newGame, this.highScore, this.resume]);
    },
    spawnImg: Backbone.SpriteSheet.prototype.spawnImg,
    onTap: function(e) {
      this.newGame.set({
        targetX: -this.newGame.get("width") + this.newGame.textMetrics.width + this.newGame.get("textPadding")*2,
        targetY: this.newGame.get("y")
      });
      if (this.state.saved) this.showResume();
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
    },
    showResume: function() {
      this.resume.set({
        targetX: -this.resume.get("width") + this.resume.textMetrics.width + this.resume.get("textPadding")*2,
        targetY: this.resume.get("y")
      });
      this.highScore.set({
        targetX: 720,
        targetY: this.highScore.get("y")
      });
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
(function() {

  var slideVelocity = 800,
      buttonWidth = 372;

  Backbone.PullOutButton = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      // Change these
      y: 0,
      text: "",
      // Do not change these
      x: -buttonWidth,
      velocity: 0,
      width: buttonWidth,
      height: 76,
      visible: false,
      backgroundColor: "transparent",
      img: "#artifacts", imgX: 0, imgY: 538, imgWidth: 372, imgHeight: 80, imgMargin: 0,
      textPadding: 12,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "34px arcade, Verdana, Arial, Sans-Serif",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "right"
      }
    }),
    update: function(dt) {
      if (!this.textMetrics) return true;

      var visible = this.get("visible"),
          x = this.get("x"),
          width = this.get("width"),
          padding = this.get("textPadding"),
          targetX = visible ? (this.textMetrics.width - width + padding*2) : Math.round(-width),
          velocity = this.get("velocity"),
          attrs = {};

      if (visible && x < targetX) {
        attrs.velocity = velocity = slideVelocity;
      } else if (!visible && x > targetX) {
        attrs.velocity = velocity = -slideVelocity;
      } else {
        attrs.velocity = velocity = 0;
        attrs.x = targetX;
      }

      if (velocity) attrs.x = x = x + velocity * (dt/1000);

      if (!_.isEmpty(attrs)) this.set(attrs);

      return true;
    }
  });

  Backbone.Banner = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      retracted: false,
      x: 0,
      y: 240,
      yVelocity: 0,
      width: 960, height: 145,
      backgroundColor: "transparent",
      img: "#artifacts", imgX: 0, imgY: 618, imgWidth: 960, imgHeight: 145, imgMargin: 5
    }),
    update: function(dt) {
      var retracted = this.get("retracted"),
          y = this.get("y"),
          yVelocity = this.get("yVelocity"),
          targetY = retracted ? 50 : 240,
          attrs = {};

      if (retracted && y > targetY) {
        attrs.yVelocity = yVelocity  = -slideVelocity;
      } else if (!retracted && y < targetY) {
        attrs.yVelocity = yVelocity  = slideVelocity;
      } else {
        attrs.yVelocity = yVelocity = 0;
        attrs.y = targetY;
      }

      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      if (!_.isEmpty(attrs)) this.set(attrs);

      return true;
    }
  });

  Backbone.StartButton = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      visible: true,
      x: 400,
      y: 400,
      text: "Touch to start",
      width: 160,
      height: 100,
      backgroundColor: "transparent",
      textPadding: 12,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "40px arcade, Verdana, Arial, Sans-Serif",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      }
    }),
    update: function(dt) {
      var visible = this.get("visible"),
          y = this.get("y"),
          targetY = visible ? 400 : 720,
          yVelocity = this.get("yVelocity"),
          attrs = {};

      if (visible && y > targetY) {
        attrs.yVelocity = yVelocity  = -slideVelocity*2;
      } else if (!visible && y < targetY) {
        attrs.yVelocity = yVelocity  = slideVelocity*2;
      } else {
        attrs.yVelocity = yVelocity = 0;
        attrs.y = targetY;
      }

      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      if (!_.isEmpty(attrs)) this.set(attrs);

      return true;
    }
  });

	Backbone.Gui = Backbone.Model.extend({
    defaults: {
      img: undefined
    },
    initialize: function(attributes, options) {
      options || (options = {});
      this.state = options.state;

      var gui = this;
      if (!this.img && this.attributes.img) this.spawnImg();

      this.banner = new Backbone.Banner({
        retracted: false
      });

      this.touchStart = new Backbone.StartButton({
        visible: true
      });

      this.newGame = new Backbone.PullOutButton({
        y: 500,
        text: "New Game "
      });
      this.newGame.on("tap", function() {
        gui.trigger("new");
      });

      this.resume = new Backbone.PullOutButton({
        y: 600,
        text: "Resume "
      });
      this.resume.on("tap", function() {
        gui.trigger("resume");
      });

      this.on("attach", this.onAttach);
      this.on("detach", this.onDetach);
    },
    onAttach: function() {
      this.onDetach();
      this.engine.add([this.banner, this.touchStart, this.newGame]);
      if (this.state.saved) this.engine.add(this.resume);
      this.listenTo(this.engine, "tap", this.onTap);
    },
    onDetach: function() {
      this.stopListening(this.engine);
      this.engine.remove([this.banner, this.touchStart, this.newGame, this.resume]);
    },
    spawnImg: Backbone.SpriteSheet.prototype.spawnImg,
    onTap: function(e) {
      if (!this.newGame.get("visible")) {
        this.newGame.set("visible", true);
        this.touchStart.set("visible", false);
        this.resume.set("visible", true);
        this.banner.set("retracted", true);
      }
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
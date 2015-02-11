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
      }

      if (velocity) attrs.x = x = x + velocity * (dt/1000);

      if (!_.isEmpty(attrs)) this.set(attrs);

      return true;
    }
  })

	Backbone.Gui = Backbone.Model.extend({
    defaults: {
      img: undefined
    },
    initialize: function(attributes, options) {
      options || (options = {});
      this.state = options.state;

      var gui = this;
      if (!this.img && this.attributes.img) this.spawnImg();

      this.newGame = new Backbone.PullOutButton({
        y: 500,
        text: "New Game "
      });
      this.newGame.on("pressed", function() {
        gui.trigger("new");
      });

      this.resume = new Backbone.PullOutButton({
        y: 600,
        text: "Resume "
      });
      this.resume.on("pressed", function() {
        gui.trigger("resume");
      });

      this.on("attach", this.onAttach);
      this.on("detach", this.onDetach);
    },
    onAttach: function() {
      this.onDetach();
      this.engine.add(this.newGame);
      if (this.state.saved) this.engine.add(this.resume);
      this.listenTo(this.engine, "tap", this.onTap);
    },
    onDetach: function() {
      this.stopListening(this.engine);
      this.engine.remove([this.newGame, this.resume]);
    },
    spawnImg: Backbone.SpriteSheet.prototype.spawnImg,
    onTap: function(e) {
      if (!this.newGame.get("visible")) {
        this.newGame.set("visible", true);
        this.resume.set("visible", true);
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
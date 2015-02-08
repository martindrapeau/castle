(function() {

  var textContextAttributes = {
    fillStyle: "#000",
    font: "34px arcade, Verdana, Arial, Sans-Serif",
    textBaseline: "middle",
    fontWeight: "normal",
    textAlign: "right"
  };

	Backbone.Gui = Backbone.Model.extend({
    defaults: {
      img: undefined
    },
    initialize: function(attributes, options) {
      options || (options = {});
      this.state = options.state;

      var gui = this;
      _.bindAll(this, "onTap");
      if (!this.img && this.attributes.img) this.spawnImg();

      this.newGame = new Backbone.Button({
        x: -5,
        y: 500,
        width: 224,
        height: 60,
        text: "New Game ",
        textPadding: 10,
        borderRadius: 5,
        textContextAttributes: textContextAttributes
      });
      this.newGame.on("tap", function() {
        gui.trigger("new");
      });

      this.resume = new Backbone.Button({
        x: -5,
        y: 600,
        width: 170,
        height: 60,
        text: "Resume ",
        textPadding: 10,
        borderRadius: 5,
        textContextAttributes: textContextAttributes
      });
      this.resume.on("tap", function() {
        gui.trigger("resume");
      });

      this.on("attach", this.onAttach);
      this.on("detach", this.onDetach);
    },
    onAttach: function() {
      if (!this.hammertime) this.hammertime = Hammer(document);
      this.onDetach();
      this.hammertime.on("tap", this.onTap);
      this.engine.add(this.newGame);
      if (this.state.saved) this.engine.add(this.resume);
    },
    onDetach: function() {
      this.engine.remove([this.newGame, this.resume]);
      if (this.hammertime) this.hammertime.off("tap", this.onTap);
    },
    spawnImg: Backbone.SpriteSheet.prototype.spawnImg,
    onTap: function(e) {
      var x = e.gesture.center.clientX - this.engine.canvas.offsetLeft + this.engine.canvas.scrollLeft,
          y = e.gesture.center.clientY - this.engine.canvas.offsetTop + this.engine.canvas.scrollTop;
      if (x >= 0 && x <= this.engine.canvas.width && y >= 0 && y <= this.engine.canvas.height)
        this.trigger("tap");
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
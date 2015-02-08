(function() {

  var textContextAttributes = {
    fillStyle: "#000",
    font: "24px arcade, Verdana, Arial, Sans-Serif",
    textBaseline: "top",
    fontWeight: "normal",
    textAlign: "left",
  };

	Backbone.Gui = Backbone.Model.extend({
    defaults: {
      img: undefined
    },
    initialize: function(attributes, options) {
      var gui = this;

      _.bindAll(this, "onTap");
      if (!this.img && this.attributes.img) this.spawnImg();

      this.newGame = new Backbone.Button({
        x: 0, y: 200,
        width: 250,
        height: 50,
        text: "New Game",
        textContextAttributes: textContextAttributes
      });
      this.newGame.on("tap", function() {
        gui.trigger("new");
      });

      this.resume = new Backbone.Button({
        x: 0, y: 400,
        width: 250,
        height: 50,
        text: "Resume",
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
      this.engine.add([this.newGame, this.resume]);
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
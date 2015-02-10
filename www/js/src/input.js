(function() {

  var left = 0,
      right = 900,
      top = 0,
      bottom = 660,
      size = 100;

  Backbone.Gamepad = Backbone.Input.extend({
    defaults: _.extend({
      img: "#input"
    }, Backbone.Input.prototype.defaults),
    touchButtons: [{
      button: "left",
      x: left, y: bottom-100,
      width: 120,  height: 150,
      draw: function(context, pressed) {
        context.save();
        //drawRect(context, this.x, this.y, this.width, this.height, "rgba(64, 64, 64, 0.5)");
        if (!pressed) context.globalAlpha = 0.7;
        context.drawImage(
          this.img,
          0, 0, size, size,
          30, context.canvas.height-135, size, size
        );
        context.restore();
      }
    }, {
      button: "right",
      x: 120, y: bottom-100,
      width: 120,  height: 150,
      draw: function(context, pressed) {
        context.save();
        //drawRect(context, this.x, this.y, this.width, this.height, "rgba(128, 128, 128, 0.5)");
        if (!pressed) context.globalAlpha = 0.7;
        context.drawImage(
          this.img,
          100, 0, size, size,
          130, context.canvas.height-135, size, size
        );
        context.restore();
      }
    }, {
      button: "buttonB",
      x: right-240, y: bottom-100,
      width: 150,  height: 150,
      draw: function(context, pressed) {
        context.save();
        //drawRect(context, this.x, this.y, this.width, this.height, "rgba(192, 192, 192, 0.5)");
        if (!pressed) context.globalAlpha = 0.7;
        context.drawImage(
          this.img,
          200, 0, size, size,
          context.canvas.width-250, context.canvas.height-130, size, size
        );
        context.restore();
      }
    }, {
      button: "buttonA",
      x: right-352, y: bottom-100,
      width: 192,  height: 192,
      draw: function(context, pressed) {
        context.save();
        //drawRect(context, this.x, this.y, this.width, this.height, "rgba(255, 255, 255, 0.5)");
        if (!pressed) context.globalAlpha = 0.7;
        context.drawImage(
          this.img,
          300, 0, size, size,
          context.canvas.width-150, context.canvas.height-130, size, size
        );
        context.restore();
      }
    }, {
      button: "pause",
      x: (right-left)/2 - 90, y: bottom-80,
      width: 180, height: 80,
      draw: function(context, pressed) {
        var fillStyle = pressed ? "#999" : "#666";
        drawRoundRect(context, (context.canvas.width-60)/2 - 90, context.canvas.height-40-80, 180, 60, 5, fillStyle);
        drawButtonLabel(context, "PAUSE", (context.canvas.width-60)/2, context.canvas.height-40-50);
      }
    }],
    spawnImg: Backbone.SpriteSheet.prototype.spawnImg,
    initialize: function() {
      Backbone.Input.prototype.initialize.apply(this, arguments);

      this.spawnImg();
      var img = this.img;
      _.each(this.touchButtons, function(button) {
        button.img = img;
      });
    }
  });
  
}).call(this);
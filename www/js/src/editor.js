(function() {

  // Enhance the editor to overlay the artifact on the breakale tile

	var draw = Backbone.WorldEditor.prototype.draw;

  Backbone.WorldEditor.prototype.draw = function(context) {
    draw.apply(this, arguments);
    var page = this.attributes.page;

    // Draw artifacts on sprites
    this.sprites.each(function(sprite) {
      if (sprite.attributes.page == page && sprite.attributes.artifact) {
        var cls = _.classify(sprite.attributes.artifact),
            animation = Backbone[cls].prototype.animations.idle,
            spriteSheet = Backbone[cls].prototype.spriteSheet,
            sequence = animation.sequences[0],
            frameIndex = _.isNumber(sequence) ? sequence : sequence.frame,
            frame = spriteSheet.frames[frameIndex],
            x = sprite.attributes.x,
            y = sprite.attributes.y;

        context.drawImage(
          spriteSheet.img,
          frame.x, frame.y, frame.width, frame.height,
          x, y, frame.width, frame.height
        );
      }

    });
  };

}).call(this);
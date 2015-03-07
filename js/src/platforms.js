(function() {

  var floatVelocity = 40,
      floatAcceleration = 100;

	var Platform = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      spriteSheet: "platforms",
      width: 192,
      height: 64,
      paddingTop: 16,
      type: "character",
      state: "float-left",
      collision: true,
      isPlatform: true
    }),
    animations: {
      "idle-left": {
        sequences: [0],
        delay: 0
      },
      "idle-right": {
        sequences: [0],
        delay: 0
      },
      "float-left": {
        sequences: [0],
        delay: 0,
        velocity: -floatVelocity,
        acceleration: floatAcceleration
      },
      "float-right": {
        sequences: [0],
        delay: 0,
        velocity: floatVelocity,
        acceleration: floatAcceleration
      }
    },
    hit: function(sprite, dir, dir2) {
      return this;
    },
    update: function(dt) {
      // Movements are only possible inside a world
      if (!this.world) return true;
      this.cancelUpdate = false;

      // Velocity and state
      var velocity = this.get("velocity") || 0,
          yVelocity = this.get("yVelocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          cur = this.getStateInfo(),
          animation = this.getAnimation(),
          attrs = {};

      attrs.sequenceIndex = this.updateSequenceIndex();

      if  (cur.mov == "idle") return true;

      if (this.world.get("state") != "play") {
        attrs.velocity = velocity = 0;
      } else {

        var collision = this.get("collision"),
            tileWidth = this.get("width"),
            tileHeight = this.get("height"),
            paddingLeft = this.get("paddingLeft"),
            paddingRight = this.get("paddingRight"),
            paddingBottom = this.get("paddingBottom"),
            paddingTop = this.get("paddingTop"),
            platWidth = tileWidth - paddingLeft - paddingRight,
            platHeight = tileHeight - paddingTop - paddingBottom,
            platBottomY = Math.round(y + yVelocity * (dt/1000)) + tileHeight - paddingBottom,
            platTopY = platBottomY - platHeight,
            platMidY = platBottomY - platHeight/2,
            platLeftX = Math.round(x + velocity * (dt/1000)) + paddingLeft,
            platRightX = platLeftX + platWidth;

        if (cur.dir == "left") {
          if (velocity > animation.velocity)
            velocity -= animation.acceleration * (dt/1000);
          if (velocity < animation.velocity)
            velocity = animation.velocity;
          attrs.velocity = velocity;

          var leftTile = this.world.findAt(platLeftX, platMidY, "tile", this, true)
              worldLeft = -tileWidth,
              leftX = _.maxNotNull([
                worldLeft,
                leftTile ? leftTile.getRight(true) : null
              ]);

          if (platLeftX <= leftX) {
            attrs.velocity = velocity = 0;
            attrs.state = this.buildState(cur.mov, cur.opo);
            attrs.x = x = leftX - paddingLeft;
          }
        } else if (cur.dir == "right") {
          if (velocity < animation.velocity)
            velocity += animation.acceleration * (dt/1000);
          if (velocity > animation.velocity)
            velocity = animation.velocity;
          attrs.velocity = velocity;

          var rightTile = this.world.findAt(platRightX, platMidY, "tile", this, true)
              worldRight = this.world.width(),
              rightX = _.minNotNull([
                worldRight,
                rightTile ? rightTile.getLeft(true) : null
              ]);

          if (platRightX >= rightX) {
            attrs.velocity = velocity = 0;
            attrs.state = this.buildState(cur.mov, cur.opo);
            attrs.x = x = rightX - platWidth - paddingLeft;
          }
        }
      }

      if (velocity) attrs.x = x = x + Math.round(velocity * (dt/1000));

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      return true;
    }
	});

  extendSprite(Platform, "h-barge");

}).call(this);
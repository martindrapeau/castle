(function() {

	// Sprite which respects gravity
  Backbone.Object = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      type: "character",
      state: "idle",
      collision: true
    }),
    animations: {
      idle: {
        sequences: [0],
        delay: 0
      },
      fall: {
        sequences: [0],
        delay: 0,
        yVelocity: 600,
        yAcceleration: 1200
      },
      ko: {
        sequences: [0],
        delay: 0
      }
    },
    initialize: function(attributes, options) {
      Backbone.Sprite.prototype.initialize.apply(this, arguments);
      options || (options = {});
      this.world = options.world;
      _.bindAll(this, "isBlocking");

      this.on("hit", this.hit, this);
    },
    isBlocking: function(sprite) {
      return false;
    },
    knockout: function(sprite, dir) {
      this.world.remove(this);
      return this;
    },
    hit: function(sprite, dir, dir2) {
      return this
    },
    getHitReaction: function(sprite, dir, dir2) {
      return null;
    },
    startNewAnimation: Backbone.Character.prototype.startNewAnimation,
    updateSequenceIndex: Backbone.Character.prototype.updateSequenceIndex,
    update: function(dt) {
      // Movements are only possible inside a world
      if (!this.world) return true;

      // Velocity and state
      var yVelocity = this.get("yVelocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          animation = this.getAnimation(),
          attrs = {};

      attrs.sequenceIndex = this.updateSequenceIndex();

      if (animation.yVelocity || animation.yAcceleration) {
        if (yVelocity < animation.yVelocity)
          yVelocity += animation.yAcceleration * (dt/1000);

        if (yVelocity >= animation.yVelocity)
          yVelocity = animation.yVelocity;
        attrs.yVelocity = yVelocity;
      }

      // Collision detection
      var collision = this.get("collision"),
          tileWidth = this.get("width"),
          tileHeight = this.get("height"),
          paddingTop = this.get("paddingTop"),
          paddingBottom = this.get("paddingBottom"),
          charHeight = tileHeight - paddingTop - paddingBottom,
          charBottomY = Math.round(y + yVelocity * (dt/1000)) + paddingTop + charHeight,
          charTopY = charBottomY - charHeight,
          bottomTile = state != "ko" ? this.world.findAt(x + tileWidth/2, charBottomY, "tile", this, true) : null,
          bottomCharacater = state != "ko" ? this.world.findAt(x + tileWidth/2, charBottomY, "character", this, true) : null,
          bottomWorld = this.world.height() + tileHeight,
          bottomY = _.minNotNull([
            this.get("floor"),
            bottomWorld,
            bottomTile ? bottomTile.get("y") : null,
            bottomCharacater && bottomCharacater.isBlocking(this) ? bottomCharacater.get("y") : null
          ]);

      if (yVelocity >= 0) {
        // Falling...
        if (charBottomY >= bottomY) {
          if (charBottomY >= bottomWorld) {
            this.world.remove(this);
            return false;
          }

          // Stop falling because obstacle below
          attrs.yVelocity = yVelocity = 0;
          attrs.y = y = bottomY - tileHeight + paddingBottom;
          if (state == "fall") attrs.state = "idle";
        } else if (state != "fall" && state != "ko" && charBottomY < bottomY) {
          // Start falling if no obstacle below
          attrs.state = "fall";
        }

      }

      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      return true;
    }

  });

}).call(this);
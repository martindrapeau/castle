(function() {
  Backbone.pagedSprites = {a: []};

  window.extendSprite = function(Cls, name, defaults, animations) {
    var prefix = name.split("-")[0];
    if (!Backbone.pagedSprites[prefix]) Backbone.pagedSprites[prefix] = [];
    Backbone.pagedSprites[prefix].push(name);

    var newCls = _.classify(name);
    Backbone[newCls] = Cls.extend({
      defaults: _.extend({}, Cls.prototype.defaults,
        {name: name},
        defaults || {}
      ),
      animations: animations || _.deepClone(Cls.prototype.animations)
    });

    return Backbone[newCls];
  }
  

  // Invisible barrier - never drawn but detect in collision detection
  // Useful for creating invisible barriers to prevent characters
  // from passing through
  Backbone.Barrier = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      name: "barrier",
      type: "character",
      state: "idle",
      collision: true,
      static: false,
      width: 64,
      height: 64,
      isBarrier: true
    }),
    isBlocking: function(sprite) {
      return true;
    },
    update: function(dt) {
      return false;
    }
  });
  Backbone.Barrier2x1 = Backbone.Barrier.extend({
    defaults: _.extend({}, Backbone.Barrier.prototype.defaults, {
      width: 128
    })
  });
  Backbone.Barrier1x2 = Backbone.Barrier.extend({
    defaults: _.extend({}, Backbone.Barrier.prototype.defaults, {
      height: 128
    })
  });

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
            bottomTile ? bottomTile.getTop(true) : null,
            bottomCharacater ? bottomCharacater.getTop(true) : null
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

  // Disappears after animation
  Backbone.Ephemeral = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      type: "decoration",
      state: "idle",
      collision: false,
      static: false,
      persist: false
    }),
    initialize: function(attributes, options) {
      options || (options = {});
      this.world = options.world;
      this.lastSequenceChangeTime = 0;
      _.bindAll(this, "onEnd");
    },
    update: function(dt) {
      Backbone.Sprite.prototype.update.apply(this, arguments);
      var animation = this.getAnimation();
      if (this.attributes.sequenceIndex == animation.sequences.length - 1)
        this.world.setTimeout(this.onEnd, 25);
      return true;
    },
    onEnd: function() {
      this.world.remove(this);
    }
  });


  // Background tile
  Backbone.Tile = Backbone.Sprite.extend({
    defaults: {
      type: "tile",
      width: 64,
      height: 64,
      spriteSheet: "tiles",
      state: "idle",
      static: true,
      persist: true
    },
    initialize: function(attributes, options) {
      options || (options = {});
      this.world = options.world;
      this.lastSequenceChangeTime = 0;
    }
  });


}).call(this);
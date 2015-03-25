(function() {
  Backbone.pagedSprites = {
    c: [],
    a: []
  };

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
      type: "barrier",
      state: "idle",
      collision: true,
      static: false,
      width: 64,
      height: 64
    }),
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

      this.on("hit", this.hit, this);
    },
    knockout: function(sprite, dir) {
      this.world.remove(this);
      return this;
    },
    hit: function(sprite, dir, dir2) {
      return this;
    },
    getHitReaction: function(sprite, dir, dir2) {
      return null;
    },
    startNewAnimation: Backbone.Character.prototype.startNewAnimation,
    updateSequenceIndex: Backbone.Character.prototype.updateSequenceIndex,
    update: function(dt) {
      // Movements are only possible inside a world
      if (!this.world) return true;
      this.cancelUpdate = false;

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
          paddingLeft = this.get("paddingLeft"),
          paddingRight = this.get("paddingRight"),
          paddingTop = this.get("paddingTop"),
          paddingBottom = this.get("paddingBottom"),
          charWidth = tileWidth - paddingLeft - paddingRight,
          charHeight = tileHeight - paddingTop - paddingBottom,
          charBottomY = Math.round(y + yVelocity * (dt/1000)) + paddingTop + charHeight,
          charTopY = charBottomY - charHeight,
          charLeftX = x + paddingLeft,
          charRightX = charLeftX + charWidth,
          bottomWorld = this.world.height() + tileHeight,
          bottomY = _.minNotNull([
            this.get("floor"),
            bottomWorld
          ]);
      attrs.relativeVelocity = attrs.relativeYVelocity = 0,

      this.buildCollisionMap(charTopY, charRightX, charBottomY, charLeftX);
      this.world.findCollisions(this.collisionMap, null, this, true);

      var sprite, i;
      for (i = 0; i < this.collisionMap.bottom.sprites.length; i++) {
        sprite = this.collisionMap.bottom.sprites[i];
        bottomY = Math.min(bottomY, sprite.getTop(true));
        attrs.relativeVelocity = sprite.get("relativeVelocity") || attrs.relativeVelocity;
        attrs.relativeYVelocity = sprite.get("relativeYVelocity") || attrs.relativeYVelocity;
      }

      if (yVelocity >= 0) {
        // Falling...
        if (charBottomY >= bottomY) {
          if (charBottomY >= bottomWorld) {
            this.world.remove(this);
            return false;
          }

          for (i = 0; i < this.collisionMap.bottom.sprites.length; i++)
            this.collisionMap.bottom.sprites[i].trigger("hit", this, "top");
          if (this.cancelUpdate) return this;
          
          // Stop falling because obstacle below
          attrs.yVelocity = yVelocity = 0;
          attrs.y = y = bottomY - tileHeight + paddingBottom;
          if (state == "fall") attrs.state = "idle";
        } else if (state != "fall" && state != "ko" && charBottomY < bottomY) {
          // Start falling if no obstacle below
          attrs.state = "fall";
        }

      }

      if (attrs.relativeVelocity) attrs.x = x = x + Math.round(attrs.relativeVelocity * (dt/1000));
      if (yVelocity || attrs.relativeYVelocity) attrs.y = y = y + Math.round((yVelocity + attrs.relativeYVelocity) * (dt/1000));

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      if (typeof this.onUpdate == "function") return this.onUpdate(dt);
      return true;
    },
    buildCollisionMap: function(top, right, bottom, left) {
      this.collisionMap || (this.collisionMap = {
        bottom: {x: 0, y: 0, dir: "bottom", sprites: [], sprite: null}
      });

      var width = right - left;
      this.collisionMap.bottom.x = left + width/2;
      this.collisionMap.bottom.y = bottom;
    }

  });

  // Disappears after animation by removing itself from the World.
  Backbone.Ephemeral = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      type: "decoration",
      state: "idle",
      collision: false,
      static: false,
      persist: false
    }),
    initialize: function(attributes, options) {
      Backbone.Sprite.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "onEnd");
    },
    update: function(dt) {
      Backbone.Sprite.prototype.update.apply(this, arguments);
      var animation = this.getAnimation();
      if (this.attributes.sequenceIndex == animation.sequences.length - 1 && !this.endTimerId)
        this.endTimerId = this.world.setTimeout(this.onEnd, 25);
      return true;
    },
    onEnd: function() {
      this.world.remove(this);
      this.endTimerId = undefined;
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
    }
  });


}).call(this);
(function() {

	// Explosion (disappears after animation)
  Backbone.Explosion = Backbone.Ephemeral.extend({
    defaults: _.extend({}, Backbone.Ephemeral.prototype.defaults, {
      name: "explosion",
      spriteSheet: "artifacts",
      state: "explode",
      width: 64,
      height: 64,
      zIndex: 1
    }),
    animations: {
      explode: {
        sequences: [0, 1, 2, 3, 4],
        delay: 50
      }
    }
  });

  // Shows a callout (bubble) with instructions and disappears
  Backbone.Callout = Backbone.Ephemeral.extend({
    defaults: _.extend({}, Backbone.Ephemeral.prototype.defaults, {
      name: "callout",
      spriteSheet: "callout",
      state: "callout",
      width: 126,
      height: 116,
      text: "Short text"
    }),
    animations: {
      callout: {
        sequences: [
          {frame: 0, x: 0, y: 0},
          {frame: 0, x: 0, y: -4},
          {frame: 0, x: 0, y: -8},
          {frame: 0, x: 0, y: -10},
          {frame: 0, x: 0, y: -8},
          {frame: 0, x: 0, y: -4},
          {frame: 0, x: 0, y: 0},
          {frame: 0, x: 0, y: 4},
          {frame: 0, x: 0, y: 8},
          {frame: 0, x: 0, y: 10},
          {frame: 0, x: 0, y: 8},
          {frame: 0, x: 0, y: 4},
          {frame: 0, x: 0, y: 0},
          {frame: 0, x: 0, y: -4},
          {frame: 0, x: 0, y: -8},
          {frame: 0, x: 0, y: -10},
          {frame: 0, x: 0, y: -8},
          {frame: 0, x: 0, y: -4},
          {frame: 0, x: 0, y: 0}
        ],
        delay: 100
      }
    },
    draw: function(context) {
      Backbone.Ephemeral.prototype.draw.apply(this, arguments);

      var animation = this.getAnimation(),
          sequence = animation.sequences[this.get("sequenceIndex")],
          x = this.world.get("x") + this.get("x") + this.get("width")/2 + sequence.x,
          y = this.world.get("y") + this.get("y") + this.get("height")/4 + sequence.y,
          text = this.get("text");

      context.fillStyle = "#E3BC70";
      context.font = "24px arcade";
      context.textBaseline = "top";
      context.fontWeight = "normal";
      context.textAlign = "center";
      context.fillText(text, x, y);
    }
  });


  // Artifacts
  var Artifact = Backbone.Object.extend({
    defaults: _.extend({}, Backbone.Object.prototype.defaults, {
      spriteSheet: "artifacts",
      type: "artifact",
      width: 64,
      height: 64,
      collision: true,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      paddingTop: 16
    }),
    hit: function(sprite, dir, dir2) {
      if (dir == "top" && sprite.get("type") == "breakable-tile") {
        sprite.trigger("hit", this, "bottom");
        return this;
      }

      var opo = dir == "left" ? "right" : "left";
      if (sprite.get("hero")) {
        sprite.trigger("hit", this, opo);
        return this.knockout(sprite, "left", dir2);
      }

      return this;
    },
    knockout: function(sprite, dir, dir2) {
      this.set({
        state: "ko",
        yVelocity: -this.animations["ko"].yVelocity/2,
        collision: false
      });
      return this;
    },
    onUpdate: function(dt) {
      if (this.attributes.state == "ko" && this.attributes.yVelocity > 0) {
        this.world.remove(this);
        return false;
      }

      return true;
    }
  });

  function buildArtifact(name, sequences) {
    var idleAnimation = {
          sequences: sequences,
          delay: 50
        },
        fallAnimation = {
          sequences: sequences,
          delay: 50,
          yVelocity: 1200,
          yAcceleration: 1200
        };

    extendSprite(Artifact, name, null, {
      "idle" : idleAnimation,
      "fall": fallAnimation,
      "ko": fallAnimation
    });
  }

  buildArtifact("a-coin", [5, 6, 7, 8]);
  buildArtifact("a-death", [11]);
  buildArtifact("a-key", [18]);
  buildArtifact("a-blue-potion", [14]);
  buildArtifact("a-red-potion", [15]);
  buildArtifact("a-green-potion", [16]);
  buildArtifact("a-health", [12]);
  buildArtifact("a-coin-bag", [20]);

  buildArtifact("a-dollar", [24]);
  buildArtifact("a-clock", [23]);
  Backbone.pagedSprites.a.pop();
  Backbone.pagedSprites.a.pop();

  Backbone.ADeath.prototype.knockout = function(sprite, dir, dir2) {
    var explosion = new Backbone.Explosion({
      x: this.get("x"),
      y: this.get("y")
    });
    this.world.add(explosion);
    this.world.remove(this);
    return this;
  };


  // Breakable tiles
  var BreakableTile = Backbone.Object.extend({
    defaults: _.extend({}, Backbone.Object.prototype.defaults, {
      spriteSheet: "tiles",
      type: "breakable-tile",
      width: 64,
      height: 64,
      health: 1,
      artifact: null,
      showContent: false,
      easing: "easeInOutCubic",
      easingTime: 400
    }),
    initialize: function(attributes, options) {
      Backbone.Object.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "endHit");
      this.explosion = new Backbone.Explosion();
      this.artifacts = [];
      if (this.attributes.artifact)
        this.artifacts.push(new Backbone[_.classify(this.attributes.artifact)]());
    },
    hit: function(sprite, dir, dir2) {
      if (dir == "bottom" && !sprite.get("hero")) {
        // Absorb the sprite
        this.set({state: "bounce", sequenceIndex: 0});
        this.artifacts.push(sprite);
        sprite.cancelUpdate = true;
        this.world.remove(sprite);
        return this;
      }

      if (!sprite || !sprite.get("hero") || dir2 != "attack") return;
      if (this.get("state") != "idle") return;

      this.set({state: "bounce", sequenceIndex: 0});
      this.world.setTimeout(this.endHit, 200);
      this.explosion.set({
        x: this.get("x"),
        y: this.get("y")
      });
      this.world.add(this.explosion);
      return this;
    },
    endHit: function() {
      this.set({
        state: "idle",
        health: this.get("health") - 1
      });
      if (this.get("health") == 0) {
        var x = this.get("x"),
            y = this.get("y"),
            artifact = this.get("artifact");
        this.trigger("exploded");
        for (var a = 0; a < this.artifacts.length; a++) {
          this.artifacts[a].set({x: x, y: y});
          this.world.add(this.artifacts[a]);
        }
        this.explosion.set({x: x, y: y});
        this.world.remove(this.explosion);
        this.world.add(this.explosion);
        this.world.remove(this);
      }
    },
    showContent: function(callback) {
      this._animation = "showContent";
      this._startTime = _.now();
      this._callback = callback;
      return this;
    },
    hideContent: function(callback) {
      this._animation = "hideContent";
      this._startTime = _.now();
      this._callback = callback;
      return this;
    },
    onDraw: function(context, options) {
      if (!this._animation && !this.attributes.showContent) return this;
      var x = this.get("x") + (options.offsetX || 0) + (options.tileWidth || this.get("width"))/2,
          y = this.get("y") + (options.offsetY || 0) + (options.tileHeight || this.get("height"))/2,
          radius = Math.round((options.tileWidth || this.get("width")) * 0.375),
          now = _.now(),
          factor = 1;

      if (this._animation) {
        if (now < this._startTime + this.attributes.easingTime) {
          factor = Backbone.EasingFunctions[this.attributes.easing]((now - this._startTime) / this.attributes.easingTime);
          if (this._animation == "hideContent") factor = 1 - factor;
        } else {
          this.set("showContent", this._animation == "showContent");
          if (typeof this._callback == "function") _.defer(this._callback.bind(this));
          this._animation = undefined;
          this._startTime = undefined;
          this._callback = undefined;
          if (this.attributes.showContent == false) return this;
        }
      }

      context.save();
      context.beginPath();
      context.arc(x, y, radius*factor, 0, 2*Math.PI, false);
      context.fillStyle = "#111";
      context.fill();
      context.clip();
      for (var i = 0; i < this.artifacts.length; i++) {
        var sprite = this.artifacts[i],
            animation = sprite.getAnimation(),
            sequence = animation.sequences[0]
            frameIndex = _.isNumber(sequence) ? sequence : sequence.frame,
            frame = sprite.spriteSheet.frames[frameIndex];

        context.drawImage(
          sprite.spriteSheet.img,
          frame.x, frame.y, frame.width, frame.height,
          x - frame.width/2, y - frame.height/2, frame.width, frame.height
        );
      }
      context.restore();

      return this;
    }
  });

  function buildBreakableTile(name, tileIndex, defaults) {
    extendSprite(BreakableTile, name, defaults, {
      idle: _.extend({}, Backbone.Object.prototype.animations.idle, {sequences: [tileIndex]}),
      fall: _.extend({}, Backbone.Object.prototype.animations.fall, {sequences: [tileIndex]}),
      ko: _.extend({}, Backbone.Object.prototype.animations.ko, {sequences: [tileIndex]}),
      bounce: {
        sequences: [
          {frame: tileIndex, x: 0, y: -8},
          {frame: tileIndex, x: 0, y: -8},
          {frame: tileIndex, x: 0, y: -4},
          {frame: tileIndex, x: 0, y: 0}
        ],
        delay: 50
      }
    });
  }

  buildBreakableTile("a-crate", 77);
  buildBreakableTile("a-crate-coin", 77, {artifact: "a-coin"});
  buildBreakableTile("a-crate-key", 77, {artifact: "a-key"});
  buildBreakableTile("a-crate-red-potion", 77, {artifact: "a-red-potion"});
  buildBreakableTile("a-crate-health", 77, {artifact: "a-health"});
  buildBreakableTile("a-crate-death", 77, {artifact: "a-death"});
  buildBreakableTile("a-crate-spider", 77, {artifact: "spider"});
  buildBreakableTile("a-barrel", 76);
  buildBreakableTile("a-barrel-coin", 76, {artifact: "a-coin"});
  buildBreakableTile("a-barrel-key", 76, {artifact: "a-key"});
  buildBreakableTile("a-barrel-red-potion", 76, {artifact: "a-red-potion"});
  buildBreakableTile("a-barrel-health", 76, {artifact: "a-health"});
  buildBreakableTile("a-barrel-death", 76, {artifact: "a-death"});
  buildBreakableTile("a-barrel-spider", 76, {artifact: "spider"});
  buildBreakableTile("a-hay", 102);
  buildBreakableTile("a-hay-coin", 102, {artifact: "a-coin"});
  buildBreakableTile("a-hay-key", 102, {artifact: "a-key"});
  buildBreakableTile("a-hay-red-potion", 102, {artifact: "a-red-potion"});
  buildBreakableTile("a-hay-health", 102, {artifact: "a-health"});
  buildBreakableTile("a-hay-death", 102, {artifact: "a-death"});
  buildBreakableTile("a-hay-spider", 102, {artifact: "spider"});
  buildBreakableTile("a-chess", 78);
  buildBreakableTile("a-chess-coin", 78, {artifact: "a-coin"});
  buildBreakableTile("a-chess-key", 78, {artifact: "a-key"});
  buildBreakableTile("a-chess-red-potion", 78, {artifact: "a-red-potion"});
  buildBreakableTile("a-chess-health", 78, {artifact: "a-health"});
  buildBreakableTile("a-chess-death", 78, {artifact: "a-death"});
  buildBreakableTile("a-chess-spider", 78, {artifact: "spider"});
  
}).call(this);
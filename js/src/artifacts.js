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

  Backbone.Fart = Backbone.Explosion.extend({
    defaults: _.extend({}, Backbone.Explosion.prototype.defaults, {
      name: "fart",
      spriteSheet: "farts",
      width: 21,
      height: 21,
      zIndex: 0
    })
  });

  // Shows a callout (bubble) with instructions and disappears
  Backbone.Callout = Backbone.Ephemeral.extend({
    defaults: _.extend({}, Backbone.Ephemeral.prototype.defaults, {
      name: "callout",
      spriteSheet: "callout",
      state: "callout",
      width: 126,
      height: 116,
      text: "Short text",
      textPadding: 0,
      textLineHeight: 30,
      textContextAttributes: {
        fillStyle: "#986E05",
        font: "24px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
      opacity: 1,
      scale: 1,
      zIndex: 1
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
          {frame: 0, x: 0, y: 0},
          {frame: 0, x: 0, y: 4},
          {frame: 0, x: 0, y: 8},
          {frame: 0, x: 0, y: 10},
          {frame: 0, x: 0, y: 8},
          {frame: 0, x: 0, y: 4},
          {frame: 0, x: 0, y: 0},
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
          {frame: 0, x: 0, y: 0}
        ],
        delay: 100
      }
    },
    draw: function(context) {
      Backbone.Ephemeral.prototype.draw.apply(this, arguments);

      var b = this.toJSON(),
          animation = this.getAnimation(),
          sequence = animation.sequences[this.get("sequenceIndex")];
      b.x = this.world.get("x") + b.x + sequence.x;
      b.y = this.world.get("y") + b.y + sequence.y - b.height*0.15;
      Backbone.Element.prototype.drawText(b, context);

      return this;
    }
  });


  Backbone.GainCoin = Backbone.Element.extend({
    defaults: _.extend({}, Backbone.Element.prototype.defaults, {
      width: 90,
      height: 64,
      backgroundColor: "transparent",
      img: "#artifacts", imgX: 256, imgY: 256, imgWidth: 64, imgHeight: 64, imgMargin: 0,
      text: "+1",
      textContextAttributes: {
        fillStyle: "#FFF",
        font: "32px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "right"
      },
      easing: "easeOutCubic",
      easingTime: 400
    }),
    onAttach: function() {
      Backbone.Element.prototype.onAttach.apply(this, arguments);
      this.stopListening(this.engine);
    },
    onUpdate: function(dt) {
      var now = _.now(),
          easingTime = this.get("easingTime"),
          easing = this.get("easing"),
          velocity = this._animation ? Backbone.EasingFunctions[easing]((now - this._startTime) / easingTime)*20 : 10;

      if (this._animation == "fadeOut") velocity -= 1;
      this.set("y", this.get("y") + velocity*(dt/1000));

      return true;
    }
  });


  // Artifacts
  var Artifact = Backbone.Object.extend({
    defaults: _.extend({}, Backbone.Object.prototype.defaults, {
      spriteSheet: "artifacts",
      type: "artifact",
      gain: 1,
      width: 64,
      height: 64,
      collision: true,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      paddingTop: 16
    }),
    hit: function(sprite, dir, dir2) {
      if (!this.world || this._handlingSpriteHit || this.get("state") == "ko") return this;
      this._handlingSpriteHit = sprite;
      
      if (dir == "top" && sprite.get("type") == "breakable-tile") {
        sprite.trigger("hit", this, "bottom");
      } else if (sprite.get("hero")) {
        sprite.trigger("hit", this, _.opo(dir));
        this.knockout(sprite, "left", dir2);
      }

      this._handlingSpriteHit = undefined;
      return this;
    },
    knockout: function(sprite, dir, dir2) {
      this.set({
        state: "ko",
        yVelocity: -this.animations["ko"].yVelocity/2,
        collision: false,
        ignorePhysics: true
      });
      return this;
    },
    onUpdate: function(dt) {
      if (this.attributes.state == "ko" && this.attributes.yVelocity >= 0) {
        this.world.remove(this);
        return false;
      }

      return true;
    }
  });

  function buildArtifact(Cls, name, sequences, attributes) {
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

    extendSprite(Cls, name, attributes, {
      "idle" : idleAnimation,
      "fall": fallAnimation,
      "ko": fallAnimation
    });
  }

  buildArtifact(Artifact, "a-coin", [5, 6, 7, 8], {gain: 1});
  buildArtifact(Artifact, "a-coin-bag", [20], {gain: 5});
  buildArtifact(Artifact, "a-death", [11]);
  buildArtifact(Artifact, "a-key", [18]);
  buildArtifact(Artifact, "a-blue-potion", [14]);
  buildArtifact(Artifact, "a-red-potion", [15]);
  buildArtifact(Artifact, "a-green-potion", [16]);
  buildArtifact(Artifact, "a-health", [12]);

  buildArtifact(Artifact, "a-dollar", [24]);
  buildArtifact(Artifact, "a-clock", [23]);
  Backbone.pagedSprites.a.pop();
  Backbone.pagedSprites.a.pop();

  Backbone.ADeath.prototype.knockout = function(sprite, dir, dir2) {
    this.world.add(new Backbone.Explosion({
      x: this.get("x"),
      y: this.get("y")
    }));
    this.world.remove(this);
    return this;
  };

  Backbone.ACoin.prototype.onUpdate = Backbone.ACoinBag.prototype.onUpdate = function(dt) {
    if (this.attributes.state == "ko" && this.attributes.yVelocity >= 0) {
      var engine = this.world.engine;
      var gain = window.gain = new Backbone.GainCoin({
        x: this.get("x") + this.world.get("x"),
        y: this.get("y") + this.world.get("y"),
        easingTime: 300,
        text: "+" + this.get("gain")
      });
      engine.add(gain);
      gain.fadeIn(function() {
        setTimeout(function() {
          gain.set("easingTime", 600);
          gain.fadeOut(function() {
            engine.remove(gain);
          });
        }, 1000);
      });
      this.world.remove(this);
      return false;
    }
    return true;
  };

  var Sword = Artifact.extend({
    defaults: _.extend({}, Artifact.prototype.defaults, {
      paddingBottom: 6,
      color: "rgba(0, 125, 249, {0})"
    }),
    initialize: function(attributes, options) {
      Artifact.prototype.initialize.apply(this, arguments);
      this._glowStartTime = 0;
      this._glowEasingTime = 2000;
      this._glowEasing = "linear";
    },
    onDraw: function(context, options) {
      var x = Math.round(this.get("x") + (options.offsetX || 0)),
          y = Math.round(this.get("y") + (options.offsetY || 0)),
          now = _.now(),
          scaleX = options && options.tileWidth ? options.tileWidth / this.get("width") : null,
          scaleY = options && options.tileHeight ? options.tileHeight / this.get("height") : null,
          color = this.get("color");

      if (now > this._glowStartTime + this._glowEasingTime) this._glowStartTime = now;
      
      var opacity = 1.0 - Math.abs(0.5-Backbone.EasingFunctions[this._glowEasing]((now - this._glowStartTime) / this._glowEasingTime))*1.2;

      context.save();
      context.beginPath();
      context.translate(x, y);
      if (_.isNumber(scaleX) || _.isNumber(scaleY)) context.scale(scaleX || 1, scaleY || 1);
      context.translate(44 - (scaleX < 0 ? frame.width : 0) , 23 - (scaleY < 0 ? frame.height : 0));
      context.rotate(Math.PI * -1.28);
      context.lineTo(0, 0);
      context.lineTo(36, -3);
      context.lineTo(42, 2);
      context.lineTo(36, 6);
      context.lineTo(0, 5);
      context.closePath();
      context.lineWidth = 1;
      context.fillStyle = color.replace("{0}", opacity);
      context.shadowColor = color.replace("{0}", 1);
      context.shadowBlur = 20;
      context.fill();
      context.restore();

      return this;
    }
  });

  buildArtifact(Sword, "a-blue-sword", [22], {color: "rgba(0, 125, 249, {0})"});

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
      if (!this.world || this._handlingSpriteHit || this.get("state") == "bounce") return this;
      this._handlingSpriteHit = sprite;

      if (dir == "bottom" && !sprite.get("hero")) {
        // Absorb the sprite
        this.set({state: "bounce", sequenceIndex: 0});
        this.artifacts.push(sprite);
        sprite.cancelUpdate = true;
        this.world.remove(sprite);
      } else if (sprite.get("hero") && sprite.isAttacking(this)) {
        // Take a hit
        this.set({state: "bounce", sequenceIndex: 0});
        this.world.setTimeout(this.endHit, 200);
        this.explosion.set({
          x: this.get("x"),
          y: this.get("y")
        });
        this.world.add(this.explosion);
        sprite.trigger("hit", this, _.opo(dir));
      }

      this._handlingSpriteHit = undefined;
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

  buildBreakableTile("a-crate", 22);
  buildBreakableTile("a-crate-coin", 22, {artifact: "a-coin"});
  buildBreakableTile("a-crate-coin-bag", 22, {artifact: "a-coin-bag"});
  buildBreakableTile("a-crate-key", 22, {artifact: "a-key"});
  buildBreakableTile("a-crate-red-potion", 22, {artifact: "a-red-potion"});
  buildBreakableTile("a-crate-health", 22, {artifact: "a-health"});
  buildBreakableTile("a-crate-death", 22, {artifact: "a-death"});
  buildBreakableTile("a-crate-spider", 22, {artifact: "spider"});
  buildBreakableTile("a-barrel", 93);
  buildBreakableTile("a-barrel-coin", 93, {artifact: "a-coin"});
  buildBreakableTile("a-barrel-key", 93, {artifact: "a-key"});
  buildBreakableTile("a-barrel-green-potion", 93, {artifact: "a-green-potion"});
  buildBreakableTile("a-barrel-health", 93, {artifact: "a-health"});
  buildBreakableTile("a-barrel-death", 93, {artifact: "a-death"});
  buildBreakableTile("a-barrel-spider", 93, {artifact: "spider"});
  buildBreakableTile("a-hay", 83);
  buildBreakableTile("a-hay-coin", 83, {artifact: "a-coin"});
  buildBreakableTile("a-hay-key", 83, {artifact: "a-key"});
  buildBreakableTile("a-hay-red-potion", 83, {artifact: "a-red-potion"});
  buildBreakableTile("a-hay-health", 83, {artifact: "a-health"});
  buildBreakableTile("a-hay-death", 83, {artifact: "a-death"});
  buildBreakableTile("a-hay-spider", 83, {artifact: "spider"});
  buildBreakableTile("a-chess", 108);
  buildBreakableTile("a-chess-coin", 108, {artifact: "a-coin"});
  buildBreakableTile("a-chess-coin-bag", 108, {artifact: "a-coin-bag"});
  buildBreakableTile("a-chess-key", 108, {artifact: "a-key"});
  buildBreakableTile("a-chess-red-potion", 108, {artifact: "a-red-potion"});
  buildBreakableTile("a-chess-health", 108, {artifact: "a-health"});
  buildBreakableTile("a-chess-death", 108, {artifact: "a-death"});
  buildBreakableTile("a-chess-spider", 108, {artifact: "spider"});
  buildBreakableTile("a-block", 98);
  buildBreakableTile("a-block-coin", 98, {artifact: "a-coin"});
  buildBreakableTile("a-block-coin-bag", 98, {artifact: "a-coin-bag"});
  buildBreakableTile("a-block-key", 98, {artifact: "a-key"});
  buildBreakableTile("a-block-red-potion", 98, {artifact: "a-red-potion"});
  buildBreakableTile("a-block-health", 98, {artifact: "a-health"});
  buildBreakableTile("a-block-death", 98, {artifact: "a-death"});
  buildBreakableTile("a-block-spider", 98, {artifact: "spider"});
  buildBreakableTile("a-vase", 71, {paddingTop: 14});
  buildBreakableTile("a-vase-coin", 71, {artifact: "a-coin", paddingTop: 14});
  buildBreakableTile("a-vase-coin-bag", 71, {artifact: "a-coin-bag", paddingTop: 14});
  buildBreakableTile("a-vase-key", 71, {artifact: "a-key", paddingTop: 14});
  buildBreakableTile("a-vase-red-potion", 71, {artifact: "a-red-potion", paddingTop: 14});
  buildBreakableTile("a-vase-health", 71, {artifact: "a-health", paddingTop: 14});
  buildBreakableTile("a-vase-death", 71, {artifact: "a-death", paddingTop: 14});
  buildBreakableTile("a-vase-spider", 71, {artifact: "spider", paddingTop: 14});
  
}).call(this);
(function() {

	// Explosion (disappears after animation)
  Backbone.Explosion = Backbone.Ephemeral.extend({
    defaults: _.extend({}, Backbone.Ephemeral.prototype.defaults, {
      name: "explosion",
      spriteSheet: "artifacts",
      state: "explode",
      width: 64,
      height: 64
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
      context.font = "24px arcade, Verdana, Arial, Sans-Serif";
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
      width: 64,
      height: 64,
      collision: true,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      paddingTop: 16,
      isArtifact: true
    }),
    hit: function(sprite, dir, dir2) {
      if (sprite.get("hero")) return this.knockout(sprite, "left");
      return this;
    },
    isBlocking: function(sprite) {
      return false;
    },
    knockout: function(sprite, dir) {
      this.set({
        state: "ko",
        yVelocity: -this.animations["ko"].yVelocity/2,
        collision: false
      });
      return this;
    },
    update: function(dt) {
      Backbone.Object.prototype.update.apply(this, arguments);

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
  buildArtifact("a-death", [10]);
  buildArtifact("a-health", [11]);
  buildArtifact("a-key", [17]);


  // Breakable tiles
  var BreakableTile = Backbone.Object.extend({
    defaults: _.extend({}, Backbone.Object.prototype.defaults, {
      spriteSheet: "tiles",
      width: 64,
      height: 64,
      isBreakableTile: true,
      health: 3,
      artifact: null
    }),
    initialize: function(attributes, options) {
      Backbone.Object.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "endAttack");
      this.on("attack", this.attack, this);
      this.explosion = new Backbone.Explosion();
    },
    isBlocking: function(sprite) {
      return true;
    },
    attack: function(sprite, dir) {
      if (!sprite || !sprite.get("hero")) return;
      if (this.get("state") != "idle") return;

      this.set({state: "bounce", sequenceIndex: 0});
      this.world.setTimeout(this.endAttack, 200);
      this.explosion.set({
        x: this.get("x"),
        y: this.get("y")
      });
      this.world.add(this.explosion);
    },
    endAttack: function() {
      this.set({
        state: "idle",
        health: this.get("health") - 1
      });
      if (this.get("health") == 0) {
        var x = this.get("x"),
            y = this.get("y"),
            artifact = this.get("artifact");
        this.world.remove(this);
        this.trigger("exploded");
        if (artifact) {
          var instance = new Backbone[_.classify(artifact)]({x: x, y: y});
          this.world.add(instance);
          this.trigger("artifact", instance);
        }
        this.explosion.set({x: x, y: y});
        this.world.add(this.explosion);
      }
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
  buildBreakableTile("a-crate-death", 77, {artifact: "a-death"});
  buildBreakableTile("a-barrel", 76);
  buildBreakableTile("a-barrel-coin", 76, {artifact: "a-coin"});
  buildBreakableTile("a-barrel-death", 76, {artifact: "a-death"});
  buildBreakableTile("a-hay", 102);
  buildBreakableTile("a-hay-coin", 102, {artifact: "a-coin"});
  
}).call(this);
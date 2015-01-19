(function() {

	// Explosion (disappears after animation)
  Backbone.Explosion = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      name: "explosion",
      type: "decoration",
      spriteSheet: "artifacts",
      collision: false,
      static: false,
      width: 64,
      height: 64,
      state: "explode"
    }),
    animations: {
      explode: {
        sequences: [0, 1, 2, 3, 4],
        delay: 50
      }
    },
    initialize: function(attributes, options) {
      options || (options = {});
      this.world = options.world;
      this.lastSequenceChangeTime = 0;
      _.bindAll(this, "onEnd");
    },
    update: function(dt) {
      Backbone.Sprite.prototype.update.apply(this, arguments);
      if (this.attributes.sequenceIndex == 4)
        this.world.setTimeout(this.onEnd, 25);
      return true;
    },
    onEnd: function() {
      this.world.remove(this);
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
  buildBreakableTile("a-hay", 102);
  buildBreakableTile("a-hay-coin", 102, {artifact: "a-coin"});
  buildBreakableTile("a-barrel", 76);
  buildBreakableTile("a-barrel-coin", 76, {artifact: "a-coin"});
  
}).call(this);
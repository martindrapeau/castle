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
      paddingTop: 16
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


  // Regular tiles
  var Tile = Backbone.Tile = Backbone.Sprite.extend({
    defaults: {
      type: "tile",
      width: 64,
      height: 64,
      spriteSheet: "tiles",
      state: "idle",
      static: true
    },
    initialize: function(attributes, options) {
      options || (options = {});
      this.world = options.world;
      this.lastSequenceChangeTime = 0;
    }
  });

  extendSprite(Tile, "bc-brick1", {collision: true}, {idle: {sequences: [0]}});
  extendSprite(Tile, "bc-brick2", {collision: true}, {idle: {sequences: [1]}});
  extendSprite(Tile, "bc-brick3", {collision: true}, {idle: {sequences: [2]}});

  extendSprite(Tile, "bc-brick4", {collision: true}, {idle: {sequences: [4]}});
  extendSprite(Tile, "bc-brick5", {collision: true}, {idle: {sequences: [5]}});
  extendSprite(Tile, "bc-brick6", {collision: true}, {idle: {sequences: [6]}});

  extendSprite(Tile, "bc-brick7", {collision: true}, {idle: {sequences: [8]}});
  extendSprite(Tile, "bc-brick8", {collision: true}, {idle: {sequences: [9]}});
  extendSprite(Tile, "bc-brick9", {collision: true}, {idle: {sequences: [10]}});
  
  extendSprite(Tile, "bc-block1", {collision: true}, {idle: {sequences: [12]}});
  extendSprite(Tile, "bc-block2", {collision: true}, {idle: {sequences: [13]}});

  extendSprite(Tile, "bc-pillar1", {collision: true}, {idle: {sequences: [20]}});
  extendSprite(Tile, "bc-pillar2", {collision: true}, {idle: {sequences: [21]}});
  extendSprite(Tile, "bc-pillar3", {collision: true}, {idle: {sequences: [22]}});

  extendSprite(Tile, "bc-spikes", {collision: true, paddingTop: 25}, {idle: {sequences: [16]}});

  extendSprite(Tile, "bc-chest", {collision: true}, {idle: {sequences: [78]}});

  extendSprite(Tile, "bc-table1", {collision: true}, {idle: {sequences: [80]}});
  extendSprite(Tile, "bc-table2", {collision: true}, {idle: {sequences: [81]}});

  extendSprite(Tile, "bc-vase1", {collision: true, paddingTop: 14}, {idle: {sequences: [84]}});
  extendSprite(Tile, "bc-vase2", {collision: true}, {idle: {sequences: [85]}});
  extendSprite(Tile, "bc-vase3", {collision: true, paddingTop: 23}, {idle: {sequences: [86]}});

  extendSprite(Tile, "f-grass1", {collision: true}, {idle: {sequences: [24]}});
  extendSprite(Tile, "f-grass2", {collision: true}, {idle: {sequences: [25]}});
  extendSprite(Tile, "f-grass3", {collision: true}, {idle: {sequences: [26]}});

  extendSprite(Tile, "f-ground1", {collision: true}, {idle: {sequences: [28]}});
  extendSprite(Tile, "f-ground2", {collision: true}, {idle: {sequences: [29]}});
  extendSprite(Tile, "f-ground3", {collision: true}, {idle: {sequences: [30]}});

  extendSprite(Tile, "f-ground4", {collision: true}, {idle: {sequences: [32]}});
  extendSprite(Tile, "f-ground5", {collision: true}, {idle: {sequences: [33]}});
  extendSprite(Tile, "f-ground6", {collision: true}, {idle: {sequences: [34]}});

  extendSprite(Tile, "f-grass4", {collision: true}, {idle: {sequences: [36]}});
  extendSprite(Tile, "f-grass5", {collision: true}, {idle: {sequences: [37]}});
  extendSprite(Tile, "f-grass6", {collision: true}, {idle: {sequences: [38]}});

  extendSprite(Tile, "f-ground7", {collision: true}, {idle: {sequences: [40]}});
  extendSprite(Tile, "f-ground8", {collision: true}, {idle: {sequences: [41]}});
  extendSprite(Tile, "f-water", {collision: false}, {idle: {sequences: [42]}});

  extendSprite(Tile, "f-stump1", {collision: true, paddingTop: 20, paddingLeft: 32}, {idle: {sequences: [88]}});
  extendSprite(Tile, "f-stump2", {collision: true, paddingTop: 20, paddingRight: 32}, {idle: {sequences: [89]}});

  extendSprite(Tile, "f-bush1", {collision: false}, {idle: {sequences: [92]}});
  extendSprite(Tile, "f-bush2", {collision: false}, {idle: {sequences: [93]}});

  extendSprite(Tile, "f-sign1", {collision: false}, {idle: {sequences: [96]}});
  extendSprite(Tile, "f-sign2", {collision: false}, {idle: {sequences: [97]}});

  extendSprite(Tile, "f-fence1", {collision: false}, {idle: {sequences: [100]}});
  extendSprite(Tile, "f-fence2", {collision: false}, {idle: {sequences: [101]}});

  extendSprite(Tile, "g-grass1", {collision: true}, {idle: {sequences: [44]}});
  extendSprite(Tile, "g-grass2", {collision: true}, {idle: {sequences: [45]}});
  extendSprite(Tile, "g-grass3", {collision: true}, {idle: {sequences: [46]}});

  extendSprite(Tile, "g-ground1", {collision: true}, {idle: {sequences: [48]}});
  extendSprite(Tile, "g-ground2", {collision: true}, {idle: {sequences: [49]}});
  extendSprite(Tile, "g-ground3", {collision: true}, {idle: {sequences: [50]}});

  extendSprite(Tile, "g-ground4", {collision: true}, {idle: {sequences: [52]}});
  extendSprite(Tile, "g-ground5", {collision: true}, {idle: {sequences: [53]}});
  extendSprite(Tile, "g-ground6", {collision: true}, {idle: {sequences: [54]}});

  extendSprite(Tile, "g-grass4", {collision: true}, {idle: {sequences: [56]}});
  extendSprite(Tile, "g-grass5", {collision: true}, {idle: {sequences: [57]}});
  extendSprite(Tile, "g-grass6", {collision: true}, {idle: {sequences: [58]}});

  extendSprite(Tile, "g-grass7", {collision: true}, {idle: {sequences: [60]}});
  extendSprite(Tile, "g-ground7", {collision: true}, {idle: {sequences: [61]}});
  extendSprite(Tile, "g-ground8", {collision: true}, {idle: {sequences: [62]}});
  extendSprite(Tile, "g-grass8", {collision: true}, {idle: {sequences: [64]}});

  extendSprite(Tile, "g-fence", {collision: false}, {idle: {sequences: [68]}});
  extendSprite(Tile, "g-chest", {collision: true, paddingTop: 13}, {idle: {sequences: [69]}});
  extendSprite(Tile, "g-pot", {collision: true, paddingTop: 18, paddingLeft: 10, paddingRight: 10}, {idle: {sequences: [70]}});

  extendSprite(Tile, "g-tombstone1", {collision: true, paddingTop: 4}, {idle: {sequences: [72]}});
  extendSprite(Tile, "g-tombstone2", {collision: true}, {idle: {sequences: [73]}});
  extendSprite(Tile, "g-tombstone3", {collision: true, paddingTop: 24}, {idle: {sequences: [74]}});


  // Doors
  var DoorTile = Tile.extend({
    defaults: _.extend({}, Tile.prototype.defaults, {
      spriteSheet: "doors",
      width: 192,
      height: 192,
      collision: false,
      static: false
    }),
    animations: {
      idle: {
        sequences: [0]
      },
      open: {
        sequences: [1, 2, 3, 4],
        delay: 100
      }
    }
  });
  extendSprite(DoorTile, "d-1");


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
    },
    isBlocking: function(sprite) {
      return true;
    },
    attack: function(sprite, dir) {
      if (!sprite || !sprite.get("hero")) return;
      if (this.get("state") != "idle") return;

      this.set({state: "bounce", sequenceIndex: 0});
      this.world.setTimeout(this.endAttack, 200);
      this.world.add(new Backbone.Explosion({
        x: this.get("x"),
        y: this.get("y")
      }));
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
        if (artifact) this.world.add(new Backbone[_.classify(artifact)]({x: x, y: y}));
        this.world.add(new Backbone.Explosion({x: x, y: y}));
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


  // Characters
  Backbone.pagedSprites.a.push("hero1");

}).call(this);
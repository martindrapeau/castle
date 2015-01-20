(function() {

  // Doors
  var DoorTile = Backbone.Tile.extend({
    defaults: _.extend({}, Backbone.Tile.prototype.defaults, {
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

  // House door - disappears after opened (animated)
  Backbone.HouseDoor = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      name: "house-door",
      spriteSheet: "house-door",
      collision: false,
      static: false,
      width: 94,
      height: 144,
      state: "open"
    }),
    animations: {
      open: {
        sequences: [0, 1, 2, 3, 4],
        delay: 100
      },
      close: {
        sequences: [4, 3, 2, 1, 0],
        delay: 100
      },
      "open-close": {
        sequences: [0, 1, 2, 3, 4, 4, 3, 2, 1, 0],
        delay: 100
      },
      "close-open": {
        sequences: [4, 3, 2, 1, 0, 0, 1, 2, 3, 4],
        delay: 100
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
      var animation = this.getAnimation();
      if (this.attributes.sequenceIndex == animation.sequences.length - 1)
        this.world.setTimeout(this.onEnd, 25);
      return true;
    },
    onEnd: function() {
      this.world.remove(this);
    }
  });

  // Houses
  var HouseTile = Backbone.Tile.extend({
    defaults: _.extend({}, Backbone.Tile.prototype.defaults, {
      spriteSheet: "houses",
      width: 432,
      height: 384,
      collision: false,
      doorX: 168,
      doorY: 240,
      static: true
    }),
    animations: {
      idle: {sequences: [0], delay: 0},
      open1:  {sequences: [0], delay: 0},
      open2:  {sequences: [0], delay: 0},
      open3:  {sequences: [0], delay: 0},
      inside: {sequences: [1], delay: 0},
      close1: {sequences: [0], delay: 0},
      close2: {sequences: [0], delay: 0}
    },
    assets: [],
    initialize: function(attributes, options) {
      Backbone.Tile.prototype.initialize.apply(this, arguments);
      if (!this.world) return;

      _.bindAll(this, "open", "close", "onStep", "tryOpenClose");

      var house = this,
          x = this.get("x"),
          y = this.get("y");

      this.door = new Backbone.HouseDoor({
          x: x + this.get("doorX"),
          y: y + this.get("doorY")
      });

      this.sprites = [];
      _.each(this.assets, function(def) {
        house.sprites.push(new Backbone[_.classify(def.name)]({
          x: x + def.x,
          y: y + def.y
        }));
      });

      this.listenTo(this.world, "tap", function(e) {
        if (house.overlaps(e)) house.tryOpenClose();
      });
      this.listenTo(this.world, "key", function(e) {
        if (e.keyCode == 38) house.tryOpenClose();
      });
    },
    tryOpenClose: function() {
      var character = this.world.sprites.findWhere({name: "hero1"});
      if (!character) return;

      var state = this.get("state");
      if (state != "idle" && state != "inside") return;

      var coords = {
        x: this.door.get("x") + this.door.get("width")*0.4,
        y: this.door.get("y"),
        width: this.door.get("width")*0.2,
        height: this.door.get("height")
      };
      if (character.overlaps(coords))
        if (this.get("state") == "idle")
          this.open(character);
        else
          this.close(character);
    },
    open: function(character) {
      this.set("state", "open1");
      this.character = character;
      this.onStep();
    },
    close: function(character) {
      this.set("state", "close1");
      this.character = character;
      this.onStep();
    },
    onStep: function() {
      var house = this,
          state = this.get("state"),
          world = this.world,
          character = this.character;

      switch (state) {
        case "open1":
          this.door.set({state: "open-close"});
          world.add(this.door);
          this.set("state", "open2");
          world.setTimeout(function() {
            character.set("y", character.get("y") - 16);
          }, 300);
          world.setTimeout(this.onStep, 700);
          break;

        case "open2":
          world.remove(character);
          this.set("state", "open3");
          world.setTimeout(this.onStep, 500);
          break;

        case "open3":
          this.set("state", "inside");
          world.add(character);
          _.each(this.sprites, world.add);
          this.listenTo(world.sprites, "remove", function(sprite) {
            house.sprites = _.without(house.sprites, sprite);
          });
          this.listenTo(world.sprites, "add", function(sprite) {
            house.sprites.push(sprite);
          });
          this.character = undefined;
          world.requestBackgroundRedraw = true;
          break;

        case "close1":
          this.stopListening(world.sprites);
          world.remove(character);
          _.each(this.sprites, world.remove);
          this.door.set({state: "open-close"});
          world.add(this.door);
          this.set("state", "close2");
          world.setTimeout(this.onStep, 500);
          world.requestBackgroundRedraw = true;
          break;

        case "close2":
          character.set("y", character.get("y") - 16);
          world.add(character);
          this.character = undefined;
          this.set("state", "idle");
          break;
      }
    }
  });
  
  function createHouse(name, tileIndex, defaults, assets) {
    var outside = {sequences: [tileIndex], delay: 0},
        inside = {sequences: [tileIndex+1], delay: 0};
    var Cls = extendSprite(HouseTile, name, defaults, {
      idle: outside,
      open1:  outside,
      open2:  outside,
      open3:  outside,
      inside: inside,
      close1: outside,
      close2: outside
    });
    Cls.prototype.assets = assets;
  }

  createHouse("h-1", 0, null, [
    {name: "bc-table1", x: 64, y: 320},
    {name: "bc-table2", x: 128, y: 320},
    {name: "a-barrel-coin", x: 320, y: 320},
    {name: "barrier1x2", x: -20, y: 256},
    {name: "barrier2x1", x: 0, y: 150},
    {name: "barrier2x1", x: 128, y: 150},
    {name: "barrier2x1", x: 256, y: 150},
    {name: "barrier1x2", x: 390, y: 256}
  ]);
  createHouse("h-2", 2, {
    doorX: 264
  }, [
    {name: "a-crate-coin", x: 192, y: 320},
    {name: "barrier1x2", x: 20, y: 256},
    {name: "barrier2x1", x: 0, y: 128},
    {name: "barrier2x1", x: 128, y: 128},
    {name: "barrier2x1", x: 256, y: 128},
    {name: "barrier1x2", x: 410, y: 256}
  ]);
  createHouse("h-3", 4, null, [
    {name: "a-crate-key", x: 64, y: 320},
    {name: "bc-table1", x: 256, y: 320},
    {name: "bc-table2", x: 320, y: 320},
    {name: "barrier1x2", x: -20, y: 256},
    {name: "barrier", x: 0, y: 150},
    {name: "barrier2x1", x: 64, y: 120},
    {name: "barrier2x1", x: 192, y: 120},
    {name: "barrier", x: 320, y: 150},
    {name: "barrier1x2", x: 390, y: 256}
  ]);

}).call(this);
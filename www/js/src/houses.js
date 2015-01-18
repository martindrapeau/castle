(function() {

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
    initialize: function(attributes, options) {
      Backbone.Tile.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "open", "onStep", "close");
      this.door = new Backbone.HouseDoor();
    },
    open: function(character) {
      if (!character) throw "Missing character argument";
      this.set("state", "open1");
      this.character = character;
      this.onStep();
    },
    close: function(character) {
      if (!character) throw "Missing character argument";
      this.set("state", "close1");
      this.character = character;
      this.onStep();
    },
    onStep: function() {
      var doorX = this.get("x") + this.get("doorX"),
          doorY = this.get("y") + this.get("doorY"),
          state = this.get("state");

      switch (state) {
        case "open1":
          this.door.set({state: "open-close", x: doorX, y: doorY});
          this.world.add(this.door);
          this.character.set("y", this.character.get("y") - 16);
          this.set("state", "open2");
          this.world.setTimeout(this.onStep, 500);
          break;

        case "open2":
          this.world.remove(this.character);
          this.set("state", "open3");
          this.world.setTimeout(this.onStep, 1000);
          break;

        case "open3":
          this.set("state", "inside");
          this.world.add(this.character);
          this.character = undefined;
          this.world.requestBackgroundRedraw = true;
          break;

        case "close1":
          this.world.remove(this.character);
          this.door.set({state: "open-close", x: doorX, y: doorY});
          this.world.add(this.door);
          this.set("state", "close2");
          this.world.setTimeout(this.onStep, 500);
          break;

        case "close2":
          this.character.set("y", this.character.get("y") - 16);
          this.world.add(this.character);
          this.set("state", "idle");
          this.world.setTimeout(this.onStep, 500);
          break;

        case "idle":
          this.character = undefined;
          this.world.requestBackgroundRedraw = true;
          break;
      }
    }
  });
  
  function createHouse(name, tileIndex, defaults) {
    var outside = {sequences: [tileIndex], delay: 0},
        inside = {sequences: [tileIndex+1], delay: 0};
    extendSprite(HouseTile, name, defaults, {
      idle: outside,
      open1:  outside,
      open2:  outside,
      open3:  outside,
      inside: inside,
      close1: outside,
      close2: outside
    });
  }

  createHouse("h-1", 0);
  createHouse("h-2", 2);
  createHouse("h-3", 4);

}).call(this);
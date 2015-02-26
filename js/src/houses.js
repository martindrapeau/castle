(function() {

  // A door is ephemeral - disapears from the world after animated
  function createDoor(name, sequences) {
    var cls = _.classify(name),
        reverse = sequences.slice().reverse();

    Backbone[cls] = Backbone.Ephemeral.extend({
      defaults: _.extend({}, Backbone.Ephemeral.prototype.defaults, {
        name: name,
        spriteSheet: "doors",
        state: "open",
        width: 100,
        height: 144
      }),
      animations: {
        open: {
          sequences: sequences,
          delay: 100
        },
        close: {
          sequences: reverse,
          delay: 100
        },
        "open-close": {
          sequences: sequences.concat(reverse),
          delay: 100
        },
        "close-open": {
          sequences: reverse.concat(sequences),
          delay: 100
        }
      }
    });
  }

  createDoor("house-door", [6, 7, 8, 9, 10]);
  createDoor("wall-door", [0, 1, 2, 3, 4, 5]);
  createDoor("cave-door", [12, 13, 14, 15, 16, 17]);


  // Houses
  var House = Backbone.Tile.extend({
    defaults: _.extend({}, Backbone.Tile.prototype.defaults, {
      spriteSheet: "houses",
      door: "house-door",
      width: 432,
      height: 384,
      collision: false,
      doorX: 168,
      doorY: 240,
      zIndex: 0,
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

      _.bindAll(this, "open", "close", "onStep", "tryOpenClose");

      var house = this,
          world = this.world,
          x = house.get("x"),
          y = house.get("y"),
          doorCls = _.classify(this.get("door"));

      house.door = new Backbone[doorCls]({
          x: x + house.get("doorX"),
          y: y + house.get("doorY"),
          persist: false
      });

      house.insideSprites = [];
      _.each(house.insideAssets, function(def) {
        house.insideSprites.push(new Backbone[_.classify(def.name)]({
          x: x + def.x,
          y: y + def.y,
          persist: false
        }));
      });

      house.outsideSprites = [];
      _.each(house.outsideAssets, function(def) {
        house.outsideSprites.push(new Backbone[_.classify(def.name)]({
          x: x + def.x,
          y: y + def.y,
          persist: false
        }));
      });

      this.on("addWorld", this.onAdd);
      this.on("removeWorld", this.onRemove);
    },
    onAdd: function() {
      _.each(this.spritesInWorld || this.outsideSprites, this.world.add);
      this.listenTo(this.world, "tap", function(e) {
        if (this.overlaps({x: e.worldX, y: e.worldY})) this.tryOpenClose();
      }, this);
      this.listenTo(this.world, "key", function(e) {
        if (e.keyCode == 38) this.tryOpenClose();
      }, this);
      return this;
    },
    onRemove:  function() {
      this.stopListening();
      this.spritesInWorld = _.union(
        _.reduce(this.insideSprites, function(sprites, sprite) {
          if (sprite.world) sprites.push(sprite);
          return sprites;
        }, []),
        _.reduce(this.outsideSprites, function(sprites, sprite) {
          if (sprite.world) sprites.push(sprite);
          return sprites;
        }, [])
      );
      _.each(this.spritesInWorld, this.world.remove);
      return this;
    },
    tryOpenClose: function() {
      var character = this.getHeroOverlappingCharacter("hero1");
      if (!character) return;

      var cur = character.getStateInfo();
      if (cur.mov != "idle" && cur.mov != "walk" && cur.mov != "release") return;

      var state = this.get("state");
      if (state != "idle" && state != "inside") return;

      if (this.get("state") == "idle")
        this.open(character);
      else
        this.close(character);
    },
    getHeroOverlappingCharacter: function(name) {
      var character = this.world.sprites.findWhere({name: name});
      if (!character) return null;

      var coords = {
        x: this.door.get("x") + this.door.get("width")*0.4,
        y: this.door.get("y"),
        width: this.door.get("width")*0.2,
        height: this.door.get("height")
      };
      return character.overlaps(coords) ? character : null;
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
    positionCharacter: function() {
      var charX = this.character.get("x") + this.character.get("width")/2,
          doorX = this.door.get("x") + this.door.get("width")/2,
          distance = doorX - charX,
          cur = this.character.getStateInfo(),
          attrs = {ignoreInput: true};
      if (charX < doorX) {
        attrs.state = this.character.buildState("jump", "right");
        attrs.nextState = this.character.buildState("release", "right");
      } else {
        attrs.state = this.character.buildState("jump", "left");
        attrs.nextState = this.character.buildState("release", "left");
      }
      attrs.velocity = distance*2;
      attrs.yVelocity = this.character.animations["jump-right"].yStartVelocity*0.4;
      this.character.set(attrs);
    },
    onStep: function() {
      var house = this,
          state = this.get("state"),
          world = this.world,
          character = this.character;

      switch (state) {
        case "open1":
          this.positionCharacter();
          this.door.set({state: "open-close"});
          world.add(this.door);
          this.set("state", "open2");
          world.setTimeout(this.onStep, 700);
          world.setTimeout(function() {
            world.remove(character);
          }, 400);
          break;

        case "open2":
          _.each(this.outsideSprites, world.remove);
          this.set("state", "open3");
          world.setTimeout(this.onStep, 500);
          break;

        case "open3":
          this.set("state", "inside");
          world.add(character);
          character.set({ignoreInput: false, velocity:  0});
          _.each(this.insideSprites, world.add);
          this.listenTo(world.sprites, "remove", function(sprite) {
            house.insideSprites = _.without(house.insideSprites, sprite);
          });
          this.listenTo(world.sprites, "add", function(sprite) {
            house.insideSprites.push(sprite);
          });
          this.character = undefined;
          world.requestBackgroundRedraw = true;
          break;

        case "close1":
          this.stopListening(world.sprites);
          world.remove(character);
          _.each(this.insideSprites, world.remove);
          this.door.set({state: "open-close"});
          world.add(this.door);
          this.set("state", "close2");
          world.setTimeout(this.onStep, 500);
          world.requestBackgroundRedraw = true;
          break;

        case "close2":
          character.set("y", character.get("y") - 16);
          world.add(character);
          character.set({ignoreInput: false, velocity:  0});
          _.each(house.outsideSprites, world.add);
          this.character = undefined;
          this.set("state", "idle");
          break;
      }
    }
  });
  
  function createHouse(name, tileIndex, defaults, insideAssets, outsideAssets) {
    var outside = {sequences: [tileIndex], delay: 0},
        inside = {sequences: [tileIndex+1], delay: 0};
    var Cls = extendSprite(House, name, defaults, {
      idle: outside,
      open1:  outside,
      open2:  outside,
      open3:  outside,
      inside: inside,
      close1: outside,
      close2: outside
    });
    Cls.prototype.insideAssets = insideAssets || [];
    Cls.prototype.outsideAssets = outsideAssets || [];
    return Cls;
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
  createHouse("h-cave", 0, {
    spriteSheet: "cave",
    door: "cave-door",
    width: 384,
    height: 256,
    doorX: 284,
    doorY: 48
  }, [
    {name: "a-crate-coin", x: 60, y: 192},
    {name: "barrier2x1", x: 256, y: 192},
    {name: "barrier1x2", x: 0, y: 64},
    {name: "barrier", x: 0, y: 192},
    {name: "barrier2x1", x: 0, y: 0},
    {name: "barrier2x1", x: 128, y: 0},
    {name: "barrier2x1", x: 256, y: -20},
    {name: "barrier1x2", x: 384, y: 128}
  ],[
    {name: "barrier2x1", x: 256, y: -20},
    {name: "barrier2x1", x: 256, y: 192},
    {name: "barrier1x2", x: 216, y: 0},
    {name: "barrier1x2", x: 216, y: 128}
  ]);


  var Wall = createHouse("h-wall", 0, {
    spriteSheet: "wall",
    door: "wall-door",
    width: 320,
    height: 192,
    doorX: 10,
    doorY: 48,
    outDoorX: 215
  }, [
    {name: "barrier-1x2", x: -54, y: 64},
    {name: "barrier-2x1", x: 0, y: 0},
    {name: "barrier-2x1", x: 128, y: 0},
    {name: "barrier", x: 256, y: 0},
    {name: "barrier-1x2", x: 310, y: 64}
  ], [
    {name: "barrier-2x1", x: 0, y: 0},
    {name: "barrier-2x1", x: 128, y: 0},
    {name: "barrier", x: 256, y: 0},
    {name: "barrier-2x1", x: 94, y: 64},
    {name: "barrier-2x1", x: 94, y: 128}
  ]);
  Wall.prototype.onStep = function() {
    House.prototype.onStep.apply(this, arguments);

    if (this.get("state") == "inside")
      this.door.set("x", this.get("x") + this.get("outDoorX"));
  };
  Wall.prototype.tryOpenClose = function() {
    var character = this.getHeroOverlappingCharacter("hero1");
    if (!character) return;

    var state = this.get("state");
    if (state != "idle" && state != "inside") return;

    if (this.get("state") == "idle") {
      var key = character.get("key");
      if (!key) {
        var callout = new Backbone.Callout({
          x: this.door.get("x"),
          y: this.door.get("y") - Backbone.Callout.prototype.defaults.height,
          text: "Key ?" 
        });
        this.world.add(callout);
      } else {
        character.set({key: false});
        this.open(character);
      }
    } else {
      this.close(character);
    }
  };


}).call(this);
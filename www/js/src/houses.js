(function() {

  // House door - disappears after opened (animated)
  var HouseDoor = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
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
        delay: 50
      },
      close: {
        sequences: [4, 3, 2, 1, 0],
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
      Backbone.Sprite.prototype.update.apply(this, arguments) == false;
      if (this.attributes.sequenceIndex == 4)
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
      doorY: 240
    })
  });
  
  function createHouse(name, tileIndex, defaults) {
    extendSprite(HouseTile, name, defaults, {
      idle: {
        sequences: [tileIndex]
      },
      inside: {
        sequences: [tileIndex+1]
      }
    });
  }

  createHouse("h-1", 0);
  createHouse("h-2", 2);
  createHouse("h-3", 4);

}).call(this);
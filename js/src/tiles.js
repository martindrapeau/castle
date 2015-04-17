(function() {

  extendSprite(Backbone.Tile, "bc-brick1", {collision: true}, {idle: {sequences: [0]}});
  extendSprite(Backbone.Tile, "bc-brick2", {collision: true}, {idle: {sequences: [1]}});
  extendSprite(Backbone.Tile, "bc-brick3", {collision: true}, {idle: {sequences: [2]}});

  extendSprite(Backbone.Tile, "bc-brick4", {collision: true}, {idle: {sequences: [8]}});
  extendSprite(Backbone.Tile, "bc-brick5", {collision: true}, {idle: {sequences: [9]}});
  extendSprite(Backbone.Tile, "bc-brick6", {collision: true}, {idle: {sequences: [10]}});

  extendSprite(Backbone.Tile, "bc-brick7", {collision: true}, {idle: {sequences: [16]}});
  extendSprite(Backbone.Tile, "bc-brick8", {collision: true}, {idle: {sequences: [17]}});
  extendSprite(Backbone.Tile, "bc-brick9", {collision: true}, {idle: {sequences: [18]}});
  
  extendSprite(Backbone.Tile, "bc-block1", {collision: true}, {idle: {sequences: [98]}});
  extendSprite(Backbone.Tile, "bc-block2", {collision: true}, {idle: {sequences: [99]}});

  extendSprite(Backbone.Tile, "bc-pillar1", {collision: false}, {idle: {sequences: [72]}});
  extendSprite(Backbone.Tile, "bc-pillar2", {collision: false}, {idle: {sequences: [80]}});
  extendSprite(Backbone.Tile, "bc-pillar3", {collision: false}, {idle: {sequences: [88]}});

  extendSprite(Backbone.Tile, "bc-pillar-solid1", {collision: true}, {idle: {sequences: [72]}});
  extendSprite(Backbone.Tile, "bc-pillar-solid2", {collision: true}, {idle: {sequences: [80]}});
  extendSprite(Backbone.Tile, "bc-pillar-solid3", {collision: true}, {idle: {sequences: [88]}});

  extendSprite(Backbone.Tile, "bc-spikes", {collision: true, paddingTop: 25}, {idle: {sequences: [82]}});

  extendSprite(Backbone.Tile, "bc-table1", {collision: true, zIndex: 1}, {idle: {sequences: [46]}});
  extendSprite(Backbone.Tile, "bc-table2", {collision: true, zIndex: 1}, {idle: {sequences: [47]}});

  extendSprite(Backbone.Tile, "bc-vase1", {collision: true, zIndex: 1, paddingTop: 14}, {idle: {sequences: [71]}});

  extendSprite(Backbone.Tile, "f-grass1", {collision: true}, {idle: {sequences: [4]}});
  extendSprite(Backbone.Tile, "f-grass2", {collision: true}, {idle: {sequences: [5]}});
  extendSprite(Backbone.Tile, "f-grass3", {collision: true}, {idle: {sequences: [6]}});

  extendSprite(Backbone.Tile, "f-ground1", {collision: true}, {idle: {sequences: [12]}});
  extendSprite(Backbone.Tile, "f-ground2", {collision: true}, {idle: {sequences: [13]}});
  extendSprite(Backbone.Tile, "f-ground3", {collision: true}, {idle: {sequences: [14]}});

  extendSprite(Backbone.Tile, "f-ground4", {collision: true}, {idle: {sequences: [28]}});
  extendSprite(Backbone.Tile, "f-ground5", {collision: true}, {idle: {sequences: [29]}});
  extendSprite(Backbone.Tile, "f-ground6", {collision: true}, {idle: {sequences: [30]}});

  extendSprite(Backbone.Tile, "f-grass4", {collision: true, paddingTop: 18, paddingLeft: 8}, {idle: {sequences: [24]}});
  extendSprite(Backbone.Tile, "f-grass5", {collision: true, paddingTop: 18}, {idle: {sequences: [25]}});
  extendSprite(Backbone.Tile, "f-grass6", {collision: true, paddingTop: 18, paddingRight: 8}, {idle: {sequences: [26]}});

  extendSprite(Backbone.Tile, "f-ground7", {collision: true}, {idle: {sequences: [20]}});
  extendSprite(Backbone.Tile, "f-ground8", {collision: true}, {idle: {sequences: [21]}});
  extendSprite(Backbone.Tile, "f-water", {collision: false}, {idle: {sequences: [114]}});
  extendSprite(Backbone.Tile, "f-water2", {collision: false}, {idle: {sequences: [122]}});

  extendSprite(Backbone.Tile, "f-stump1", {collision: true, paddingTop: 20, paddingLeft: 32}, {idle: {sequences: [94]}});
  extendSprite(Backbone.Tile, "f-stump2", {collision: true, paddingTop: 20, paddingRight: 32}, {idle: {sequences: [95]}});

  extendSprite(Backbone.Tile, "f-bush1", {collision: false}, {idle: {sequences: [110]}});
  extendSprite(Backbone.Tile, "f-bush2", {collision: false}, {idle: {sequences: [111]}});

  extendSprite(Backbone.Tile, "f-sign1", {collision: false, zIndex: 1}, {idle: {sequences: [104]}});
  extendSprite(Backbone.Tile, "f-sign2", {collision: false, zIndex: 1}, {idle: {sequences: [84]}});

  extendSprite(Backbone.Tile, "f-fence1", {collision: false, zIndex: 1}, {idle: {sequences: [52]}});
  extendSprite(Backbone.Tile, "f-fence2", {collision: false, zIndex: 1}, {idle: {sequences: [53]}});

  extendSprite(Backbone.Tile, "g-grass1", {collision: true}, {idle: {sequences: [40]}});
  extendSprite(Backbone.Tile, "g-grass2", {collision: true}, {idle: {sequences: [41]}});
  extendSprite(Backbone.Tile, "g-grass3", {collision: true}, {idle: {sequences: [42]}});

  extendSprite(Backbone.Tile, "g-ground1", {collision: true}, {idle: {sequences: [48]}});
  extendSprite(Backbone.Tile, "g-ground2", {collision: true}, {idle: {sequences: [49]}});
  extendSprite(Backbone.Tile, "g-ground3", {collision: true}, {idle: {sequences: [50]}});

  extendSprite(Backbone.Tile, "g-ground4", {collision: true}, {idle: {sequences: [56]}});
  extendSprite(Backbone.Tile, "g-ground5", {collision: true}, {idle: {sequences: [57]}});
  extendSprite(Backbone.Tile, "g-ground6", {collision: true}, {idle: {sequences: [58]}});

  extendSprite(Backbone.Tile, "g-grass4", {collision: true}, {idle: {sequences: [60]}});
  extendSprite(Backbone.Tile, "g-grass5", {collision: true}, {idle: {sequences: [61]}});
  extendSprite(Backbone.Tile, "g-grass6", {collision: true}, {idle: {sequences: [62]}});

  extendSprite(Backbone.Tile, "g-grass7", {collision: true}, {idle: {sequences: [73]}});
  extendSprite(Backbone.Tile, "g-ground7", {collision: true}, {idle: {sequences: [81]}});
  extendSprite(Backbone.Tile, "g-ground8", {collision: true}, {idle: {sequences: [89]}});
  extendSprite(Backbone.Tile, "g-grass8", {collision: true}, {idle: {sequences: [74]}});

  extendSprite(Backbone.Tile, "g-fence", {collision: false, zIndex: 1}, {idle: {sequences: [105]}});
  extendSprite(Backbone.Tile, "g-chest", {collision: true, zIndex: 1, paddingTop: 13}, {idle: {sequences: [108]}});
  extendSprite(Backbone.Tile, "g-pot", {collision: true, zIndex: 1, paddingTop: 18, paddingLeft: 10, paddingRight: 10}, {idle: {sequences: [75]}});

  extendSprite(Backbone.Tile, "g-tombstone1", {collision: true, zIndex: 1, paddingTop: 4}, {idle: {sequences: [77]}});
  extendSprite(Backbone.Tile, "g-tombstone2", {collision: true, zIndex: 1}, {idle: {sequences: [70]}});
  extendSprite(Backbone.Tile, "g-tombstone3", {collision: true, zIndex: 1, paddingTop: 24}, {idle: {sequences: [78]}});

  
  Backbone.BcSpikes.prototype.initialize = function(attributes, options) {
    Backbone.Tile.prototype.initialize.apply(this, arguments);
    this.on("hit", this.hit, this);
  };
  Backbone.BcSpikes.prototype.hit = function(sprite, dir, dir2) {
    if (this._handlingSpriteHit) return this;
    this._handlingSpriteHit = sprite;

    if (dir == "top")
      sprite.trigger("hit", this, "bottom");

    this._handlingSpriteHit = undefined;
    return this;
  };

}).call(this);
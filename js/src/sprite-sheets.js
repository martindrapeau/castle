(function() {

  var tileWidth = 64,
      tileHeight = 64;
  
	Backbone.spriteSheetDefinitions = [{
    id: "hero1",
    img: "#hero1",
    x: 0,
    y: 0,
    tileWidth: 128,
    tileHeight: 128,
    tileColumns: 14,
    tileRows: 9
  }, {
    id: "bat",
    img: "#bat",
    x: 0,
    y: 0,
    tileWidth: 128,
    tileHeight: 128,
    tileColumns: 4,
    tileRows: 2
  }, {
    id: "tiles",
    img: "#tiles",
    x: 0,
    y: 0,
    tileWidth: tileWidth,
    tileHeight: tileHeight,
    tilePadding: 2,
    tileColumns: 9,
    tileRows: 9
  }, {
    id: "houses",
    img: "#houses",
    x: 0,
    y: 0,
    tileWidth: 432,
    tileHeight: 384,
    tilePadding: 2,
    tileColumns: 2,
    tileRows: 3
  }, {
    id: "barge",
    img: "#houses",
    x: 0,
    y: 1600,
    tileWidth: 315,
    tileHeight: 90,
    tilePadding: 2,
    tileColumns: 1,
    tileRows: 1
  }, {
    id: "wall",
    img: "#houses",
    x: 0,
    y: 1152,
    tileWidth: 320,
    tileHeight: 192,
    tilePadding: 2,
    tileColumns: 2,
    tileRows: 1
  }, {
    id: "cave",
    img: "#houses",
    x: 0,
    y: 1344,
    tileWidth: 384,
    tileHeight: 256,
    tilePadding: 2,
    tileColumns: 2,
    tileRows: 1
  }, {
    id: "artifacts",
    img: "#artifacts",
    x: 0,
    y: 0,
    tileWidth: tileWidth,
    tileHeight: tileHeight,
    tileColumns: 5,
    tileRows: 6
  }, {
    id: "farts",
    img: "#artifacts",
    x: 0,
    y: 128,
    tileWidth: 21,
    tileHeight: 21,
    tileColumns: 3,
    tileRows: 2
  }, {
    id: "health-indicator",
    img: "#artifacts",
    x: 0,
    y: 320,
    tileWidth: 200,
    tileHeight: 24,
    tileColumns: 1,
    tileRows: 2
  }, {
    id: "callout",
    img: "#artifacts",
    x: 0,
    y: 368,
    tileWidth: 126,
    tileHeight: 116,
    tileColumns: 1,
    tileRows: 1
  }, {
    id: "fireball",
    img: "#artifacts",
    x: 0,
    y: 486,
    tileWidth: 70,
    tileHeight: 41,
    tileColumns: 4,
    tileRows: 1
  }, {
    id: "doors",
    img: "#doors",
    x: 0,
    y: 0,
    tileWidth: 100,
    tileHeight: 144,
    tileColumns: 6,
    tileRows: 3
  }, {
    id: "spider",
    img: "#spider",
    x: 0,
    y: 0,
    tileWidth: 130,
    tileHeight: 80,
    tileColumns: 8,
    tileRows: 5
  }, {
    id: "fly",
    img: "#fly",
    x: 0,
    y: 0,
    tileWidth: 104,
    tileHeight: 110,
    tileColumns: 8,
    tileRows: 3
  }];
}).call(this);
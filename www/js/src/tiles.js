(function() {

  /**
   *
   * Backbone Game Engine - An elementary HTML5 canvas game engine using Backbone.
   *
   * Copyright (c) 2014 Martin Drapeau
   * https://github.com/martindrapeau/backbone-game-engine
   *
   */
  
  Backbone.Tile = Backbone.Sprite.extend({
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


  function extendSprite(cls, name, attributes, animations) {
    var newCls = _.classify(name);
    Backbone[newCls] = Backbone[cls].extend({
      defaults: _.extend(
        _.deepClone(Backbone[cls].prototype.defaults),
        {name: name},
        attributes || {}
      ),
      animations: _.extend(
        _.deepClone(Backbone[cls].prototype.animations),
        animations || {}
      )
    });
    return Backbone[newCls];
  }

  extendSprite("Tile", "brick-top1", {collision: true}, {idle: {sequences: [0]}});
  extendSprite("Tile", "brick-top2", {collision: true}, {idle: {sequences: [1]}});
  extendSprite("Tile", "brick-top3", {collision: true}, {idle: {sequences: [2]}});

  extendSprite("Tile", "brick1", {collision: true}, {idle: {sequences: [4]}});
  extendSprite("Tile", "brick2", {collision: true}, {idle: {sequences: [5]}});
  extendSprite("Tile", "brick3", {collision: true}, {idle: {sequences: [6]}});

  extendSprite("Tile", "brick-bottom1", {collision: true}, {idle: {sequences: [8]}});
  extendSprite("Tile", "brick-bottom2", {collision: true}, {idle: {sequences: [9]}});
  extendSprite("Tile", "brick-bottom3", {collision: true}, {idle: {sequences: [10]}});
  
  extendSprite("Tile", "block1", {collision: true}, {idle: {sequences: [12]}});
  extendSprite("Tile", "block2", {collision: true}, {idle: {sequences: [13]}});

  extendSprite("Tile", "spikes", {collision: true, paddingTop: 25}, {idle: {sequences: [16]}});

  extendSprite("Tile", "pillar1", {collision: true}, {idle: {sequences: [20]}});
  extendSprite("Tile", "pillar2", {collision: true}, {idle: {sequences: [21]}});
  extendSprite("Tile", "pillar3", {collision: true}, {idle: {sequences: [22]}});

  extendSprite("Tile", "grass1", {collision: true}, {idle: {sequences: [24]}});
  extendSprite("Tile", "grass2", {collision: true}, {idle: {sequences: [25]}});
  extendSprite("Tile", "grass3", {collision: true}, {idle: {sequences: [26]}});

  extendSprite("Tile", "ground1", {collision: true}, {idle: {sequences: [28]}});
  extendSprite("Tile", "ground2", {collision: true}, {idle: {sequences: [29]}});
  extendSprite("Tile", "ground3", {collision: true}, {idle: {sequences: [30]}});

}).call(this);
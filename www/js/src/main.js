$(window).on("load", function() {

  /**
   *
   * Backbone Game Engine - An elementary HTML5 canvas game engine using Backbone.
   *
   * Copyright (c) 2014 Martin Drapeau
   * https://github.com/martindrapeau/backbone-game-engine
   *
   */

  
  var canvas = document.getElementById("foreground"),
      context = canvas.getContext("2d");

  var tileWidth = 64,
      tileHeight = 64,
      spriteNames = [
        ["hero1"]
      ];
  _.each(Backbone.TilePages, function(names) {
    spriteNames.push(names);
  });

  Backbone.Controller = Backbone.Model.extend({
    initialize: function(attributes, options) {
      options || (options = {});
      var controller = this;

      _.bindAll(this, "onChangeState", "toggleState");

      // Create our sprite sheets and attach them to existing sprite classes
      this.spriteSheets = new Backbone.SpriteSheetCollection([{
        id: "hero1",
        img: "#hero1",
        x: 0,
        y: 0,
        tileWidth: 128,
        tileHeight: 128,
        tileColumns: 14,
        tileRows: 9
      }, {
        id: "enemies",
        img: "#enemies",
        x: 0,
        y: 0,
        tileWidth: 128,
        tileHeight: 128,
        tileColumns: 12,
        tileRows: 10
      }, {
        id: "tiles",
        img: "#tiles",
        x: 0,
        y: 0,
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        tileColumns: 4,
        tileRows: 26
      }, {
        id: "houses",
        img: "#houses",
        x: 0,
        y: 0,
        tileWidth: 432,
        tileHeight: 384,
        tileColumns: 1,
        tileRows: 3
      }]).attachToSpriteClasses();

      // Create the debug panel
      this.debugPanel = new Backbone.DebugPanel();

      // User input (turn off touchpad to start)
      this.input = new Backbone.Input({
        drawTouchpad: true
      });

      // Camera
      this.camera = new Backbone.Camera({
        bottom: 228
      });

      // Our world
      // Reserve bottom of canvas for input and editor
      this.world = new Backbone.World(
        _.extend({viewportBottom: 156}, {
          tileWidth: tileWidth,
          tileHeight: tileHeight,
          width: 15,
          height: 9
        }, window._world), {
        input: this.input,
        camera: this.camera,
        debugPanel: this.debugPanel
      });

      // Message
      this.message = new Backbone.Message({
        x: 480, y: 20
      });

      // Buttons
      this.toggleButton = new Backbone.Button({
        x: 4, y: 4, width: 52, height: 52, borderRadius: 5,
        img: "#icons", imgX: 0, imgY: 0, imgWidth: 32, imgHeight: 32, imgMargin: 10
      });
      this.toggleButton.on("tap", this.toggleState, this);

      // The game engine
      this.engine = new Backbone.Engine(_.compact([
        this.world,
        this.display,
        this.camera,
        this.toggleButton,
        this.message,
        this.debugPanel
      ]), {
        canvas: canvas,
        debugPanel: this.debugPanel
      });

      // The sprite picker and editor
      this.editor = new Backbone.WorldEditor({
        x: canvas.width - ((tileWidth+2)*11 + 128 + 4),
        y: canvas.height - ((tileHeight+2)*2 + 4),
        width: (tileWidth+2)*11 + 128 + 4,
        height: (tileHeight+2)*2 + 4,
        spriteNames: spriteNames,
        tileWidth: tileWidth,
        tileHeight: tileHeight
      }, {
        world: this.world
      });

      // Controls
      $(document).on("keypress.Controller", function(e) {
        if (e.keyCode == 66 || e.keyCode == 98)
          controller.engine.toggle(); // b to break the animation
        else if (e.keyCode == 80 || e.keyCode == 112)
          controller.toggleState(); // p to pause and pause
      });

      this.listenTo(this.world, "change:state", this.onChangeState);
      this.onChangeState();
    },
    toggleState: function(e) {
      var state = this.world.get("state");
      this.world.set("state", state == "pause" ? "play" : "pause");
      if (!this.engine.isRunning()) this.engine.start();
    },
    onChangeState: function() {
      var state = this.world.get("state");
      if (state == "pause") {
        // Edit
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.engine.remove(this.input);
        this.engine.add(this.editor);
        this.toggleButton.set({imgX: 32});
      } else {
        // Play
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.engine.remove(this.editor);
        this.engine.add(this.input);
        this.toggleButton.set({imgX: 0});
      }
    }
  });
  
  var controller = new Backbone.Controller();

  // Expose things as globals - easier to debug
  _.extend(window, {
    canvas: canvas,
    context: context,
    controller: controller,
  });

  // Ensure the canvas is always visible and centered
  adjustViewport(canvas, canvas.width, canvas.height);

});
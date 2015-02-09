$(window).on("load", function() {
  
  var canvas = document.getElementById("foreground"),
      context = canvas.getContext("2d"),
      tileWidth = 64,
      tileHeight = 64,
      spriteNames = _.map(Backbone.pagedSprites, function(names) {return names;});

  Backbone.Controller = Backbone.Model.extend({
    initialize: function(attributes, options) {
      options || (options = {});
      var controller = this;

      this.state = {
        saved: undefined
      };

      // Create our sprite sheets and attach them to existing sprite classes
      this.spriteSheets = new Backbone.SpriteSheetCollection(Backbone.spriteSheetDefinitions).attachToSpriteClasses();

      // Create the debug panel
      this.debugPanel = new Backbone.DebugPanel({}, {color: "#fff"});

      // User input (turn off touchpad to start)
      this.input = new Backbone.Input({
        drawTouchpad: true
      });

      // Camera
      this.camera = new Backbone.Camera({
        bottom: 400
      });

      // Our world
      // Reserve bottom of canvas for input and editor
      this.world = new Backbone.World({
          state: "pause"
      }, {
        input: this.input,
        camera: this.camera
      });

      this.display = new Backbone.Display({
        x: 100,
        y: 0
      }, {
        world: this.world
      });

      // Message
      this.message = new Backbone.Message({
        x: 480, y: 20
      });

      // In-game pause button
      this.pauseButton = new Backbone.Button({
        x: 4, y: 4, width: 52, height: 52, borderRadius: 5,
        img: "#icons", imgX: 0, imgY: 0, imgWidth: 32, imgHeight: 32, imgMargin: 10
      });
      this.pauseButton.on("tap", this.showGui, this);

      this.gui = new Backbone.Gui({
        img: "#title-screen"
      }, {
        state: this.state
      });
      this.gui.on("new", function() {
        this.play(true);
      }, this);
      this.gui.on("resume", this.play, this);

      // The game engine
      this.engine = new Backbone.Engine([
        this.debugPanel
      ], {
        canvas: canvas,
        debugPanel: this.debugPanel
      });

      // Controls
      $(document).on("keypress.Controller", function(e) {
        if (e.keyCode == 66 || e.keyCode == 98)
          controller.engine.toggle(); // b to break the animation
        else if (e.keyCode == 80 || e.keyCode == 112)
          controller.toggleState(); // p to pause and pause
      });

      this.showGui();
    },
    play: function(newGame) {
      if (!this.engine.isRunning()) this.engine.start();
      this.engine.remove([
        this.gui,
        this.debugPanel
      ]);

      this.debugPanel.clear();

      if (newGame || !this.state.saved) {
        this.world.set(Backbone.levels[0]);
        this.world.spawnSprites();
        this.state.saved = true;
      }

      this.engine.add([
        this.world,
        this.display,
        this.camera,
        this.pauseButton,
        this.message,
        this.input,
        this.debugPanel
      ]);
      this.world.set("state", "play");

      return this;
    },
    showGui: function() {
      if (!this.engine.isRunning()) this.engine.start();
      this.world.set("state", "pause");

      this.engine.remove([
        this.world,
        this.display,
        this.camera,
        this.pauseButton,
        this.message,
        this.input,
        this.debugPanel
      ]);

      this.debugPanel.clear();

      this.engine.add([
        this.gui,
        this.debugPanel
      ]);

      return this;
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
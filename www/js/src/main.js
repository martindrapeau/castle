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
        tileColumns: 2,
        tileRows: 3
      }, {
        id: "wall",
        img: "#houses",
        x: 0,
        y: 1152,
        tileWidth: 320,
        tileHeight: 192,
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
        tileRows: 5
      }, {
        id: "hit",
        img: "#artifacts",
        x: 0,
        y: 432,
        tileWidth: 37,
        tileHeight: 54,
        tileColumns: 2,
        tileRows: 1
      }, {
        id: "health-indicator",
        img: "#artifacts",
        x: 0,
        y: 256,
        tileWidth: 200,
        tileHeight: 30,
        tileColumns: 1,
        tileRows: 2
      }, {
        id: "callout",
        img: "#artifacts",
        x: 0,
        y: 316,
        tileWidth: 126,
        tileHeight: 116,
        tileColumns: 1,
        tileRows: 1
      }, {
        id: "doors",
        img: "#doors",
        x: 0,
        y: 0,
        tileWidth: 100,
        tileHeight: 144,
        tileColumns: 6,
        tileRows: 2
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
      }]).attachToSpriteClasses();

      // Create the debug panel
      this.debugPanel = new Backbone.DebugPanel({}, {color: "#fff"});

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
          height: 9,
          backgroundImage: "#background"
        }, window._world), {
        input: this.input,
        camera: this.camera,
        //debugPanel: this.debugPanel
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
        world: this.world,
        debugPanel: this.debugPanel
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
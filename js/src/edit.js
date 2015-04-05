$(window).on("load", function() {
  
  var canvas = document.getElementById("foreground"),
      context = canvas.getContext("2d"),
      tileWidth = 64,
      tileHeight = 64,
      spriteNames = _.map(Backbone.pagedSprites, function(names) {return names;}),
      editorTileSize = 48,
      editorWidth = canvas.width - canvas.width % (editorTileSize + 2),
      editorHeight = (editorTileSize + 2) * 3;

  Backbone.Controller = Backbone.Model.extend({
    initialize: function(attributes, options) {
      options || (options = {});
      var controller = this;

      _.bindAll(this, "onChangeState", "toggleState");

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
        top: 200,
        bottom: 300
      });

      // Our world
      // Reserve bottom of canvas for input and editor
      this.world = new Backbone.World(
        _.extend({
          tileWidth: tileWidth,
          tileHeight: tileHeight,
          width: 15,
          height: 9,
          backgroundImage: "#background"
        }, window._levels[0], {
          viewportBottom: editorHeight
        }), {
        input: this.input,
        camera: this.camera,
        //debugPanel: this.debugPanel
      });

      this.tutorial = new Backbone.Tutorial(null, {
        world: this.world,
        input: this.input
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
      this.engine = new Backbone.Engine({}, {
        canvas: canvas,
        debugPanel: this.debugPanel
      });
      this.engine.add(_.compact([
        this.world,
        this.world.get("level") == 1 ? this.tutorial : null,
        this.display,
        this.camera,
        this.toggleButton,
        this.message,
        this.debugPanel
      ]));

      // The sprite picker and editor
      this.editor = new Backbone.WorldEditor({
        x: 0,
        y: canvas.height - editorHeight,
        width: editorWidth,
        height: editorHeight,
        spriteNames: spriteNames,
        tileWidth: editorTileSize,
        tileHeight: editorTileSize
      }, {
        world: this.world,
        debugPanel: this.debugPanel
      });
      this.editor.sprites.each(function(sprite) {
        if (sprite.get("type") == "breakable-tile" &&
            sprite.get("showContent") === false &&
            sprite.get("artifact"))
          sprite.set("showContent", true);
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
        this.toggleBreakableTileContent(true);
      } else {
        // Play
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.engine.remove(this.editor);
        this.engine.add(this.input);
        this.toggleButton.set({imgX: 0});
        this.toggleBreakableTileContent(false);
      }
    },
    toggleBreakableTileContent: function(showContent) {
      this.world.sprites.each(function(sprite) {
        if (sprite.get("type") == "breakable-tile" && sprite.get("artifact"))
          if (showContent)
            sprite.showContent();
          else
            sprite.hideContent();
          //sprite.set("showContent", showContent);
      });
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
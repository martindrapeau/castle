$(window).on("load", function() {

  var ENV = navigator.isCocoonJS ? "prod" : "dev";
  
  var canvas = document.getElementById("foreground"),
      context = canvas.getContext("2d"),
      tileWidth = 64,
      tileHeight = 64,
      spriteNames = _.map(Backbone.pagedSprites, function(names) {return names;});

  Backbone.Controller = Backbone.Model.extend({
    initialize: function(attributes, options) {
      options || (options = {});
      var controller = this;

      _.bindAll(this, "showGui");

      this.state = {
        saved: undefined
      };

      // Create our sprite sheets and attach them to existing sprite classes
      this.spriteSheets = new Backbone.SpriteSheetCollection(Backbone.spriteSheetDefinitions).attachToSpriteClasses();

      // Create the debug panel
      this.debugPanel = ENV == "dev" ? new Backbone.DebugPanel({}, {color: "#fff"}) : null;

      // User input (turn off touchpad to start)
      this.input = new Backbone.Input({
        id: "input",
        drawTouchpad: true
      });

      // Camera
      this.camera = new Backbone.Camera({
        id: "camera",
        bottom: 400
      });

      // Our world
      // Reserve bottom of canvas for input and editor
      this.world = new Backbone.World({
        id: "world",
        state: "pause"
      }, {
        input: this.input,
        camera: this.camera
      });

      this.display = new Backbone.Display({
        id: "display",
        x: 100,
        y: 0
      }, {
        world: this.world
      });

      // In-game

      this.leveStartScene = new Backbone.LevelStartScene({
        id: "leveStartScene"
      }, {
        state: this.state,
        world: this.world
      });

      this.levelInOutScene = new Backbone.LevelInOutScene({
        id: "levelInOutScene"
      }, {
        state: this.state,
        world: this.world
      });

      this.pauseButton = new Backbone.Button({
        id: "pauseButton",
        x: 16, y: 4, width: 64, height: 64, backgroundColor: "transparent",
        img: "#artifacts", imgX: 0, imgY: 128, imgWidth: 64, imgHeight: 64, imgMargin: 0
      });
      this.pausePanel = new Backbone.PausePanel({}, {
        id: "pausePanel",
        pauseButton: this.pauseButton,
        world: this.world,
        input: this.input,
        showGui: this.showGui,
        levelInOutScene: this.levelInOutScene
      });


      this.gui = new Backbone.Gui({
        id: "gui",
      }, {
        state: this.state,
        world: this.world
      });
      this.gui.on("new", function() {
        this.play(true);
      }, this);
      this.gui.on("resume", this.play, this);


      // The game engine
      this.engine = new Backbone.Engine({}, {
        canvas: canvas,
        debugPanel: this.debugPanel
      });
      if (this.debugPanel) this.engine.add(this.debugPanel);

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
      this.engine.stop();
      this.engine.remove(this.gui);

      if (this.debugPanel) {
        this.engine.remove(this.debugPanel);
        this.debugPanel.clear();
      }

      var startScene = this.levelInOutScene;
      if (newGame || !this.state.saved) {
        console.log("newGame");
        this.world.set(Backbone.levels[0]);
        this.world.spawnSprites();
        var hero = this.world.sprites.findWhere({hero: true});
        this.state.saved = {
          health: hero.get("health"),
          coins: hero.get("coins"),
          level: this.world.get("level"),
          time: this.world.get("time")
        };
        startScene = this.leveStartScene;
      }

      this.engine.add([
        this.world,
        this.display,
        this.camera,
        this.pauseButton,
        this.input,
        this.pausePanel,
        startScene
      ]);
      if (this.debugPanel) this.engine.add(this.debugPanel);
      this.engine.set("clearOnDraw", false);
      this.engine.start();

      startScene.enter();

      return this;
    },
    showGui: function() {
      this.engine.stop();
      this.world.set("state", "pause");

      this.engine.remove([
        this.world,
        this.display,
        this.camera,
        this.pauseButton,
        this.input,
        this.pausePanel
      ]);
      if (this.debugPanel) {
        this.engine.remove(this.debugPanel);
        this.debugPanel.clear();
      }

      this.engine.add(this.gui);
      if (this.debugPanel) this.engine.add(this.debugPanel);
      this.engine.set("clearOnDraw", true);
      this.engine.start();

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

  if (navigator.isCocoonJS) {
    //Cocoon.Utils.setNPOTEnabled(true);
  } else {
    // Ensure the canvas is always visible and centered
    adjustViewport(canvas, canvas.width, canvas.height);
  }

});
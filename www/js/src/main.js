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

      // Game state
      this.saved = {};

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

      // In-game GUIs and scenes

      this.leveStartScene = new Backbone.LevelStartScene({
        id: "leveStartScene"
      }, {
        saved: this.saved,
        world: this.world
      });

      this.levelInOutScene = new Backbone.LevelInOutScene({
        id: "levelInOutScene"
      }, {
        saved: this.saved,
        world: this.world
      });

      this.pauseButton = new Backbone.Button({
        id: "pauseButton",
        x: 16, y: 4, width: 64, height: 64, backgroundColor: "transparent",
        img: "#artifacts", imgX: 0, imgY: 128, imgWidth: 64, imgHeight: 64, imgMargin: 0
      });

      this.pausePanel = new Backbone.PausePanel({
        id: "pausePanel"
      }, {
        pauseButton: this.pauseButton,
        world: this.world,
        input: this.input,
        showTitleScreen: this.showTitleScreen,
        levelInOutScene: this.levelInOutScene
      });

      this.levelEndPanel = new Backbone.LevelEndPanel({
        id: "levelEndPanel"
      }, {
        pauseButton: this.pauseButton,
        world: this.world,
        input: this.input,
        showTitleScreen: this.showTitleScreen,
        nextLevel: this.nextLevel,
        levelInOutScene: this.levelInOutScene
      });

      // Our title screen
      this.titleScreenGui = new Backbone.TitleScreenGui({
        id: "titleScreenGui",
      }, {
        saved: this.saved,
        world: this.world
      });


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

      // Events
      this.listenTo(this.engine, "showTitleScreen", this.showTitleScreen);
      this.listenTo(this.engine, "newGame", _.partial(this.play, true));
      this.listenTo(this.engine, "continueGame", this.play);
      this.listenTo(this.engine, "nextLevel", this.nextLevel);
      this.listenTo(this.engine, "levelComplete", this.levelComplete);

      // Start everything
      this.showTitleScreen();
    },
    play: function(newGame) {
      this.engine.stop();
      this.engine.remove(this.titleScreenGui);

      if (this.debugPanel) {
        this.engine.remove(this.debugPanel);
        this.debugPanel.clear();
      }

      if (newGame || !this.saved) {
        this.world.set(Backbone.levels[0]);
        this.world.spawnSprites();
      } else {
        this.world.set(Backbone.levels[this.saved.levelIndex]);
        this.world.set({
          pause: true,
          time: this.saved.time
        });
        this.world.spawnSprites();
        var hero = this.world.sprites.findWhere({hero: true});
        hero.set({
          health: this.saved.health,
          coins: this.saved.coins
        });
      }

      this.engine.add([
        this.world,
        this.display,
        this.camera,
        this.pauseButton,
        this.input,
        this.pausePanel,
        this.levelEndPanel,
        this.leveStartScene
      ]);
      if (this.debugPanel) this.engine.add(this.debugPanel);
      this.engine.set("clearOnDraw", false);
      this.engine.start();

      this.leveStartScene.enter();

      return this;
    },
    showTitleScreen: function() {
      this.engine.stop();
      this.world.set("state", "pause");

      this.engine.remove([
        this.world,
        this.display,
        this.camera,
        this.pauseButton,
        this.input,
        this.pausePanel,
        this.levelEndPanel
      ]);
      if (this.debugPanel) {
        this.engine.remove(this.debugPanel);
        this.debugPanel.clear();
      }

      this.engine.add(this.titleScreenGui);
      if (this.debugPanel) this.engine.add(this.debugPanel);
      this.engine.set("clearOnDraw", true);
      this.engine.start();

      return this;
    },
    levelComplete: function() {
      this.saveGame();

      var levelIndex = this.world.get("level");
      if (levelIndex >= Backbone.levels.length) levelIndex = 0;

      this.saved.levelIndex = levelIndex;
      this.saved.level = Backbone.levels[levelIndex].level;
      this.saved.levelName = Backbone.levels[levelIndex].name;

      return this;
    },
    saveGame: function() {
      var hero = this.world.sprites.findWhere({hero: true});

      _.extend(this.saved, {
        date: _.now(),
        health: hero.get("health"),
        coins: hero.get("coins"),
        level: this.world.get("level"),
        levelName: this.world.get("name"),
        levelIndex: this.world.get("level") - 1,
        time: this.world.get("time")
      });

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
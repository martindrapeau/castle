$(window).on("load", function() {

  var NATIVE = navigator.isCocoonJS,
      ENV = NATIVE /*|| window.location.hostname == "ludo.mariocraft.club"*/ ? "prod" : "dev",
      MOBILE = "onorientationchange" in window ||
        window.navigator.msMaxTouchPoints ||
        window.navigator.isCocoonJS;
  
  var canvas = document.getElementById("foreground"),
      context = canvas.getContext("2d"),
      tileWidth = 64,
      tileHeight = 64,
      spriteNames = _.map(Backbone.pagedSprites, function(names) {return names;});

  if (MOBILE) {
    canvas.height = Math.round(Math.min(canvas.height, canvas.width * Math.min(window.innerHeight, window.innerWidth) / Math.max(window.innerHeight, window.innerWidth) ));
  } else {
    canvas.height = Math.round(Math.min(canvas.height, window.innerHeight));
    adjustViewport(canvas, canvas.width, canvas.height);
  }
  console.log("canvas.width=" + canvas.width + " canvas.height=" + canvas.height);

  if (!NATIVE && MOBILE) {
    _.loadStylesheet("add-to-homescreen/style/addtohomescreen.css");
    _.loadScript("add-to-homescreen/src/addtohomescreen.js", function() {
      var addtohome = addToHomescreen({
        appID: window.location.hostname
      });
    });
  }

  _.extend(Backbone, {
    ENV: ENV,
    NATIVE: NATIVE,
    MOBILE: MOBILE,
    HEIGHT: canvas.height,
    WIDTH: canvas.width
  });

  Backbone.Level = Backbone.Model.extend({
    idAttribute: "level",
    comparator: "level"
  });
  Backbone.LevelCollection = Backbone.Collection.extend({
    model: Backbone.Level
  });
  Backbone.SavedState = Backbone.Model.extend({
    idAttribute: "level",
    comparator: "level"
  });
  Backbone.SavedStateCollection = Backbone.Collection.extend({
    model: Backbone.Level,
    initialize: function(models, options) {
      this.levels = options.levels
    },
    getNextLevel: function() {
      var state = this.last();
      if (!state) return this.levels.first();
      var lastPlayed = this.levels.get(state.id),
          nextLevel = this.levels.at(this.levels.indexOf(lastPlayed) + 1);
      return nextLevel || this.levels.first();
    },
    getPreviousState: function(level) {
      var prev = this.levels.at(this.levels.indexOf(level) - 1);
      return prev ? this.get(prev.id) : null;
    }
  });


  Backbone.Controller = Backbone.Model.extend({
    initialize: function(attributes, options) {
      options || (options = {});
      var controller = this;

      this.levels = new Backbone.LevelCollection(_levels);
      this.saved = new Backbone.SavedStateCollection(null, {levels: this.levels});

      // Create our sprite sheets and attach them to existing sprite classes
      this.spriteSheets = new Backbone.SpriteSheetCollection(Backbone.spriteSheetDefinitions).attachToSpriteClasses();

      // Create the debug panel
      this.debugPanel = ENV == "dev" ? new Backbone.DebugPanel({}, {color: "#fff"}) : null;

      // User input (turn off touchpad to start)
      this.input = new Backbone.Input({
        id: "input"
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
        world: this.world,
        input: this.input
      });

      this.levelInOutScene = new Backbone.LevelInOutScene({
        id: "levelInOutScene"
      }, {
        saved: this.saved,
        world: this.world
      });

      this.pauseButton = new Backbone.Button({
        id: "pauseButton",
        x: 16, y: 4, width: 70, height: 70, backgroundColor: "transparent",
        img: "#gui", imgX: 210, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
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
      this.leveStartScene.pauseButton = this.pauseButton;

      this.diedPanel = new Backbone.DiedPanel({
        id: "diedPanel"
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

      // Our screens
      this.titleScreenGui = new Backbone.TitleScreenGui({
        id: "titleScreenGui",
      }, {
        saved: this.saved,
        world: this.world,
        levels: this.levels
      });

      this.levelScreenGui = new Backbone.LevelScreenGui({
        id: "levelScreenGui",
      }, {
        saved: this.saved,
        world: this.world,
        levels: this.levels
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
      this.listenTo(this.engine, "showLevelScreen", this.showLevelScreen);
      this.listenTo(this.engine, "play", this.play);
      this.listenTo(this.engine, "nextLevel", this.nextLevel);
      this.listenTo(this.engine, "saveLevelComplete", this.saveLevelComplete);

      // Start everything
      this.showTitleScreen();
    },
    play: function(levelId) {
      this.engine.stop();
      this.engine.reset();
      if (this.debugPanel) this.debugPanel.clear();

      var level = levelId ? this.levels.get(levelId) : this.saved.getNextLevel(),
          state = this.saved.getPreviousState(level);

      this.world.set(level.toJSON());
      this.world.set({
        pause: true,
        time: state ? state.get("time") : 0
      });
      this.world.spawnSprites();
      if (state) {
        var hero = this.world.sprites.findWhere({hero: true});
        hero.set({
          health: state.get("health"),
          coins: state.get("coins")
        });
      }

      this.engine.add(_.compact([
        this.world,
        this.display,
        this.camera,
        this.pauseButton,
        this.input,
        this.pausePanel,
        this.diedPanel,
        this.levelEndPanel,
        this.leveStartScene,
        this.debugPanel
      ]));
      this.engine.set("clearOnDraw", false);
      this.engine.start();

      this.leveStartScene.enter();

      return this;
    },
    showTitleScreen: function() {
      this.engine.stop();
      this.world.set("state", "pause");

      this.engine.reset();
      if (this.debugPanel) this.debugPanel.clear();

      this.engine.add(this.titleScreenGui);
      if (this.debugPanel) this.engine.add(this.debugPanel);
      this.engine.set("clearOnDraw", true);
      this.engine.start();

      return this;
    },
    showLevelScreen: function() {
      this.engine.stop();
      this.world.set("state", "pause");

      this.engine.reset();
      if (this.debugPanel) this.debugPanel.clear();

      this.engine.add(this.levelScreenGui);
      if (this.debugPanel) this.engine.add(this.debugPanel);
      this.engine.set("clearOnDraw", true);
      this.engine.start();

      return this;
    },
    saveLevelComplete: function() {
      return this.saveGame();
    },
    saveGame: function() {
      var hero = this.world.sprites.findWhere({hero: true});

      this.saved.add({
        date: _.now(),
        health: hero.get("health"),
        coins: hero.get("coins"),
        level: this.world.get("level"),
        levelName: this.world.get("name"),
        time: this.world.get("time")
      }, {merge: true});

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

});
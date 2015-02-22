(function() {

  Backbone.LevelViewModel = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      level: 1,
      name: "",
      state: "locked", // locked, unlocked, played, future
      width: 150, height: 140,
      backgroundColor: "transparent",
      img: "#gui", imgX: 0, imgY: 1696, imgWidth: 150, imgHeight: 140, imgMargin: 0
    }),
    initialize: function(attributes, options) {
      Backbone.Button.prototype.initialize.apply(this, arguments);
      this.imgForState();
      this.on("change:state", this.imgForState);
    },
    imgForState: function() {
      var imgX = this.attributes.imgX;
      switch (this.attributes.state) {
        case "locked":
          imgX = 300;
          break;
        case "unlocked":
          imgX = 150;
          break;
        case "future":
          imgX = 450;
          break;
        default:
          imgX = 0;
          break;
      }
      this.set("imgX", imgX);
      return this;
    }
  });

  Backbone.LevelViewCollection = Backbone.Collection.extend({
    model: Backbone.LevelViewModel
  });

  Backbone.LevelScreenGui = Backbone.Scene.extend({
    defaults: _.extend({}, Backbone.Scene.prototype.defaults, {
      img: "#level-screen",
      imgWidth: 960,
      imgHeight: 700
    }),
    initialize: function(attributes, options) {
      Backbone.Scene.prototype.initialize.apply(this, arguments);

      _.bindAll(this, "_calculateState");

      this.backButton = new Backbone.Button({
        x: 20, y: 600,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 350, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.backButton.on("tap", _.partial(this.action, "showTitleScreen"), this);

      this.levels = new Backbone.LevelViewCollection();

      var levelIndex = 0, level;
      for (var y = 110; y <= 470; y += 360)
        for (var x = 117; x < 885; x += 192) {
          level = levelIndex < Backbone.levels.length ? Backbone.levels[levelIndex] : null;
          this.levels.add({
            id: levelIndex,
            level: level ? level.name : "",
            state: this._calculateState(levelIndex, level),
            x: x,
            y: y
          });

          levelIndex += 1;
        }

    },
    onAttach: function() {
      Backbone.Scene.prototype.onAttach.apply(this, arguments);
      this.stopListening(this.engine);
      this.set("opacity", 0);

      this.engine.add(this.backButton);
      this.engine.add(this.levels.models);
      this.updateLevelStates();

      this.fadeIn();
    },
    onDetach: function() {
      Backbone.Scene.prototype.onDetach.apply(this, arguments);
      this.engine.remove(this.backButton);
      this.engine.remove(this.levels.models);
    },
    _calculateState: function(levelIndex, level) {
      var state = level == null ? "future" : "locked";
      if (_.isEmpty(this.saved)) {
        if (levelIndex == 0) state = "unlocked";
      } else if (!_.isEmpty(this.saved)) {
        if (levelIndex <= this.saved.levelIndex) state = "played";
        if (levelIndex == this.saved.levelIndex + 1) state = "unlocked";
      }
      return state;
    },
    updateLevelStates: function() {
      var gui = this;
      this.levels.each(function(viewModel) {
        level = viewModel.id < Backbone.levels.length ? Backbone.levels[viewModel.id] : null;
        viewModel.set({
          state: gui._calculateState(viewModel.id, level)
        });
      });
    },
    update: function(dt) {
      if (!Backbone.Scene.prototype.update.apply(this, arguments)) return false;

      var attrs = {opacity: this.get("opacity")},
          options = {silent: true};

      this.backButton.set(attrs, options);
      for (var i = 0; i < this.levels.models.length; i++)
        this.levels.models[i].set(attrs, options);

      return true;
    },
    action: function(event) {
      var gui = this;
      this.fadeOut(function() {
        gui.engine.trigger(event);
      });
    }
  });

}).call(this);
(function() {

  Backbone.LevelViewModel = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      level: 1,
      name: "",
      state: "locked", // locked, unlocked, played, future
      width: 150, height: 140,
      backgroundColor: "transparent",
      img: "#gui", imgX: 0, imgY: 1696, imgWidth: 150, imgHeight: 140, imgMargin: 0,
      text: "",
      textContextAttributes: {
        fillStyle: "#FFFFFF",
        font: "18px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
    }),
    idAttribute: "level",
    initialize: function(attributes, options) {
      Backbone.Button.prototype.initialize.apply(this, arguments);
      this.updateInfo();
      this.on("change:state", this.updateInfo);
    },
    updateInfo: function() {
      var attrs = {
        imgX: 0,
        text: "",
        textContextAttributes: _.clone(this.get("textContextAttributes"))
      };

      switch (this.attributes.state) {
        case "locked":
          attrs.imgX = 300;
          break;
        case "unlocked":
          attrs.imgX = 150;
          break;
        case "future":
          attrs.imgX = 450;
          attrs.text = "Comming\nSoon";
          attrs.textContextAttributes.textBaseline = "middle";
          break;
        case "played":
          attrs.imgX = 0;
          attrs.text = this.get("coins");
          attrs.height = 198;
          attrs.textPadding = 65;
          attrs.textContextAttributes.font = "24px arcade";
          attrs.textContextAttributes.textAlign = "left";
          attrs.textContextAttributes.textBaseline = "bottom";
          break;
      }

      this.set(attrs);
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

      this.views = new Backbone.LevelViewCollection();

      var level = this.levels.first(),
          i = level ? level.id : 1,
          view;
      for (var y = 110; y <= 470; y += 360)
        for (var x = 117; x < 885; x += 192) {
          view = this.views.add({
            level: level ? level.id : i,
            name: level ? level.get("name") : "",
            state: this._calculateState(level),
            x: x,
            y: y
          });
          view.on("tap", _.partial(this.play, view), this);

          level = level ? this.levels.at(this.levels.indexOf(level) + 1) : null;
          i = level ? level.id : (i + 1);
        }

    },
    onAttach: function() {
      Backbone.Scene.prototype.onAttach.apply(this, arguments);
      this.stopListening(this.engine);
      this.set("opacity", 0);

      this.engine.add(this.backButton);
      this.engine.add(this.views.models);
      this.updateLevelStates();

      this.fadeIn();
    },
    onDetach: function() {
      Backbone.Scene.prototype.onDetach.apply(this, arguments);
      this.engine.remove(this.backButton);
      this.engine.remove(this.views.models);
    },
    _calculateState: function(level) {
      if (!level) return "future";
      if (this.saved.get(level.id)) return "played";
      if (this.saved.getNextLevel().id == level.id) return "unlocked";
      return "locked";
    },
    updateLevelStates: function() {
      var gui = this;
      this.views.each(function(view) {
        var state = gui.saved.get(view.id);
        view.set({
          state: gui._calculateState(gui.levels.get(view.id)),
          coins: state ? state.get("coins") : 0,
          time: state ? state.get("time") : 0
        });
      });
    },
    update: function(dt) {
      if (!Backbone.Scene.prototype.update.apply(this, arguments)) return false;

      var attrs = {opacity: this.get("opacity")},
          options = {silent: true};

      this.backButton.set(attrs, options);
      for (var i = 0; i < this.views.models.length; i++)
        this.views.models[i].set(attrs, options);

      return true;
    },
    action: function(event) {
      var gui = this;
      this.fadeOut(function() {
        gui.engine.trigger(event);
      });
    },
    play: function(level) {
      if (!level || level.get("state") == "locked" || level.get("state") == "future") return this;
      var gui = this;
      this.fadeOut(function() {
        gui.engine.trigger("play", level.id);
      });
    }
  });

}).call(this);
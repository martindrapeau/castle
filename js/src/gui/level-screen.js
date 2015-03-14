(function() {

  Backbone.LevelViewModel = Backbone.Element.extend({
    defaults: _.extend({}, Backbone.Element.prototype.defaults, {
      level: 1,
      name: "",
      state: "locked", // locked, unlocked, played, future
      width: 150, height: 160,
      backgroundColor: "transparent",
      img: "#gui", imgX: 0, imgY: 1696, imgWidth: 150, imgHeight: 140, imgMargin: 0,
      text: "",
      textLineHeight: 20,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "18px arcade",
        textBaseline: "bottom",
        fontWeight: "normal",
        textAlign: "center"
      }
    }),
    idAttribute: "level",
    initialize: function(attributes, options) {
      Backbone.Element.prototype.initialize.apply(this, arguments);
      this.scoreTextAttributes = {
        height: 198,
        textPadding: 65,
        text: "",
        textLineHeight: 20,
        textContextAttributes: {
          fillStyle: "#FFF",
          font: "24px arcade",
          textBaseline: "bottom",
          fontWeight: "normal",
          textAlign: "left"
        }
      };
      this.updateInfo();
      this.on("change:state", this.updateInfo);
    },
    updateInfo: function() {
      var attrs = {
        imgX: 0,
        text: "",
        textContextAttributes: _.clone(this.get("textContextAttributes"))
      };
      attrs.textContextAttributes.fillStyle = "#F67D00";
      attrs.text = this.get("name");

      switch (this.attributes.state) {
        case "locked":
          attrs.imgX = 300;
          break;
        case "unlocked":
          attrs.imgX = 150;
          break;
        case "future":
          attrs.imgX = 450;
          attrs.textContextAttributes.fillStyle = "#999";
          attrs.text = "Comming\nSoon";
          break;
        case "played":
          attrs.imgX = 0;
          this.scoreTextAttributes.text = this.get("coins");
          break;
      }

      this.set(attrs);
      return this;
    },
    onDraw: function(context, options) {
      if (this.attributes.state != "played") return this;

      var b = _.extend(this.toJSON(), this.scoreTextAttributes);

      options || (options = {});
      b.x += options.offsetX || 0;
      b.y += options.offsetY || 0;

      this.drawText(b, context, options);

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

      this.backButton = new Backbone.Element({
        x: 20, y: Backbone.HEIGHT - 100,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 350, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.backButton.on("tap", _.partial(this.action, "showTitleScreen"), this);

      this.views = new Backbone.LevelViewCollection();

      var level = this.levels.first(),
          i = level ? level.id : 1,
          height = Backbone.HEIGHT / 2,
          startY = height / 2 - 80,
          view;
      for (var y = startY; y <= startY+height; y += height)
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
      if (this.saved.getNextLevel().id == level.id || true) return "unlocked";
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
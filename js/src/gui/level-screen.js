(function() {

  Backbone.LevelViewModel = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      level: 1,
      name: "",
      state: "locked", // locked, unlocked, played, future
      width: 150, height: 140,
      backgroundColor: "transparent",
      img: "#gui", imgX: 650, imgY: 700, imgWidth: 150, imgHeight: 140, imgMargin: 0,
      text: "",
      textLineHeight: 20,
      textPadding:  130,
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "18px arcade",
        textBaseline: "top",
        fontWeight: "normal",
        textAlign: "center"
      }
    }),
    idAttribute: "level",
    initialize: function(attributes, options) {
      Backbone.Button.prototype.initialize.apply(this, arguments);
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
          attrs.imgX = 650;
          attrs.imgY = 850;
          break;
        case "unlocked":
          attrs.imgX = 800;
          attrs.imgY = 700;
          break;
        case "future":
          attrs.imgX = 800;
          attrs.imgY = 850;
          attrs.textContextAttributes.fillStyle = "#999";
          attrs.text = "Comming\nSoon";
          break;
        case "played":
          attrs.imgX = 650;
          attrs.imgY = 700;
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
      easingTime: 1000,
      easing: "easeInOutCubic"
    }),
    initialize: function(attributes, options) {
      Backbone.Scene.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "_calculateState");

      this.backgroundTown = new Backbone.Element({
        x: 0,
        y: 0,
        width: 1024,
        height: 300,
        backgroundColor: "#4BACC6",
        img: "#backgrounds",
        imgY: 0,
        imgWidth: 1024,
        imgHeight: 300
      });
      this.backgroundTown._origY = this.backgroundTown.get("y");

      this.backgroundForest = new Backbone.Element({
        x: 0,
        y: 300,
        width: 1024,
        height: 300,
        img: "#backgrounds",
        imgY: 600,
        imgWidth: 1024,
        imgHeight: 300
      });
      this.backgroundForest._origY = this.backgroundForest.get("y");

      this.backgroundGraveyard = new Backbone.Element({
        x: 0,
        y: 600,
        width: 1024,
        height: 300,
        backgroundColor: "#0C1B2E",
        img: "#backgrounds",
        imgY: 300,
        imgWidth: 1024,
        imgHeight: 300
      });
      this.backgroundGraveyard._origY = this.backgroundGraveyard.get("y");

      this.backgroundCastle = new Backbone.Element({
        x: 0,
        y: 900,
        width: 1024,
        height: 420,
        img: "#backgrounds",
        imgY: 600,
        imgWidth: 1024,
        imgHeight: 420
      });
      this.backgroundCastle._origY = this.backgroundCastle.get("y");

      this.backButton = new Backbone.Button({
        x: 20, y: 30,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 730, imgY: 0, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.backButton.on("tap", _.partial(this.action, "showTitleScreen"), this);

      this.upButton = new Backbone.Button({
        x: Backbone.WIDTH - 90,
        y: 30,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 800, imgY: 0, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.upButton.on("tap", _.partial(this.moveTo, 0, 0), this);

      this.downButton = new Backbone.Button({
        x: Backbone.WIDTH - 90,
        y: Backbone.HEIGHT - 100,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 870, imgY: 0, imgWidth: 70, imgHeight: 70, imgMargin: 0
      });
      this.downButton.on("tap", _.partial(this.moveTo, 0, -600), this);

      this.views = new Backbone.LevelViewCollection();

      var level = this.levels.first(),
          i = level ? level.id : 1,
          height = 300,
          startY = height / 2 - 75,
          view;
      for (var y = startY; y <= startY+height*3; y += height)
        for (var x = 150; x < 900; x += 192) {
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

      for (var i = 0; i < this.views.models.length; i++) {
        var model = this.views.models[i];
        model._origY = model.get("y");
      }

    },
    onAttach: function() {
      Backbone.Scene.prototype.onAttach.apply(this, arguments);
      this.stopListening(this.engine);
      this.set("opacity", 0);

      this.engine.add([this.backgroundTown, this.backgroundForest, this.backgroundGraveyard, this.backgroundCastle, this.backButton, this.upButton, this.downButton]);
      this.engine.add(this.views.models);
      this.updateLevelStates();

      this.fadeIn();
    },
    onDetach: function() {
      Backbone.Scene.prototype.onDetach.apply(this, arguments);
      this.engine.remove([this.backgroundTown, this.backgroundForest, this.backgroundGraveyard, this.backgroundCastle, this.backButton, this.upButton, this.downButton]);
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
          options = {silent: true},
          y = this.get("y");

      this.backButton.set(attrs, options);
      this.upButton.set(y != 0 ? attrs : {opacity: 0}, options);
      this.downButton.set(y != -600 ? attrs : {opacity: 0}, options);

      attrs.y = y + this.backgroundTown._origY;
      this.backgroundTown.set(attrs, options);

      attrs.y = y + this.backgroundForest._origY;
      this.backgroundForest.set(attrs, options);

      attrs.y = y + this.backgroundGraveyard._origY;
      this.backgroundGraveyard.set(attrs, options);

      attrs.y = y + this.backgroundCastle._origY;
      this.backgroundCastle.set(attrs, options);

      for (var i = 0; i < this.views.models.length; i++) {
        var model = this.views.models[i];
        attrs.y = y + model._origY;
        model.set(attrs, options);
      }

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
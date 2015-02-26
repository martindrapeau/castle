(function() {

  Backbone.LevelStartScene = Backbone.Scene.extend({
    defaults: _.extend({}, Backbone.Scene.prototype.defaults, {
      textContextAttributes: {
        fillStyle: "#F67D00",
        font: "40px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
      easing: "easeInCubic",
      easingTime: 600
    }),
    enter: function() {
      var scene = this;
      this.set("opacity", 1);
      this.world.set("state", "pause");
      this.set("text", "Level " + this.world.get("level") + " - " + this.world.get("name"));

      setTimeout(function() {
        scene.fadeOut(function() {
          scene.world.set("state", "play");
          scene.engine.remove(scene);
        });
      }, 2000);

      return this;
    }
  });

  Backbone.LevelInOutScene = Backbone.Scene.extend({
    defaults: _.extend({}, Backbone.Scene.prototype.defaults, {
      opacity: 0,
      easing: "easeInCubic",
      easingTime: 400
    }),
    enter: function() {
      this.set("opacity", 1);
      this.world.set("state", "pause");

      this.fadeOut(function() {
        this.world.set("state", "play");
        this.engine.remove(this);
      });

      return this;
    },
    exit: function() {
      this.set("opacity", 0);
      this.world.set("state", "pause");

      this.fadeIn(function() {
        this.engine.remove(this);
      });
      
      return this;
    }
  });

  Backbone.InGamePanel = Backbone.Panel.extend({
    buttons: {
      home: {
        offsetX: 80, offsetY: 180,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 0, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0,
        click: "home"
      }
    },
    initialize: function(attributes, options) {
      Backbone.Panel.prototype.initialize.apply(this, arguments);
      this.pauseButton = options.pauseButton;
      this.world = options.world;
      this.input = options.input;
      this.levelInOutScene = options.levelInOutScene;

      var panel = this;
      _.each(this.buttons, function(button, name) {
        button.instance = new Backbone.Button(button);
        var callback = typeof button.click == "function" ? button.click : panel[button.click];
        button.instance.on("tap", callback, panel);
      });
    },
    onAttach: function() {
      Backbone.Panel.prototype.onAttach.apply(this, arguments);
      this.attachButtons();
    },
    onDetach: function() {
      Backbone.Panel.prototype.onDetach.apply(this, arguments);
      this.detachButtons();
    },
    attachButtons: function() {
      for (b in this.buttons)
        if (this.buttons.hasOwnProperty(b)) {
          this.buttons[b].instance.engine = this.engine;
          this.buttons[b].instance.trigger("attach");
        }
    },
    detachButtons: function() {
      for (b in this.buttons)
        if (this.buttons.hasOwnProperty(b)) {
          this.buttons[b].instance.trigger("detach");
          this.buttons[b].instance.engine = undefined;
        }
    },
    onUpdate: function(dt) {
      for (b in this.buttons)
        if (this.buttons.hasOwnProperty(b))
          this.buttons[b].instance.update(dt);
      return this;
    },
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y");

      for (b in this.buttons)
        if (this.buttons.hasOwnProperty(b))
          this.buttons[b].instance
            .set({
              x: x + this.buttons[b].offsetX,
              y: y + this.buttons[b].offsetY
            }, {silent: true})
            .draw(context);
      
      return this;
    },
    home: function() {
      return this.action("showTitleScreen");
    },
    action: function(event) {
      var panel = this;

      this.engine.add(this.levelInOutScene);
      this.levelInOutScene.exit().once("detach", function() {
        panel.detachButtons();
        panel.engine.remove(this.levelInOutScene);
        panel.pauseButton.trigger("attach");
        panel.input.trigger("attach");
        panel.set({y: 720});
        panel.engine.trigger(event);
      });

      return this;
    }
  })

  Backbone.PausePanel = Backbone.InGamePanel.extend({
    defaults: _.extend({}, Backbone.InGamePanel.prototype.defaults, {
      x: 320, y: 720, width: 320, height: 240,
      text: "Pause",
      img: "#gui", imgX: 0, imgY: 952, imgWidth: 320, imgHeight: 300, imgMargin: 0
    }),
    buttons: _.extend({}, Backbone.InGamePanel.prototype.buttons, {
      resume: {
        offsetX: 170, offsetY: 180,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 140, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0,
        click: "resume"
      }
    }),
    initialize: function(attributes, options) {
      Backbone.InGamePanel.prototype.initialize.apply(this, arguments);
      this.listenTo(this.pauseButton, "tap", this.show);
    },
    show: function() {
      this.world.set("state", "pause");

      this.detachButtons();
      this.pauseButton.trigger("detach");
      this.input.trigger("detach");

      this.moveTo(this.get("x"), 200, function() {
        this.attachButtons();
      });
      return this;
    },
    resume: function() {
      this.moveTo(this.get("x"), 720, function() {
        this.detachButtons();
        this.world.set("state", "play");
        this.pauseButton.trigger("attach");
        this.input.trigger("attach");
      });

      return this;
    }
  });

  Backbone.LevelEndPanel = Backbone.InGamePanel.extend({
    defaults: _.extend({}, Backbone.InGamePanel.prototype.defaults, {
      x: 320, y: 720, width: 366, height: 305,
      text: "Complete!",
      textContextAttributes: {
        fillStyle: "#FFF600",
        font: "40px arcade",
        textBaseline: "middle",
        fontWeight: "normal",
        textAlign: "center"
      },
      img: "#gui", imgX: 0, imgY: 1322, imgWidth: 366, imgHeight: 375, imgMargin: 0
    }),
    buttons: {
      home: {
        offsetX: 87, offsetY: 330,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 0, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0,
        click: "home"
      },
      resume: {
        offsetX: 209, offsetY: 330,
        width: 70, height: 70,
        backgroundColor: "transparent",
        img: "#gui", imgX: 280, imgY: 1252, imgWidth: 70, imgHeight: 70, imgMargin: 0,
        click: "next"
      }
    },
    onAttach: function() {
      Backbone.InGamePanel.prototype.onAttach.apply(this, arguments);
      this.hero = this.world.sprites.findWhere({hero:true});
      this.sign = this.world.sprites.findWhere({name: "f-sign2"});
      this.shown = false;
    },
    onDetach: function() {
      Backbone.InGamePanel.prototype.onDetach.apply(this, arguments);
      this.hero = undefined;
      this.sign = undefined;
      this.shown = false;
    },
    update: function(dt) {

      if (this.hero && this.sign && !this.shown &&
          this.hero.getLeft(true) > this.sign.getLeft(true))
        this.show();
    
      return Backbone.Panel.prototype.update.apply(this, arguments);
    },
    show: function() {
      this.shown = true;
      this.world.set("state", "pause");

      this.engine.trigger("saveLevelComplete");

      this.detachButtons();
      this.pauseButton.trigger("detach");
      this.input.trigger("detach");

      this.moveTo(this.get("x"), 100, function() {
        this.attachButtons();
      });
      return this;
    },
    next: function() {
      this.action("play");
    }
  });

}).call(this);
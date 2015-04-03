(function() {

  var Input = Backbone.Model.extend({
    defaults: {
      left: false, // Left button pressed?
      right: false, // Right button pressed?
      buttonA: false, // A button pressed? (X on keyboard)
      buttonB: false // B button pressed? (Z on keyboard)
    },
    initialize: function(attributes, options) {
      _.bindAll(this, "rightPressed", "leftPressed", "buttonBPressed", "buttonAPressed");
      this.on("attach", this.onAttach, this);
      this.on("detach", this.onDetach, this);
    },
    onAttach: function() {
    },
    onDetach: function() {
      this.set({
        left: false,
        right: false,
        buttonA: false,
        buttonB: false
      });
    },
    rightPressed: function() {
      return !!this.get("right");
    },
    leftPressed: function() {
      return !!this.get("left");
    },
    buttonBPressed: function() {
      return !!this.get("buttonB");
    },
    buttonAPressed: function() {
      return !!this.get("buttonA");
    },
    update: function(dt) {
      return false
    },
    draw: function(context) {
      return this;
    }
  });

  Backbone.WorldDriver = Backbone.Clock.extend({
    defaults: _.extend({}, Backbone.Clock.prototype.defaults, {
      delay: 200
    }),
    eventStack: [{
      delay: 1000,
      fn: function() {
        this.input.set("right", true);
      }
    }, {
      delay: 1000,
      fn: function() {
        this.input.set("right", false);
      }
    }],
    initialize: function(attributes, options) {
      Backbone.Clock.prototype.initialize.apply(this, arguments);
      this.world = options.world;
      this.input = new Input();
    },
    onAttach: function() {
      Backbone.Clock.prototype.onAttach.apply(this, arguments);
      this.engine.add(this.input);

      this.hero = this.world.sprites.findWhere({hero: true});
      this.hero.set("x", -80);
      this.hero.input = this.input;
      this.hero.trigger("attach");

      this.stackIndex = 0;
      this.lastTime = 0;
    },
    onDetach: function() {
      this.hero.input = undefined;
      this.hero = undefined;
      this.engine.remove(this.input);
    },
    onUpdate: function(dt) {
      var now = _.now(),
          event = this.eventStack[this.stackIndex];

      if (event && now > this.lastTime + event.delay) {
        event.fn.apply(this);
        this.lastTime = now;
        this.stackIndex += 1;
      }

      return false;
    }
  });

}).call(this);
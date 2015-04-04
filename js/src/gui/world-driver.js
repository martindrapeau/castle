(function() {

  var EventStack = Backbone.Model.extend({
    defaults: {
      spriteClass: undefined,
      index: 0,
      lastTime: 0
    },
    stack: [{
      delay: 1000,
      fn: function() {}  
    }],
    initialize: function(attributes, options) {
      this.driver = options.driver;
      this.world = options.world;
      this.input = options.input;
      this.on("attach", this.onAttach, this);
      this.on("detach", this.onDetach, this);
    },
    onAttach: function() {
      this.set({index: 0, lastTime: 0});
    },
    onDetach: function() {},
    update: function(dt) {
      if (this.world.get("state") == "pause") return false;

      var now = _.now(),
          lastTime = this.get("lastTime"),
          index = this.get("index"),
          event = this.stack[index];

      if (event && now > lastTime + event.delay) {
        event.fn.apply(this);
        this.set({
          index: index + 1,
          lastTime: now
        });
      }

      return false;
    },
    draw: function(context) {
      return this;
    }
  });

  var EventStackCollection = Backbone.Collection.extend({
    model: EventStack
  });

  Backbone.WorldDriver = Backbone.Clock.extend({
    defaults: _.extend({}, Backbone.Clock.prototype.defaults, {
      delay: 200
    }),
    initialize: function(attributes, options) {
      Backbone.Clock.prototype.initialize.apply(this, arguments);
      this.world = options.world;
      this.input = options.input;

      this.stacks = new EventStackCollection();
      this.stacks.add(new HeroEventStack(null, _.extend({driver: this}, options)));
    },
    onAttach: function() {
      Backbone.Clock.prototype.onAttach.apply(this, arguments);
      this.input.onDetach();
      this.inputDrawFn = this.input.draw;
      this.input.draw = function(context) {return this};

      for (var i = 0; i < this.stacks.models.length; i++)
        this.stacks.models[i].trigger("attach");

      this.stackIndex = 0;
      this.lastTime = 0;
    },
    onDetach: function() {
      for (var i = 0; i < this.stacks.models.length; i++)
        this.stacks.models[i].trigger("detach");

      this.input.draw = this.inputDrawFn;
    },
    onUpdate: function(dt) {
      if (this.world.get("state") == "pause") return false;

      for (var i = 0; i < this.stacks.models.length; i++)
        this.stacks.models[i].update.apply(this.stacks.models[i], arguments);

      return false;
    }
  });

  var HeroEventStack = EventStack.extend({
    onAttach: function() {
      this.hero = this.world.sprites.findWhere({hero: true});
      this.hero.set("x", -80);
    },
    onDetach: function() {
      this.hero = undefined;
    },
    stack: [{
      delay: 1000,
      fn: function() {
        this.input.set({right: true});
      }
    }, {
      delay: 1000,
      fn: function() {
        this.input.set({right: false, buttonB: true});
      }
    }, {
      delay: 300,
      fn: function() {
        this.input.set({buttonB: false});
      }
    }]
  });

}).call(this);
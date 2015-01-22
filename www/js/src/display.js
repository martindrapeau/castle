(function() {

  var empty = {
    health: 0,
    coin: 0
  };

  Backbone.HealthIndicator = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      name: "health-indicator",
      spriteSheet: "health-indicator",
      width: 200,
      height: 30,
      state: "idle",
      health: 0,
      maxHealth: 10
    }),
    animations: {
      idle: {
        sequences: [1],
        delay: 0
      }
    },
    draw: function(context) {
      Backbone.Sprite.prototype.draw.apply(this, arguments);

      var frame = this.spriteSheet.frames[0],
          width = Math.floor(frame.width * this.attributes.health/this.attributes.maxHealth);

      context.drawImage(
        this.spriteSheet.img,
        frame.x, frame.y, width, frame.height,
        this.get("x"), this.get("y"), width, frame.height
      );

      return this;
    }
  })

	Backbone.Display = Backbone.Model.extend({
		defaults: {
      x: 200,
      y: 0
		},
    initialize: function(attributes, options) {
      options || (options = {});
      this.world = options.world;
      this.hero = undefined;

      var x = this.get("x"),
          y = this.get("y");

      this.health = new Backbone.HealthIndicator({
        x: x, y: y + 17
      });

      this.coin = new Backbone.ACoin({
        x: x + 232, y: y
      });

      this.key = new Backbone.AKey({
        x: x + 384, y: y
      });

      this.on("attach", this.onAttach, this);
      this.on("detach", this.onDetach, this);
    },
    onAttach: function() {
      this.coin.engine = this.engine;
      this.coin.trigger("attach");

      var display = this;
      this.listenTo(this.world.sprites, "add", function(sprite) {
        if (sprite.get("hero")) display.hero = sprite;
      });
      this.listenTo(this.world.sprites, "remove", function(sprite) {
        if (sprite == display.hero) hero = undefined;
      });
      this.hero = this.world.sprites.findWhere({hero: true});
    },
    onDetach: function() {
      this.coin.trigger("detach");
      this.coin.engine = undefined;

      this.stopListening();
    },
    update: function(dt) {
      var assets = this.getAssets();
      this.health.set("health", assets.health);
      return true;
    },
    draw: function(context) {
      var assets = this.getAssets(),
          x = this.get("x"),
          y = this.get("y");

      this.health.draw.apply(this.health, arguments);

      this.coin.draw.apply(this.coin, arguments);

      if (assets.keys)
        this.key.draw.apply(this.key, arguments);

      context.fillStyle = "#E3BC70";
      context.font = "24px arcade, Verdana, Arial, Sans-Serif";
      context.textBaseline = "top";
      context.fontWeight = "normal";
      
      context.textAlign = "left";
      context.fillText(assets.coins, this.coin.get("x") + 60, 18);

    },
    getAssets: function() {
      return _.extend({}, empty, this.hero ? _.pick(this.hero.attributes, ["health", "coins", "keys"]) : null);
    }
	});

}).call(this);
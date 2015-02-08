(function() {

  var empty = {
    health: 0,
    coins: 0
  };

  Backbone.HealthIndicator = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      name: "health-indicator",
      spriteSheet: "health-indicator",
      width: 200,
      height: 30,
      state: "idle",
      health: 0,
      healthMax: 10
    }),
    animations: {
      idle: {
        sequences: [1],
        delay: 0
      }
    },
    initialize: function() {
      Backbone.Sprite.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "flash");
    },
    flash: function() {
      var health = this;
      health.showFlash = true;
      setTimeout(function() {
        health.showFlash = false;
      }, 1000);
    },
    draw: function(context) {
      Backbone.Sprite.prototype.draw.apply(this, arguments);

      var frame = this.spriteSheet.frames[0],
          width = Math.floor(frame.width * this.attributes.health/this.attributes.healthMax);

      context.save();
      if (this.showFlash && _.now() % 10 < 3) context.globalCompositeOperation = "lighter";
      context.drawImage(
        this.spriteSheet.img,
        frame.x, frame.y, width, frame.height,
        this.get("x"), this.get("y"), width, frame.height
      );
      context.restore();

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

      this.redPotion = new Backbone.ARedPotion({
        x: x + 448, y: y
      });

      this.greenPotion = new Backbone.AGreenPotion({
        x: x + 448, y: y
      });

      this.bluePotion = new Backbone.ABluePotion({
        x: x + 448, y: y
      });

      var display = this;
      this.listenTo(this.world.sprites, "add", function(sprite) {
        if (sprite.get("hero")) display.trigger("attach");
      });
      this.listenTo(this.world.sprites, "remove", function(sprite) {
        if (sprite.get("hero")) display.trigger("detach");
      });

      this.on("attach", this.onAttach, this);
      this.on("detach", this.onDetach, this);
    },
    onAttach: function() {
      this.onDetach();

      this.coin.engine = this.engine;
      this.coin.trigger("attach");

      this.hero = this.world.sprites.findWhere({hero: true});
      if (this.hero) this.listenTo(this.hero, "change:health", this.health.flash);
    },
    onDetach: function() {
      this.coin.trigger("detach");
      this.coin.engine = undefined;
      if (this.hero) this.stopListening(this.hero);
      this.hero = undefined;
    },
    update: function(dt) {
      var assets = this.getAssets();
      this.health.set({health: assets.health, healthMax: assets.healthMax});
      return true;
    },
    draw: function(context) {
      var assets = this.getAssets(),
          x = this.get("x"),
          y = this.get("y");

      this.health.draw.apply(this.health, arguments);

      this.coin.draw.apply(this.coin, arguments);

      if (assets.key)
        this.key.draw.apply(this.key, arguments);

      if (assets.potion == "red")
        this.redPotion.draw.apply(this.redPotion, arguments);
      else if (assets.potion == "green")
        this.greenPotion.draw.apply(this.greenPotion, arguments);
      else if (assets.potion == "blue")
        this.bluePotion.draw.apply(this.bluePotion, arguments);

      context.fillStyle = "#E3BC70";
      context.font = "24px arcade, Verdana, Arial, Sans-Serif";
      context.textBaseline = "top";
      context.fontWeight = "normal";
      
      context.textAlign = "left";
      context.fillText(assets.coins, this.coin.get("x") + 60, 18);

    },
    getAssets: function() {
      return _.extend({}, empty, this.hero ? _.pick(this.hero.attributes, ["health", "healthMax", "coins", "key", "potion"]) : null);
    }
	});

}).call(this);
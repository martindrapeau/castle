(function() {

  Backbone.Tutorial = Backbone.Model.extend({
    initialize: function(attributes, options) {
      this.world = options.world;
      this.touch = options.input.get("touchEnabled");
      this.houses = [];
      this.hero = undefined;
      this.hay = undefined;
      this.fence = undefined;
      this.brick = undefined;

      this.on("attach", this.onAttach);
      this.on("detach", this.onDetach);
    },
    onAttach: function() {
      if (this.world.get("level") != 1) return;

      var tutorial = this;
      this.world.sprites.each(function(sprite) {
        if (sprite.get("hero")) {
          tutorial.hero = sprite;
        } else if (sprite.get("type") == "house") {
          tutorial.houses.push(sprite);
        } else if (sprite.overlaps(400, 1050)) {
          tutorial.hay = sprite;
        } else if (sprite.overlaps(4500, 920)) {
          tutorial.brick = sprite;
        } else if (sprite.overlaps(3650, 1000)) {
          tutorial.fence = sprite;
        }
      });

    },
    onDetach: function() {
      this.houses.length = 0;
      this.hero = undefined;
      this.hay = undefined;
      this.fence = undefined;
      this.brick = undefined;
    },
    update: function(dt) {
      if (this.world.get("level") != 1 || !this.hero) return false;

      for (var i = 0; i < this.houses.length; i++) {
        var house = this.houses[i];
        if (this.hero.overlaps(house.door.attributes)) {
          this.world.add(new Backbone.Callout({
            x: house.door.get("x"),
            y: house.door.get("y") - Backbone.Callout.prototype.defaults.height,
            text: (this.touch ? "tap" : "Up key") + "\nto open" 
          }));
          _.each(this.houses, this.stopListening);
          this.houses.length = 0;          
        }
      }

      if (this.hay && this.hero.overlaps(this.hay.attributes)) {
        this.world.add(new Backbone.Callout({
          x: this.hay.get("x"),
          y: this.hay.get("y") - Backbone.Callout.prototype.defaults.height,
          text: (this.touch ? "red" : "press Z") + "\nto break" 
        }));
        this.hay = undefined;
      }

      if (this.fence && this.hero.overlaps(this.fence.attributes)) {
        this.world.add(new Backbone.Callout({
          x: this.fence.get("x"),
          y: this.fence.get("y") - Backbone.Callout.prototype.defaults.height,
          text: (this.touch ? "hold red" : "hold Z") + "\nto run" 
        }));
        this.fence = undefined;
      }

      if (this.brick && this.hero.overlaps(this.brick.attributes)) {
        this.world.add(new Backbone.Callout({
          x: this.brick.get("x"),
          y: this.brick.get("y") - Backbone.Callout.prototype.defaults.height,
          text: "run to\njump high" 
        }));
        this.brick = undefined;
      }

      return false;
    }
  });

}).call(this);
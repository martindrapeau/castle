(function() {

  var floatVelocity = 60,
      floatAcceleration = 100;

	var Platform = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      spriteSheet: "platforms",
      type: "platform",
      width: 192,
      height: 64,
      paddingTop: 16,
      state: "float-left",
      collision: true
    }),
    animations: {
      "idle-left": {
        sequences: [0],
        delay: 0
      },
      "idle-right": {
        sequences: [0],
        delay: 0
      },
      "float-left": {
        sequences: [0],
        delay: 0,
        velocity: -floatVelocity,
        acceleration: floatAcceleration
      },
      "float-right": {
        sequences: [0],
        delay: 0,
        velocity: floatVelocity,
        acceleration: floatAcceleration
      }
    },
    hit: function(sprite, dir, dir2) {
      return this;
    },
    ai: function(dt) {
      return this;
    },
    update: function(dt) {
      // Movements are only possible inside a world
      if (!this.world) return true;
      this.cancelUpdate = false;

      // Velocity and state
      var velocity = this.get("velocity") || 0,
          yVelocity = this.get("yVelocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          cur = this.getStateInfo(),
          animation = this.getAnimation(),
          now = _.now(),
          aiDelay = this.get("aiDelay"),
          attrs = {};

      // Handle AI
      if (!this.lastAIEvent)
        this.lastAIEvent = now;
      else if (now > this.lastAIEvent + aiDelay) {
        this.ai(now - this.lastAIEvent);
        this.lastAIEvent = now;
        if (this.cancelUpdate) return true;
      }

      attrs.sequenceIndex = this.updateSequenceIndex();

      if  (cur.mov == "idle") return true;

      if (this.world.get("state") != "play") {
        attrs.velocity = velocity = 0;
      } else {

        var collision = this.get("collision"),
            tileWidth = this.get("width"),
            tileHeight = this.get("height"),
            paddingLeft = this.get("paddingLeft"),
            paddingRight = this.get("paddingRight"),
            paddingBottom = this.get("paddingBottom"),
            paddingTop = this.get("paddingTop"),
            platWidth = tileWidth - paddingLeft - paddingRight,
            platHeight = tileHeight - paddingTop - paddingBottom,
            platBottomY = Math.round(y + yVelocity * (dt/1000)) + tileHeight - paddingBottom,
            platTopY = platBottomY - platHeight,
            platLeftX = Math.round(x + velocity * (dt/1000)) + paddingLeft,
            platRightX = platLeftX + platWidth,
            i;

        this.buildCollisionMap(platTopY, platRightX, platBottomY, platLeftX);
        this.world.findCollisions(this.collisionMap, null, this, true);

        if (cur.dir == "left") {
          if (velocity > animation.velocity)
            velocity -= animation.acceleration * (dt/1000);
          if (velocity < animation.velocity)
            velocity = animation.velocity;
          attrs.velocity = velocity;

          var leftX = -tileWidth;
          for (i = 0; i < this.collisionMap.left.sprites.length; i++)
            if (this.collisionMap.left.sprites[i].get("type") == "tile")
              leftX = Math.max(leftX, this.collisionMap.left.sprites[i].getRight(true));

          if (platLeftX <= leftX) {
            attrs.velocity = velocity = 0;
            attrs.state = this.buildState(cur.mov, cur.opo);
            attrs.x = x = leftX - paddingLeft;
          }
        } else if (cur.dir == "right") {
          if (velocity < animation.velocity)
            velocity += animation.acceleration * (dt/1000);
          if (velocity > animation.velocity)
            velocity = animation.velocity;
          attrs.velocity = velocity;

          var rightX = this.world.width();
          for (i = 0; i < this.collisionMap.right.sprites.length; i++)
            if (this.collisionMap.right.sprites[i].get("type") == "tile")
              rightX = Math.min(rightX, this.collisionMap.right.sprites[i].getLeft(true));

          if (platRightX >= rightX) {
            attrs.velocity = velocity = 0;
            attrs.state = this.buildState(cur.mov, cur.opo);
            attrs.x = x = rightX - platWidth - paddingLeft;
          }
        }
      }

      if (velocity) attrs.x = x = x + Math.round(velocity * (dt/1000));

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      if (typeof this.onUpdate == "function") return this.onUpdate(dt);
      return true;
    },
    buildCollisionMap: function(top, right, bottom, left) {
      this.collisionMap || (this.collisionMap = {
        left: {x: 0, y: 0, dir: "left", sprites: [], sprite: null},
        right: {x: 0, y: 0, dir: "right", sprites: [], sprite: null}
      });

      var height = bottom - top;
      this.collisionMap.left.x = left;
      this.collisionMap.right.x = right;
      this.collisionMap.left.y = this.collisionMap.right.y = top + height/2;
    }
	});

  extendSprite(Platform, "h-grass-platform");

  extendSprite(Platform, "h-barge", _.extend({}, Platform.prototype.defaults, {
    state: "idle-right",
    spriteSheet: "barge",
    width: 315,
    height: 90,
    paddingTop: 20
  }));
  _.extend(Backbone.HBarge.prototype, {
    onAttach: function() {
      Platform.prototype.onAttach.apply(this, arguments);
      this.hero = this.world ? this.world.sprites.findWhere({hero:true}) : null;
    },
    onDetach: function() {
      Platform.prototype.onDetach.apply(this, arguments);
      this.hero = undefined;
    },
    ai: function(dt) {
      if (!this.hero) return this;

      var state = this.get("state"),
          attrs = {};

      if (state == "idle-right" &&
          this.hero.getLeft(true) > this.getLeft(true) &&
          this.hero.getRight(true) < this.getRight(true)) {
        attrs.state = "float-right";
        attrs.velocity = this.getAnimation(attrs.state).velocity;
      }
      else if (state == "float-left" && this.get("velocity") < 0) {
        attrs.state = "idle-left";
        attrs.velocity = 0;
      }

      if (!_.isEmpty(attrs)) {
        this.set(attrs);
        this.cancelUpdate = true;
      }

      return this;
    }
  });



}).call(this);
(function() {

  var sequenceDelay = 50,
      koHurtVelocity = 200,
      fallAcceleration = 1200,
      fallVelocity = 600,
      koDelay = 100;
  
  var animations = {
    "fly-left": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      scaleX: -1,
      scaleY: 1
    },
    "fly-right": {
      sequences: [0, 1, 2, 3, 4, 5, 6, 7],
      delay: sequenceDelay,
      scaleX: 1,
      scaleY: 1
    },
    "fall-left": {
      sequences: [16],
      delay: sequenceDelay,
      velocity: -koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "fall-right": {
      sequences: [16],
      delay: sequenceDelay,
      velocity: koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [16, 17, 18, 19, 20],
      delay: koDelay,
      velocity: -koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [16, 17, 18, 19, 20],
      delay: koDelay,
      velocity: koHurtVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    }
  };

  var hurtAnimation = {
        sequences: [16, 17, 16],
        delay: 100,
        yVelocity: 0,
        yAcceleration: fallAcceleration
      };
  animations["fly-hurt-left"] = _.extend({}, animations["fly-left"], hurtAnimation);
  animations["fly-hurt-right"] = _.extend({}, animations["fly-right"], hurtAnimation);
  animations["fall-hurt-left"] = _.extend({}, animations["fall-left"], hurtAnimation);
  animations["fall-hurt-right"] = _.extend({}, animations["fall-right"], hurtAnimation);

	Backbone.Fly = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      name: "fly",
      spriteSheet: "fly",
      width: 104,
      height: 110,
      state: "fly-left",
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      health: 2,
      attackDamage: 2
    }),
    animations: animations,
    onHealthChange: function(model, health, options) {
      options || (options = {});
      var cur = this.getStateInfo(),
          dir = options.dir || cur.dir,
          opo = dir == "left" ? "right" : "left";
      
      if (health == 0)
        return this.knockout(null, dir);
      else if (health < this.previous("health")) {
        var fly = this;
        this.startNewAnimation(
          this.buildState("fly", "hurt", opo), {
            velocity: this.animations["ko-"+opo].velocity,
          }, function() {
            fly.set({
              state: this.buildState("fly", null, dir),
              velocity: 0
            });
          }
        );
      }

      return this;
    },
    update: function(dt) {
      if (!this.world) return true;
      this.cancelUpdate = false;

      var cur = this.getStateInfo();
      if (cur.mov == "ko") return Backbone.Character.prototype.update.apply(this, arguments);

      // Velocity and state
      var self = this,
          velocity = this.get("velocity") || 0,
          yVelocity = this.get("yVelocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          animation = this.getAnimation(),
          attrs = {};

      attrs.sequenceIndex = this.updateSequenceIndex();

      // TO DO - AI with movement...


      // Collision detection
      var tileWidth = this.get("width"),
          tileHeight = this.get("height"),
          paddingLeft = this.get("paddingLeft"),
          paddingRight = this.get("paddingRight"),
          paddingBottom = this.get("paddingBottom"),
          paddingTop = this.get("paddingTop"),
          charWidth = tileWidth - paddingLeft - paddingRight,
          charHeight = tileHeight - paddingTop - paddingBottom,
          charBottomY = Math.round(y + yVelocity * (dt/1000)) + tileHeight - paddingBottom,
          charTopY = charBottomY - charHeight,
          charLeftX = Math.round(x + velocity * (dt/1000)) + paddingLeft,
          charRightX = charLeftX + charWidth;

      this.buildCollisionMap(charTopY, charRightX, charBottomY, charLeftX);
      this.world.findCollisions(this.collisionMap, null, this, true);

      var sprites = [];
      for (var c in this.collisionMap)
        if (this.collisionMap.hasOwnProperty(c) && c.sprite && !_.contains(sprites, c.sprite)) {
          debugger;
          switch (c.dir) {
            case "right":
              attrs.velocity = velocity = 0;
              attrs.x = x = c.sprite.getRight(true) - paddingLeft;
              break;
            case "left":
              attrs.velocity = velocity = 0;
              attrs.x = x = c.sprite.getLeft(true) - charWidth - paddingLeft;
              break;
          }
          c.sprite.trigger("hit", this, c.dir);
        }

      if (velocity) attrs.x = x = x + velocity * (dt/1000);
      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      //if (this.engine.debugPanel) this.engine.debugPanel.set({state: this.get("state")})
      return true;      
    },
    buildCollisionMap: function(top, right, bottom, left) {
      this.collisionMap || (this.collisionMap = {
        topLeft: {x: 0, y: 0, dir: "bottom", sprites: [], sprite: null},
        topRight: {x: 0, y: 0, dir: "bottom", sprites: [], sprite: null},
        rightTop: {x: 0, y: 0, dir: "left", sprites: [], sprite: null},
        rightBottom: {x: 0, y: 0, dir: "left", sprites: [], sprite: null},
        bottomLeft: {x: 0, y: 0, dir: "top", sprites: [], sprite: null},
        bottomRight: {x: 0, y: 0, dir: "top", sprites: [], sprite: null},
        leftTop: {x: 0, y: 0, dir: "right", sprites: [], sprite: null},
        leftBottom: {x: 0, y: 0, dir: "right", sprites: [], sprite: null}
      });

      var width = right - left,
          height = bottom - top;
      this.collisionMap.topLeft.x = this.collisionMap.bottomLeft.x = left + width*0.2;
      this.collisionMap.topRight.x = this.collisionMap.bottomRight.x = left + width*0.8;
      this.collisionMap.topLeft.y = this.collisionMap.topRight.y = top;
      this.collisionMap.bottomLeft.y = this.collisionMap.bottomRight.y = bottom;
      this.collisionMap.leftTop.y = this.collisionMap.rightTop.y = top + height*0.2;
      this.collisionMap.leftBottom.y = this.collisionMap.rightBottom.y = top + height*0.8;
      this.collisionMap.leftTop.x = this.collisionMap.leftBottom.x = left;
      this.collisionMap.rightTop.x = this.collisionMap.rightBottom.x = right;
    }
	});

  Backbone.pagedSprites.c.push("fly");

}).call(this);
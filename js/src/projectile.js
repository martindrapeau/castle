(function() {

  /**
   *
   * Backbone Game Engine - An elementary HTML5 canvas game engine using Backbone.
   *
   * Copyright (c) 2014 Martin Drapeau
   * https://github.com/martindrapeau/backbone-game-engine
   *
   */

  Backbone.Projectile = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      type: "projectile",
      state: "fly-left",
      collision: true,
      attackDamage: 1,
      parentId: undefined
    }),
    animations: {
      "fly-left": {
        sequences: [0, 1, 2, 3],
        delay: 100,
        velocity: -400,
        scaleX: -1,
        scaleY: 1
      },
      "fly-right": {
        sequences: [0, 1, 2, 3],
        delay: 100,
        velocity: 400
      }
    },
    hit: function(sprite, dir, dir2) {
      if (this._handlingSpriteHit) return this;
      this._handlingSpriteHit = sprite;

      sprite.trigger("hit", this, _.opo(dir));

      this._handlingSpriteHit = undefined;
      return this;
    },
    removeAfterHit: function(sprite) {
      if (sprite) {
        var cur = this.getStateInfo();
        this.world.add(new Backbone.Explosion({
          x: (cur.dir == "right" ? this.getRight(true) : this.getLeft(true)) - Backbone.Explosion.prototype.defaults.width/2,
          y: this.getCenterY() - Backbone.Explosion.prototype.defaults.height/2
        }));
      }
      _.defer(this.world.remove, this);
      return this;
    },
    update: function(dt) {
      // Movements are only possible inside a world
      if (!this.world) return true;
      this.cancelUpdate = false;

      // Velocity and state
      var self = this,
          velocity = this.get("velocity") || 0,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          cur = this.getStateInfo(),
          animation = this.getAnimation(),
          attrs = {};

      attrs.sequenceIndex = this.updateSequenceIndex();

      if (velocity != animation.velocity)
        attrs.velocity = velocity = animation.velocity || 0;

      var tileWidth = this.get("width"),
          tileHeight = this.get("height"),
          paddingLeft = this.get("paddingLeft"),
          paddingRight = this.get("paddingRight"),
          paddingBottom = this.get("paddingBottom"),
          paddingTop = this.get("paddingTop"),
          charWidth = tileWidth - paddingLeft - paddingRight,
          charHeight = tileHeight - paddingTop - paddingBottom,
          charBottomY = y + tileHeight - paddingBottom,
          charTopY = charBottomY - charHeight,
          charLeftX = Math.round(x + velocity * (dt/1000)) + paddingLeft,
          charRightX = charLeftX + charWidth,
          parentId = this.get("parentId"),
          master = this.world.sprites.get(parentId),
          viewportWidth = this.world.viewport.width;

      // When not in play mode, do not allow horizontal displacements or animations
      if (this.world.get("state") != "play") {
        attrs.velocity = velocity = 0;
        attrs.sequenceIndex = this.get("sequenceIndex");

      } else {
        
        this.buildCollisionMap(charTopY, charRightX, charBottomY, charLeftX);
        this.world.findCollisions(this.collisionMap, null, this, true);

        // Walls and other obstacles
        if (velocity <= 0) {
          // Turn around if obstacle left
          var worldLeft = master ? master.attributes.x - viewportWidth*0.75 : -tileWidth,
              leftX = worldLeft,
              leftSprite;
          if (cur.mov != "ko" && cur.mov != "idle")
            for (i = 0; i < this.collisionMap.left.sprites.length; i++) {
              sprite = this.collisionMap.left.sprites[i];
              if (sprite.id == parentId) continue;
              leftX = Math.max(leftX, sprite.getRight(true));
              if (!leftSprite || sprite.getRight(true) > leftSprite.getRight(true))
                leftSprite = sprite;
            }

          if (charLeftX <= leftX) {
            if (leftSprite && leftSprite.get("type") == "character") {
              leftSprite.trigger("hit", this, "right", cur.mov2);
              if (this.cancelUpdate) return true;
            }
            this.removeAfterHit(leftSprite);
            return false;
          }
        }

        if (velocity >= 0) {
          // Turn around if obstacle to the right
          var worldRight = master ? master.attributes.x + viewportWidth*0.75 : this.world.width(),
              rightX = worldRight,
              rightSprite;
          if (cur.mov != "ko" && cur.mov != "idle")
            for (i = 0; i < this.collisionMap.right.sprites.length; i++) {
              sprite = this.collisionMap.right.sprites[i];
              if (sprite.id == parentId) continue;
              rightX = Math.min(rightX, sprite.getLeft(true));
              if (!rightSprite || sprite.getLeft(true) < rightSprite.getLeft(true))
                rightSprite = sprite;
            }

          if (charRightX >= rightX) {
            if (rightSprite && rightSprite.get("type") == "character") {
              rightSprite.trigger("hit", this, "left", cur.mov2);
              if (this.cancelUpdate) return true;
            }
            this.removeAfterHit(rightSprite);
            return false;
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
        right: {x: 0, y: 0, width:0, height: 0, dir: "right", sprites: [], sprite: null},
        left: {x: 0, y: 0, width:0, height: 0, dir: "left", sprites: [], sprite: null}
      });

      var width = right - left,
          height = bottom - top;
      this.collisionMap.left.x = left;
      this.collisionMap.right.x = right;
      this.collisionMap.left.y = this.collisionMap.right.y = top + height*0.20;
      this.collisionMap.left.height = this.collisionMap.right.height = height*0.60;
      this.collisionMap.left.width = this.collisionMap.right.width = 0;

      for (var m in this.collisionMap)
        if (this.collisionMap.hasOwnProperty(m)) {
          this.collisionMap[m].sprites.length = 0;
          this.collisionMap[m].sprite = null;
        }
    }
  });


  Backbone.Fireball = Backbone.Projectile.extend({
    defaults: _.extend({}, Backbone.Projectile.prototype.defaults, {
      name: "fireball",
      spriteSheet: "fireball",
      width: 71,
      height: 40,
      paddingLeft: 25,
      paddingRight: 25
    })
  });

}).call(this);
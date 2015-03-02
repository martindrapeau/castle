(function() {

  /**
   *
   * Backbone Game Engine - An elementary HTML5 canvas game engine using Backbone.
   *
   * Copyright (c) 2014 Martin Drapeau
   * https://github.com/martindrapeau/backbone-game-engine
   *
   */

  var sequenceDelay = 100,
      walkVelocity = 40,
      fallAcceleration = 1200,
      fallVelocity = 400;

  var animations = {
    "idle-left": {
      sequences: [0],
      delay: sequenceDelay,
      velocity: 0,
      scaleX: 1,
      scaleY: 1
    },
    "idle-right": {
      sequences: [0],
      delay: sequenceDelay,
      velocity: 0,
      scaleX: -1,
      scaleY: 1
    },
    "walk-left": {
      sequences: [1, 0],
      delay: sequenceDelay,
      velocity: -walkVelocity,
      scaleX: 1,
      scaleY: 1
    },
    "walk-right": {
      sequences: [1, 0],
      delay: sequenceDelay,
      velocity: walkVelocity,
      scaleX: -1,
      scaleY: 1
    },
    "fall-left": {
      sequences: [0],
      delay: sequenceDelay,
      velocity: -walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "fall-right": {
      sequences: [0],
      delay: sequenceDelay,
      velocity: walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [2, 3],
      delay: sequenceDelay,
      velocity: -walkVelocity/2,
      yVelocity: fallVelocity/2,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: -1
    },
    "ko-right": {
      sequences: [2, 3],
      delay: sequenceDelay,
      velocity: walkVelocity/2,
      yVelocity: fallVelocity/2,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: -1
    }
  };

  var hurtAnimation = {
        sequences: [0],
        delay: 300,
        yVelocity: fallVelocity,
        yAcceleration: fallAcceleration
      };
  animations["idle-hurt-left"] = _.extend({}, animations["idle-left"], hurtAnimation);
  animations["idle-hurt-right"] = _.extend({}, animations["idle-right"], hurtAnimation);
  animations["walk-hurt-left"] = _.extend({}, animations["walk-left"], hurtAnimation);
  animations["walk-hurt-right"] = _.extend({}, animations["walk-right"], hurtAnimation);
  animations["fall-hurt-left"] = _.extend({}, animations["fall-left"], hurtAnimation);
  animations["fall-hurt-right"] = _.extend({}, animations["fall-right"], hurtAnimation);


  Backbone.Character = Backbone.Sprite.extend({
    defaults: _.extend({}, Backbone.Sprite.prototype.defaults, {
      name: "character",
      type: "character",
      width: 32,
      height: 32,
      zIndex: 1,
      spriteSheet: undefined,
      state: "walk-left",
      velocity: 0,
      yVelocity: 0,
      collision: true,
      health: 2,
      attackDamage: 1,
      floor: null,
      ceiling: null,
      aiDelay: 1000
    }),
    animations: animations,
    initialize: function(attributes, options) {
      Backbone.Sprite.prototype.initialize.apply(this, arguments);
      options || (options = {});

      this.on("attach", this.onAttach, this);
      this.on("detach", this.onDetach, this);

      this.on("hit", this.hit, this);
      this.on("change:health", this.onHealthChange, this);
      this.on("beforeFall", this.onBeforeFall, this);
    },
    onAttach: function() {
      if (!this.engine) return;
      this.onDetach();
    },
    onDetach: function() {
    },
    onBeforeFall: function() {
      return this;
    },
    onHealthChange: function(model, health, options) {
      options || (options = {});
      var cur = this.getStateInfo(),
          dir = options.dir || cur.dir,
          opo = dir == "left" ? "right" : "left";
      
      if (health == 0)
        return this.knockout(options.sprite || null, dir, options.dir2 || null);
      else if (health < this.previous("health")) 
        return this.hurt(options.sprite || null, dir, options.dir2 || null);
      
      this.lastAIEvent = _.now();

      return this;
    },
    knockout: function(sprite, dir) {
      var opo = dir == "left" ? "right" : "left";
      this.whenAnimationEnds = null;
      this.set({
        state: this.buildState("ko", opo),
        velocity: this.animations["ko-"+opo].velocity,
        yVelocity: -this.animations["ko-"+opo].yVelocity,
        sequenceIndex: 0,
        collision: false
      });
      return this;
    },
    hurt: function(sprite, dir) {
      this.whenAnimationEnds = null;
      this.set({
        state: this.buildState("fall", "hurt", dir),
        velocity: this.animations["ko-"+dir].velocity,
        yVelocity: -this.animations["ko-"+dir].yVelocity,
        sequenceIndex: 0
      });
      return this;
    },
    hit: function(sprite, dir, dir2) {
      var cur = this.getStateInfo(),
          opo = dir == "left" ? "right" : "left";
      
      if (cur.mov2 == "hurt") return this;

      if (dir2 == "attack") {
        this.cancelUpdate = true;
        var attackDamage = sprite.get("attackDamage") || 1;
        this.set({health: Math.max(this.get("health") - attackDamage, 0)}, {sprite: sprite, dir: dir, dir2: dir2});
      } else if (cur.dir == dir && cur.mov2 == null) {
        this.cancelUpdate = true;
        this.set("state", this.buildState(cur.mov, null, cur.opo));
      }

      return this;
    },
    startNewAnimation: function(state, attrs, done) {
      this.lastSequenceChangeTime = _.now();
      this.set(_.extend({
        state: state,
        sequenceIndex: 0
      }, attrs));
      this.whenAnimationEnds = done;
      return this;
    },
    updateSequenceIndex: function(dt) {
      var sequenceIndex = this.get("sequenceIndex"),
          animation = this.getAnimation(),
          delay = animation.delay || 0,
          now = _.now(),
          triggerAnimationEnd = false;

      if (!animation.sequences) {
        sequenceIndex = 0;
        this.lastSequenceChangeTime = now;
      } else if (sequenceIndex >= animation.sequences.length) {
        sequenceIndex = 0;
        this.lastSequenceChangeTime = now;
        triggerAnimationEnd = true;
      } else if (delay && now > this.lastSequenceChangeTime + delay) {
        sequenceIndex = sequenceIndex < animation.sequences.length-1 ? sequenceIndex + 1 : 0;
        this.lastSequenceChangeTime = now;
        if (sequenceIndex == 0) triggerAnimationEnd = true;
      }

      if (triggerAnimationEnd && typeof this.whenAnimationEnds == "function") {
        this.whenAnimationEnds.call(this);
        this.whenAnimationEnds = null;
      }

      return sequenceIndex;
    },
    ai: function(dt) {
      return this;
    },
    update: function(dt) {
      // Movements are only possible inside a world
      if (!this.world) return true;
      this.cancelUpdate = false;

      // Velocity and state
      var self = this,
          velocity = this.get("velocity") || 0,
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

      if ((cur.mov == "ko" || cur.mov2 == "hurt") &&
          this.get("sequenceIndex") == animation.sequences.length-1) {
        // No sequence change - stay on last one
      } else {
        attrs.sequenceIndex = this.updateSequenceIndex();
      }

      if (velocity != animation.velocity) velocity = animation.velocity || 0;

      if (cur.mov == "fall" || cur.mov == "ko" || cur.mov2 == "hurt") {
        if (yVelocity < animation.yVelocity)
          yVelocity += animation.yAcceleration * (dt/1000);

        if (yVelocity >= animation.yVelocity)
          yVelocity = animation.yVelocity;
        attrs.yVelocity = yVelocity;
      }

      // Collision detection
      var collision = this.get("collision"),
          tileWidth = this.get("width"),
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
          charRightX = charLeftX + charWidth,
          bottomTile = this.world.findAt(charLeftX + charWidth/2, charBottomY, "tile", this, true),
          bottomWorld = this.world.height() + tileHeight,
          bottomY = _.minNotNull([
            this.get("floor"),
            bottomWorld,
            bottomTile ? bottomTile.getTop(true) : null
          ]);

      if (yVelocity >= 0) {
        // Walking or Falling...
        if (charBottomY >= bottomY) {
          if (charBottomY >= bottomWorld) {
            this.world.remove(this);
            return false;
          }

          // Stop falling because obstacle below
          attrs.yVelocity = yVelocity = 0;
          attrs.y = y = bottomY - tileHeight + paddingBottom;
          if (cur.mov == "fall")
            attrs.state = this.buildState("walk", null, cur.dir);
          else if (cur.mov == "ko") {
            attrs.velocity = velocity = 0;
          }
        } else if (cur.mov != "fall" && cur.mov != "ko" && charBottomY < bottomY) {
          // Start falling if no obstacle below
          attrs.state = this.buildState("fall", null, cur.dir);

          if (cur.mov == "walk" && velocity != 0) {
            this.trigger("beforeFall");
            if (this.cancelUpdate) return true;
          }
        }

      } else if (yVelocity < 0) {
        // Jumping
        var topTile = this.world.findAt(charLeftX + charWidth/2, charTopY, "tile", this, true),
            topY = _.maxNotNull([
              -400,
              topTile ? (topTile.get("y") + topTile.get("height")) : null
            ]);
        if (charTopY < topY) {
          attrs.yVelocity = yVelocity = 0;
          charTopY = topY;
          charBottomY = topY + charHeight;
          attrs.y = y = charBottomY - tileHeight;
        }

      }

      // When not in play mode, do not allow horizontal displacements or animations
      if (this.world.get("state") != "play") {
        attrs.velocity = velocity = 0;
        attrs.sequenceIndex = this.get("sequenceIndex");

      } else {
        
        // Walls and other obstacles
        if (velocity <= 0 && collision) {
          // Turn around if obstacle left
          var leftTile = cur.mov != "ko" ? this.world.findAt(charLeftX, charTopY, "tile", this, true) : null,
              leftCharacter = cur.mov != "ko" ? this.world.findAt(charLeftX, charTopY, "character", this, true) : null,
              worldLeft = -tileWidth,
              leftX = _.maxNotNull([
                worldLeft,
                leftTile ? leftTile.getRight(true) : null,
                leftCharacter ? leftCharacter.getRight(true) : null
              ]);

          if (charLeftX <= leftX) {
            if (charLeftX <= worldLeft) {
              this.world.remove(this);
              return false;
            }
            velocity = velocity * -1;
            attrs.state = this.buildState(cur.mov, null, cur.opo);
            attrs.x = x = leftX - paddingLeft;
            if (leftCharacter && cur.mov2 != "hurt") {
              leftCharacter.trigger("hit", this, "right", cur.mov2);
              if (this.cancelUpdate) return true;
            }
          }
        }

        if (velocity >= 0 && collision) {
          // Turn around if obstacle to the right
          var rightTile = cur.mov != "ko" ? this.world.findAt(charRightX, charTopY, "tile", this, true) : null,
              rightCharacter = cur.mov != "ko" ? this.world.findAt(charRightX, charTopY, "character", this, true) : null,
              worldRight = this.world.width(),
              rightX = _.minNotNull([
                worldRight,
                rightTile ? rightTile.getLeft(true) : null,
                rightCharacter ? rightCharacter.getLeft(true) : null,
              ]);

          if (charRightX >= rightX) {
            if (charRightX >= worldRight) {
              this.world.remove(this);
              return false;
            }
            velocity = velocity * -1;
            attrs.state = this.buildState(cur.mov, null, cur.opo);
            attrs.x = x = rightX - charWidth - paddingLeft;
            if (rightCharacter && cur.mov2 != "hurt") {
              rightCharacter.trigger("hit", this, "left", cur.mov2);
              if (this.cancelUpdate) return true;
            }
          }
        }
      }

      if (velocity) attrs.x = x = x + velocity * (dt/1000);
      if (yVelocity) attrs.y = y = y + yVelocity * (dt/1000);

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      if (this.engine.debugPanel) this.engine.debugPanel.set({spider: this.get("state")})

      return true;
    },
    toggleDirection: function(dirIntent) {
      var cur = this.getStateInfo();
      this.set({state: this.buildState(cur.mov, null, dirIntent)});
      return this;
    },
    getStateInfo: function(state) {
      var state = state || this.get("state"),
      pieces = state.split("-");
      if (pieces.length < 2) return {
        state: state,
        mov: state
      };

      var stateInfo = {};
      stateInfo.mov = pieces[0];
      stateInfo.mov2 = pieces.length == 3 ? pieces[1] : null;
      stateInfo.dir = pieces.length == 3 ? pieces[2] : pieces[1];
      stateInfo.opo = stateInfo.dir == "right" ? "left" : "right";
      return stateInfo;
    },
    isAttacking: function() {
      var cur = this.getStateInfo();
      return cur.mov2 == "attack";
    },
    buildState: function(piece1, piece2, piece3) {
      var state = "";
      if (piece1) state += piece1;
      if (piece2) state += (state.length ? "-" : "") + piece2;
      if (piece3) state += (state.length ? "-" : "") + piece3;
      return state;
    }
  });

}).call(this);
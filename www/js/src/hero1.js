(function() {

  // Velocity and acceleration values in absolute values
  var walkVelocity = 160,
      walkMinVelocity = 60,
      walkAcceleration = 150,
      runVelocity = 220,
      runMinVelocity = 100,
      runAcceleration = 400,
      releaseDeceleration = 200,
      skidDeceleration = 400,
      jumpVelocity = 650,
      jumpDeceleration = 1400,
      jumpHoldDeceleration = 900,
      fallAcceleration = 1200,
      airTurnaroundDeceleration = 400,
      fallVelocity = 600,
      idleDelay = 2500,
      walkDelay = 75,
      koDelay = 100,
      runDelay = 50,
      attackDelay = 50,
      attackSequences = [84, 85, 86, 87, 88, 89],
      jumpAttackSequences = [98, 99, 100, 101, 102, 103],
      skidAttackSequences = [112, 113, 114, 115, 116],
      walkSequences = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      runSequences = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];

  var animations = {
    "idle-left": {
      sequences: [0, 1],
      delay: idleDelay,
      velocity: 0,
      acceleration: 0,
      scaleX: -1,
      scaleY: 1
    },
    "idle-right": {
      sequences: [0, 1],
      delay: idleDelay,
      velocity: 0,
      acceleration: 0,
      scaleX: 1,
      scaleY: 1
    },
    "walk-left": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: -walkVelocity,
      minVelocity: -walkMinVelocity,
      acceleration: walkAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "walk-right": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: walkVelocity,
      minVelocity: walkMinVelocity,
      acceleration: walkAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "run-left": {
      sequences: runSequences,
      delay: runDelay,
      velocity: -runVelocity,
      minVelocity: -runMinVelocity,
      acceleration: runAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "run-right": {
      sequences: runSequences,
      delay: runDelay,
      velocity: runVelocity,
      minVelocity: runMinVelocity,
      acceleration: runAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "release-left": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: 0,
      acceleration: releaseDeceleration,
      scaleX: -1,
      scaleY: 1
    },
    "release-right": {
      sequences: walkSequences,
      delay: walkDelay,
      velocity: 0,
      acceleration: releaseDeceleration,
      scaleX: 1,
      scaleY: 1
    },
    "skid-left": {
      sequences: [42],
      velocity: 0,
      acceleration: skidDeceleration,
      scaleX: 1,
      scaleY: 1
    },
    "skid-right": {
      sequences: [42],
      velocity: 0,
      acceleration: skidDeceleration,
      scaleX: -1,
      scaleY: 1
    },
    "jump-left": {
      sequences: [56, 57],
      delay: 1000,
      velocity: -walkVelocity,
      acceleration: airTurnaroundDeceleration,
      yStartVelocity: -jumpVelocity,
      yEndVelocity: fallVelocity,
      yAscentAcceleration: jumpDeceleration,
      yHoldAscentAcceleration: jumpHoldDeceleration,
      yDescentAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "jump-right": {
      sequences: [56, 57],
      delay: 1000,
      velocity: walkVelocity,
      acceleration: airTurnaroundDeceleration,
      yStartVelocity: -jumpVelocity,
      yEndVelocity: fallVelocity,
      yAscentAcceleration: jumpDeceleration,
      yHoldAscentAcceleration: jumpHoldDeceleration,
      yDescentAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "ko-left": {
      sequences: [70, 71, 72],
      delay: koDelay,
      velocity: -walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: -1,
      scaleY: 1
    },
    "ko-right": {
      sequences: [70, 71, 72],
      delay: koDelay,
      velocity: walkVelocity,
      yVelocity: fallVelocity,
      yAcceleration: fallAcceleration,
      scaleX: 1,
      scaleY: 1
    },
    "dead-left": {
      sequences: [73],
      velocity: 0,
      scaleX: -1,
      scaleY: 1
    },
    "dead-right": {
      sequences: [73],
      velocity: 0,
      scaleX: 1,
      scaleY: 1
    }
  };
  animations["idle-attack-left"] = _.extend({}, animations["idle-left"], {sequences: attackSequences, delay: attackDelay});
  animations["idle-attack-right"] = _.extend({}, animations["idle-right"], {sequences: attackSequences, delay: attackDelay});
  animations["walk-attack-left"] = _.extend({}, animations["walk-left"], {sequences: attackSequences, delay: attackDelay});
  animations["walk-attack-right"] = _.extend({}, animations["walk-right"], {sequences: attackSequences, delay: attackDelay});
  animations["run-attack-left"] = _.extend({}, animations["run-left"], {sequences: attackSequences, delay: attackDelay});
  animations["run-attack-right"] = _.extend({}, animations["run-right"], {sequences: attackSequences, delay: attackDelay});
  animations["release-attack-left"] = _.extend({}, animations["release-left"], {sequences: attackSequences, delay: attackDelay});
  animations["release-attack-right"] = _.extend({}, animations["release-right"], {sequences: attackSequences, delay: attackDelay});
  animations["jump-attack-left"] = _.extend({}, animations["jump-left"], {sequences: jumpAttackSequences, delay: attackDelay});
  animations["jump-attack-right"] = _.extend({}, animations["jump-right"], {sequences: jumpAttackSequences, delay: attackDelay});
  animations["skid-attack-left"] = _.extend({}, animations["skid-left"], {sequences: skidAttackSequences, delay: attackDelay});
  animations["skid-attack-right"] = _.extend({}, animations["skid-right"], {sequences: skidAttackSequences, delay: attackDelay});

  Backbone.Hero1 = Backbone.Character.extend({
    defaults: _.extend({}, Backbone.Character.prototype.defaults, {
      name: "hero1",
      type: "character",
      hero: true,
      spriteSheet: "hero1",
      width: 128,
      height: 128,
      state: "idle-right",
      velocity: 0,
      acceleration: 0,
      yVelocity: 0,
      yAcceleration: 0,
      collision: true,
      dead: false,
      buttonBMode: "attack" // run or attack
    }),
    animations: animations,
    saveAttributes: _.union(
      Backbone.Character.prototype.saveAttributes,
      ["nextState", "velocity", "acceleration", "yVelocity", "yAcceleration"]
    ),
    initialize: function(attributes, options) {
      options || (options = {});
      Backbone.Character.prototype.initialize.apply(this, arguments);

      this.input = options.input;
      this.world = options.world;

      this.on("attach", this.onAttach, this);
      this.on("detach", this.onDetach, this);
    },
    onAttach: function() {
      if (this.input) {
        this.stopListening(this.input);
        this.listenTo(this.input, "change:right", _.partial(this.dirToggled, "right"));
        this.listenTo(this.input, "change:left", _.partial(this.dirToggled, "left"));
        this.listenTo(this.input, "change:buttonB", this.buttonBToggled);
        this.listenTo(this.input, "change:buttonA", this.buttonAToggled);
      }
      this.debugPanel = this.engine && this.engine.debugPanel ? this.engine.debugPanel : undefined;
    },
    onDetach: function() {
      if (this.input) this.stopListening(this.input);
      this.debugPanel = undefined;
    },
    hit: function(sprite, dir, dir2) {
      if (sprite.get("type") == "character") {
        var name = sprite.get("name"),
            cur = sprite.getStateInfo ? sprite.getStateInfo() : null;

        if (cur == null) return this;
        if (cur.mov == "squished" || cur.mov == "wake") return this;
        if (dir == "top" && name != "spike") return this;

        return this.knockout(sprite, "left");
      }
      return this;
    },
    knockout: function(sprite, dir) {
      var cur = this.getStateInfo();
      this.set({
        state: this.buildState("ko", cur.dir),
        velocity: this.animations[this.buildState("ko", cur.dir)].velocity,
        yVelocity: -this.animations[this.buildState("ko", cur.dir)].yVelocity/2,
        nextState: this.buildState("dead", cur.mov2, cur.dir),
        dead: true
      });
      return this;
    },
    toggleDirection: function(dirIntent) {
      return this.dirToggled(dirIntent);
    },
    // User input toggled in right or left direction.
    // Can be pressed or depressed
    dirToggled: function(dirIntent) {
      if (dirIntent != "left" && dirIntent != "right")
        throw "Invalid or missing dirIntent. Must be left or right."

      var cur = this.getStateInfo(),
          opoIntent = dirIntent == "right" ? "left" : "right",
          dirPressed = this.input ? this.input[dirIntent+"Pressed"]() : false,
          opoPressed = this.input ? this.input[opoIntent+"Pressed"]() : false,
          run = this.get("buttonBMode") == "run" && this.input ? this.input.buttonBPressed() : false,
          velocity = this.get("velocity"),
          attrs = {};

      if (this.get("dead")) return this;

      if (dirPressed) {
        // Pressed. Intent to move in that direction
        if (cur.mov == "jump") {
            // Update next step
            if (dirIntent != cur.dir && velocity)
              attrs.nextState = this.buildState("skid", opoIntent);
            else
              attrs.nextState = this.buildState(run ? "run" : "walk", dirIntent);
          } else if (cur.dir == dirIntent || cur.mov == "idle") {
            // Start walking or running
            attrs.state = this.buildState(run ? "run" : "walk", dirIntent);
            var animation = this.getAnimation(attrs.state);
            if (animation.minVelocity && Math.abs(velocity) < Math.abs(animation.minVelocity))
              attrs.velocity = animation.minVelocity;
          } else if (cur.dir == opoIntent) {
            // Skid trying to stop before turning
            attrs.state = this.buildState("skid", opoIntent);
            attrs.nextState = this.buildState(run ? "run" : "walk", dirIntent);
          }
        } else if (opoPressed) {
        // Depressed but opposite direction still pressed. Intent = turnaround.
        // Handle by calling the opposite direction press event.
        this.dirToggled(opoIntent);
      } else {
        // Depressed. Intent = stop to idle
        if (cur.mov == "jump") {
          attrs.nextState = this.buildState("release", dirIntent);
        } else {
          attrs.state = this.buildState("release", dirIntent);
          attrs.nextState = this.buildState("idle", dirIntent);
        }
      }

      if (!_.isEmpty(attrs)) this.set(attrs);

      return this;
    },
    // Run or attack
    buttonBToggled: function() {
      var mode = this.get("buttonBMode"),
          cur = this.getStateInfo(),
          pressed = this.input ? this.input.buttonBPressed() : false;

      if (mode == "run") {
        if (pressed && cur.mov == "walk")
          this.set("state",  this.buildState("run", cur.mov2, cur.dir));
        else if (!pressed && cur.mov == "run")
          this.set("state",  this.buildState("walk", cur.mov2, cur.dir));

      } else if (mode == "attack") {
        if (pressed && cur.mov2 != "attack")
          this.startNewAnimation(this.buildState(cur.mov, "attack", cur.dir), this.endAttack);
        else if (!pressed && cur.mov2 == "attack")
          this.endAttack();
      }

      return this;
    },
    endAttack: function() {
      var cur = this.getStateInfo();
      this.whenAnimationEnds = null;
      this.set("state", this.buildState(cur.mov, cur.dir));
      return this;
    },
    // Jump
    buttonAToggled: function() {
      var state = this.get("state"),
          cur = this.getStateInfo(),
          attrs = {};

      if (this.get("dead")) return this;

      if (this.input && this.input.buttonAPressed() && cur.mov != "jump") {
        // Set new state (keep old as next)
        attrs.state = this.buildState("jump", cur.dir);
        attrs.nextState = state;

        // Determine vertical velocity as a factor of horizontal velocity
        var jumpAnimation = this.getAnimation(attrs.state),
            velocity = this.get("velocity"),
            walkVelocity = this.getAnimation("walk-right").velocity,
            runVelocity = this.getAnimation("run-right").velocity,
            ratio = Math.abs((Math.abs(velocity) > walkVelocity ? velocity : walkVelocity) / runVelocity);
        attrs.yVelocity = Math.round(jumpAnimation.yStartVelocity * (ratio + (1-ratio)/2));

        var heroSmall = cur.mov == "crouch",
          heroWidth = this.get("width"),
          tileHeight = this.get("height"),
          heroHeight = heroSmall ? tileHeight*0.5 : tileHeight*0.8,
          heroBottomY = Math.round(this.get("y") - 4) + tileHeight,
          heroTopY = heroBottomY - heroHeight,
          heroLeftX = this.get("x"),
          topLeftTile = heroTopY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.4, heroTopY, "tile", this, true) : null,
          topRightTile = heroTopY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.6, heroTopY, "tile", this, true) : null;
        if (topLeftTile || topRightTile) attrs.yVelocity = -2*60;

        // Keep the horizontal velocity
        jumpAnimation.minY = (this.get("y") - this.world.height()) * ratio;
      }
      if (!_.isEmpty(attrs)) this.set(attrs);

      return this;
    },
    sequenceDelay: function(animation) {
      var velocity = this.get("velocity");
      return animation.velocity && velocity ?
        animation.delay * animation.velocity / velocity :
        animation.delay;
    },
    update: function(dt) {
      // Movements are only possible inside a world
      if (!this.world) return true;

      // Velocity and state
      var hero = this,
          mode = this.get("buttonBMode"),
          dead = this.get("dead"),
          input = this.input,
          velocity = this.get("velocity") || 0,
          yVelocity = this.get("yVelocity") || 0,
          yAcceleration = null,
          x = this.get("x"),
          y = this.get("y"),
          state = this.get("state"),
          cur = this.getStateInfo(),
          animation = this.getAnimation(),
          nextState = this.get("nextState"),
          nex = this.getStateInfo(nextState),
          nextAnimation = nextState ? (this.getAnimation(nextState) || {}) : null,
          attrs = {};

      attrs.sequenceIndex = this.updateSequenceIndex();

      switch (state) {
        case "walk-right":
        case "run-right":
        case "release-left":
        case "skid-left":
          if (velocity < animation.velocity)
            velocity += Math.round(animation.acceleration * (dt/1000));
          if (velocity >= animation.velocity) {
            velocity = animation.velocity;
            if (nextState) {
              attrs.state = nextState;
              animation = nextAnimation;
              if (animation.minVelocity && Math.abs(velocity) < Math.abs(animation.minVelocity))
                velocity = animation.minVelocity;
              attrs.nextState = null;
            }
          }
          attrs.velocity = velocity;
          break;

        case "walk-left":
        case "run-left":
        case "release-right":
        case "skid-right":
          if (velocity > animation.velocity)
            velocity -= Math.round(animation.acceleration * (dt/1000));
          if (velocity <= animation.velocity) {
            velocity = animation.velocity;
            if (nextState) {
              attrs.state = nextState;
              animation = nextAnimation;
              if (animation.minVelocity && Math.abs(velocity) < Math.abs(animation.minVelocity))
                velocity = animation.minVelocity;
              attrs.nextState = null;
            }
          }
          attrs.velocity = velocity;
          break;

        case "idle-right":
        case "idle-left":
          // TO DO: This should never happen - but seems to. Figure out why...
          if (velocity != 0) {
            if (input && input.rightPressed())
              this.toggleDirection("right");
            else if (input && input.leftPressed())
              this.toggleDirection("left");
            else
              throw "Idle with velocity != 0 and no dir pressed!";
          }
          break;

        case "jump-right":
        case "jump-left":
          // Update vertical velocity. Determine proper vertical acceleration.
          if (yVelocity < animation.yEndVelocity) {
            yAcceleration = yVelocity < 0 ? animation.yAscentAcceleration : animation.yDescentAcceleration;
            if (yVelocity < 0 && input && input.buttonAPressed() && y > animation.minY)
              yAcceleration = animation.yHoldAscentAcceleration;
            yVelocity += yAcceleration * (dt/1000);
          }
          if (yVelocity >= animation.yEndVelocity)
            yVelocity = animation.yEndVelocity;
          attrs.yVelocity = yVelocity;

          // Update horizontal velocity if trying to turnaround
          if (input && input.leftPressed() && velocity > -Math.abs(animation.velocity)) {
            velocity -= Math.abs(animation.acceleration) * (dt/1000);
            attrs.velocity = velocity;
          } else if (input && input.rightPressed() && velocity < Math.abs(animation.velocity)) {
            velocity += Math.abs(animation.acceleration) * (dt/1000);
            attrs.velocity = velocity;
          }
          break;

        case "ko-left":
        case "ko-right":
          if (yVelocity < animation.yVelocity)
            yVelocity += animation.yAcceleration * (dt/1000);

          if (yVelocity >= animation.yVelocity)
            yVelocity = animation.yVelocity;
          attrs.yVelocity = yVelocity;
          break;
      }

      // Collision detection
      var heroSmall = cur.mov == "crouch",
          heroWidth = this.get("width"),
          tileHeight = this.get("height"),
          heroHeight = heroSmall ? tileHeight*0.5 : tileHeight*0.8,
          heroLeftX = Math.round(x + velocity * (dt/1000)),
          reaction = null;

      var heroBottomY, heroTopY, obstacleCheckTopY, obstacleCheckBottomY;
      function updateHeroTopBottom() {
        heroBottomY = Math.round(y + yVelocity * (dt/1000)) + tileHeight;
        heroTopY = heroBottomY - heroHeight;
        obstacleCheckTopY = heroTopY + heroHeight*0.25;
        obstacleCheckBottomY = heroTopY + heroHeight*0.75;
      }
      updateHeroTopBottom();

      var bottomLeftTile = this.world.findAt(heroLeftX + heroWidth*0.4, heroBottomY, "tile", this, true),
          bottomRightTile = this.world.findAt(heroLeftX + heroWidth*0.6, heroBottomY, "tile", this, true),
          bottomWorld = this.world.height() + heroHeight,
          bottomY = _.minNotNull([
            this.get("floor"),
            bottomWorld,
            bottomLeftTile ? (bottomLeftTile.get("y") + (bottomLeftTile.get("paddingTop") || 0)) : null,
            bottomRightTile ? (bottomRightTile.get("y") + (bottomRightTile.get("paddingTop") || 0)) : null
          ]);


      if ((cur.mov == "jump" || dead) && yVelocity > 0) {
        // Falling...
        if (cur.mov2 == null) attrs.sequenceIndex = 1;

        if (dead && heroBottomY >= bottomWorld) {
          this.world.remove(this);
          return false;
        }

        function land(bottomY) {
          attrs.yVelocity = yVelocity = 0;
          attrs.y = y = bottomY - tileHeight;
          updateHeroTopBottom();
          attrs.state = nextState;
          if (nex.move == "walk" || nex.move == "run")
            attrs.nextState = hero.buildState(mode == "run" && input && input.buttonBPressed() ? "run" : "walk", nex.dir);
          else if (nex.mov == "skid")
            attrs.nextState = hero.buildState(mode == "run" && input && input.buttonBPressed() ? "run" : "walk", nex.opo);
          else if(nex.mov == "release")
            attrs.nextState = hero.buildState("idle", nex.dir);
          else if (nex.mov == "dead") {
            attrs.velocity = velocity = 0;
          }
        }

        if (heroBottomY >= bottomY) {
          // Stop falling if obstacle below
          if (heroBottomY >= bottomWorld) {
            this.world.remove(this);
            return false;
          }
          if (bottomLeftTile || bottomRightTile) {
            reaction = this.getHitReaction(bottomLeftTile || bottomRightTile, "bottom", bottomLeftTile ? "left": "right");
            if (reaction == "ko") {
              return this.knockout(bottomLeftTile || bottomRightTile, bottomLeftTile ? "left": "right");
            }
          }
          land(bottomY);
        } else {
          // Enemie below?
          var bottomLeftCharacter = !dead && heroBottomY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.4, heroBottomY, "character", this, true) : null,
              bottomRightCharacter = !dead && heroBottomY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.6, heroBottomY, "character", this, true) : null,
              characterBottomY = _.minNotNull([
                  bottomY,
                  bottomLeftCharacter ? bottomLeftCharacter.get("y") : null,
                  bottomRightCharacter ? bottomRightCharacter.get("y") : null
              ]);
          if (characterBottomY != bottomY) {
            reaction = this.getHitReaction(bottomLeftCharacter || bottomRightCharacter, "bottom", bottomLeftCharacter ? "left": "right");
            if (reaction == "block") {
              land(characterBottomY);
            } else if (reaction == "bounce") {
              attrs.yVelocity = yVelocity = animation.yStartVelocity*1/4;
              attrs.y = y = characterBottomY - tileHeight;
              updateHeroTopBottom();
            } else if (reaction == "ko") {
              return this.knockout(bottomLeftCharacter || bottomRightCharacter, bottomLeftCharacter ? "left": "right");
            }

            if (bottomLeftCharacter)
              bottomLeftCharacter.trigger("hit", this, "top", "right");
            if (bottomRightCharacter && bottomLeftCharacter != bottomRightCharacter)
              bottomRightCharacter.trigger("hit", this, "top", "left");
          }
        }

      } else if ((cur.mov == "jump" || dead) && yVelocity < 0) {
        if (cur.mov2 == null) attrs.sequenceIndex = 0;

        // Stop jumping if obstacle above
        var topLeftTile = !dead && heroTopY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.40, heroTopY, "tile", this, true) : null,
            topRightTile = !dead && heroTopY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.60, heroTopY, "tile", this, true) : null,
            topY = _.maxNotNull([
              -400,
              topLeftTile ? (topLeftTile.get("y") + topLeftTile.get("height")) : null,
              topRightTile ? (topRightTile.get("y") + topRightTile.get("height")) : null,
            ]);
        if (heroTopY < topY) {
          attrs.yVelocity = yVelocity = 0;
          attrs.y = y = topY + heroHeight - tileHeight;
          updateHeroTopBottom();
          if (cur.dir == "left") {
            if (topLeftTile) topLeftTile.trigger("hit", this);
            else if (topRightTile) topRightTile.trigger("hit", this);
          } else {
            if (topRightTile) topRightTile.trigger("hit", this);
            else if (topLeftTile) topLeftTile.trigger("hit", this);
          }
        } else {
          // Enemie above?
          var topLeftCharacter = !dead ? this.world.findAt(heroLeftX + heroWidth*0.40, heroTopY, "character", this, true) : null,
              topRightCharacter = !dead ? this.world.findAt(heroLeftX + heroWidth*0.60, heroTopY, "character", this, true) : null,
              characterTopY = _.maxNotNull([
                  topY,
                  topLeftCharacter ? (topLeftCharacter.get("y") + topLeftCharacter.get("height")) : null,
                  topRightCharacter ? (topRightCharacter.get("y") + topRightCharacter.get("height")) : null
              ]);
          if (characterTopY != topY) {
            reaction = this.getHitReaction(topLeftCharacter || topRightCharacter, "top", topLeftCharacter ? "left": "right");
            if (reaction == "block") {
              attrs.yVelocity = yVelocity = 0;
              attrs.y = y = characterTopY + heroHeight - tileHeight;
              updateHeroTopBottom();
            }

            if (topLeftCharacter) topLeftCharacter.trigger("hit", this, "bottom", "left");
            if (topRightCharacter) topRightCharacter.trigger("hit", this, "bottom", "right");
          }
        }
      } else if (cur.mov != "jump" && heroBottomY < bottomY && !dead) {
        // Start falling if no obstacle below
        attrs.nextState = state;
        attrs.state = this.buildState("jump", cur.mov2, cur.dir);
      }

      if (velocity <= 0) {
        // Stop if obstacle left
        var leftTopTile = obstacleCheckTopY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.25, obstacleCheckTopY, "tile", this, true) : null,
            leftBottomTile = obstacleCheckBottomY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.25, obstacleCheckBottomY, "tile", this, true) : null,
            leftBottomCharacter = this.world.findAt(heroLeftX + heroWidth*0.25, obstacleCheckBottomY, "character", this, true),
            leftX = _.maxNotNull([
              0,
              leftTopTile ? (leftTopTile.get("x") + leftTopTile.get("width")) : null,
              leftBottomTile ? (leftBottomTile.get("x") + leftBottomTile.get("width")) : null
            ]) - heroWidth*0.25;

        if (heroLeftX <= leftX) {
          // Hit a tile or end of the world
          attrs.velocity = velocity = 0;
          attrs.x = x = leftX;

        } else if (leftBottomCharacter) {
          // Check for character hit
          leftX = leftBottomCharacter.get("x") + leftBottomCharacter.get("width");
          if (heroLeftX <= leftX) {
            var reaction = this.getHitReaction(leftBottomCharacter, "left");
            if (reaction == "block") {
              attrs.velocity = velocity = 0;
              attrs.x = x = leftX;
            } else if (reaction == "ko") {
              return this.knockout(rightBottomCharacter, "right");
            }
            this.hit(leftBottomCharacter, "left");
            leftBottomCharacter.trigger("hit", this, "right");
          }
        }

      }

      if (velocity >= 0) {
        // Stop if obstacle to the right
        var rightTopTile = obstacleCheckTopY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.75, obstacleCheckTopY, "tile", this, true) : null,
            rightBottomTile = obstacleCheckBottomY > 0 ? this.world.findAt(heroLeftX + heroWidth*0.75, obstacleCheckBottomY, "tile", this, true) : null,
            rightBottomCharacter = this.world.findAt(heroLeftX + heroWidth*0.75, obstacleCheckBottomY, "character", this, true),
            rightX = _.minNotNull([
              this.world.width(),
              rightTopTile ? rightTopTile.get("x") : null,
              rightBottomTile ? rightBottomTile.get("x") : null
            ]) + heroWidth*0.25;

        if (heroLeftX + heroWidth >= rightX) {
          // Hit a tile or end of the world
          attrs.velocity = velocity = 0;
          attrs.x = x = rightX - heroWidth;

        } else if (rightBottomCharacter) {
          // Check for character hit
          rightX = rightBottomCharacter.get("x");
          if (heroLeftX + heroWidth >= rightX) {
            var reaction = this.getHitReaction(rightBottomCharacter, "right");
            if (reaction == "block") {
              attrs.velocity = velocity = 0;
              attrs.x = x = rightX - heroWidth;
            } else if (reaction == "ko") {
              return this.knockout(rightBottomCharacter, "left");
            }
            this.hit(rightBottomCharacter, "right");
            rightBottomCharacter.trigger("hit", this, "left");
          }
        }

      }

      if (velocity) attrs.x = x = x + Math.round(velocity * (dt/1000));
      if (yVelocity) attrs.y = y = y + Math.round(yVelocity * (dt/1000));

      // Set modified attributes
      if (!_.isEmpty(attrs)) this.set(attrs);

      if (this.debugPanel)
        this.debugPanel.set({state: this.attributes.state, nextState: this.attributes.nextState});

      return true;
    },
    // Returns a reaction when hero hits a character or tile.
    // Return value may be:
    //   - null: No reaction
    //   - block: Stop moving in that direction
    //   - bounce: Bounce back in the opposite direction
    //   - ko: Knock-out and die
    getHitReaction: function(sprite, dir, dir2) {
      if (sprite.isBlocking && !sprite.isBlocking(this)) return null;
      if (this.get("dead")) return "block";
      var name = sprite.get("name");
      if (dir == "bottom" && name == "spikes") return "ko";
      if (dir == "bottom") return "bounce";
      return "block";
    }
  });

}).call(this);
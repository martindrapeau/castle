(function() {

  /**
   *
   * Backbone Game Engine - An elementary HTML5 canvas game engine using Backbone.
   *
   * Copyright (c) 2014 Martin Drapeau
   * https://github.com/martindrapeau/backbone-game-engine
   *
   */

  Backbone.InputButton = Backbone.Button.extend({
    defaults: _.extend({}, Backbone.Button.prototype.defaults, {
      // Relative position references
      left: undefined,
      right: undefined,
      top: undefined,
      bottom: undefined,
      backgroundColor: "transparent"
    }),
    onAttach: function() {
      Backbone.Button.prototype.onAttach.apply(this, arguments);
      this.calculatePosition();
    },
    calculatePosition: function() {
      // Set x and y based on relative position references
      if (!this.engine) return this;
      var canvas = this.engine.canvas,
          attrs = {};

      if (this.attributes.left !== undefined)
        attrs.x = this.attributes.left;
      else if (this.attributes.right !== undefined)
        attrs.x = canvas.width - this.attributes.right - this.attributes.width;
      else
        throw "InputButton " + this.id + " missing left or right attributes.";

      if (this.attributes.top !== undefined)
        attrs.y = this.attributes.top;
      else if (this.attributes.bottom !== undefined)
        attrs.y = canvas.height - this.attributes.bottom - this.attributes.height;
      else
        throw "InputButton " + this.id + " missing top or bottom attributes.";

      this.set(attrs);
      return this;
    }
  });

  Backbone.LeftInputButton = Backbone.InputButton.extend({
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y"),
          width = this.get("width"),
          height = this.get("height");
      drawRect(context, x, y, width, height, "rgba(64, 64, 64, 0.5)");
      context.save();
      context.beginPath();
      context.moveTo(x+130, y+20);
      context.lineTo(x+40, y+80);
      context.lineTo(x+130, y+140);
      context.lineTo(x+100, y+80);
      context.lineTo(x+130, y+20);
      context.lineJoin = 'bevel';
      context.fillStyle = pressed ? "#00FF00" : "#009900";
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#111';
      context.stroke();
      context.restore();
      return this;
    }
  });

  Backbone.RightInputButton = Backbone.InputButton.extend({
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y"),
          width = this.get("width"),
          height = this.get("height");
      drawRect(context, x, y, width, height, "rgba(128, 128, 128, 0.5)");
      context.save();
      context.beginPath();
      context.moveTo(x+30, y+20);
      context.lineTo(x+120, y+80);
      context.lineTo(x+30, y+140);
      context.lineTo(x+60, y+80);
      context.lineTo(x+30, y+20);
      context.lineJoin = 'bevel';
      context.fillStyle = pressed ? "#00FF00" : "#009900";
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#111';
      context.stroke();
      context.restore();
      return this;
    }
  });

  Backbone.AInputButton = Backbone.InputButton.extend({
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y"),
          width = this.get("width"),
          height = this.get("height");
      drawRect(context, x, y, width, height, "rgba(255, 255, 255, 0.5)");
      context.save();
      context.beginPath();
      context.arc(x+80, y+80, 60, 0, 2*Math.PI, false);
      context.fillStyle = "#111";
      context.fill();
      context.beginPath();
      context.arc(x+80, x+80, 55, 0, 2*Math.PI, false);
      context.fillStyle = pressed ? "#0000FF" : "#000099";
      context.fill();
      context.restore();
      return this;
    }
  });

  Backbone.BInputButton = Backbone.InputButton.extend({
    onDraw: function(context) {
      var x = this.get("x"),
          y = this.get("y"),
          width = this.get("width"),
          height = this.get("height");
      drawRect(context, x, y, width, height, "rgba(192, 192, 192, 0.5)");
      context.save();
      context.beginPath();
      context.arc(x+80, y+80, 60, 0, 2*Math.PI, false);
      context.fillStyle = "#111";
      context.fill();
      context.beginPath();
      context.arc(x+80, x+80, 55, 0, 2*Math.PI, false);
      context.fillStyle = pressed ? "#FF0000" : "#990000";
      context.fill();
      context.restore();
      return this;
    }
  });


  // Input class; a Backbone Model which captures input events
  // and stores them as model attributes with true if pressed.
  // Supports keyboard, and a drawn touchpad activated by touch
  // or mouse events.
  Backbone.Input = Backbone.Model.extend({
    defaults: {
      // Supported buttons
      left: false, // Left button pressed?
      right: false, // Right button pressed?
      buttonA: false, // A button pressed? (X on keyboard)
      buttonB: false, // B button pressed? (Z on keyboard)
      pause: false, // Pause button pressed? (P on keyboard)

      // List of pressed buttons per input device
      pressed: [], // List of buttons pressed on the keyboard
      touched: [], // List of buttons touched on a touch screen
      clicked: false, // Button clicked by the mouse

      // Touch pad
      drawTouchpad: "auto", // Boolean to draw. Set to auto to draw only for touch devices.
      drawPause: false, // Boolean to draw the pause button.
      touchEnabled: false // Touch device? Automatically determined. Do not set.
    },
    buttons: [{
      id: "left", name: "leftInputButton",
      left: 0, bottom: 0, width: 160, height: 160
    },  {
      id: "right", name: "rightInputButton",
      left: 160, bottom: 0, width: 160, height: 160
    },  {
      id: "buttonA", name: "aInputButton",
      right: 160, bottom: 0, width: 160, height: 160
    },  {
      id: "buttonB", name: "bInputButton",
      right: 160, bottom: 0, width: 160, height: 160
    }],
    initialize: function(attributes, options) {
      options || (options = {});
      var input = this;

      _.bindAll(this, "rightPressed", "leftPressed", "buttonBPressed", "buttonAPressed");

      for (var i = 0; i < this.buttons.length; i++) {
        var button = this.buttons[i],
            cls = _.classify(button.name);
        button.instance = new Backbone[cls](button);
      }

      // Handle touch events
      var touchEnabled =
        "onorientationchange" in window ||
        window.navigator.msMaxTouchPoints ||
        window.navigator.isCocoonJS;
      this.set({touchEnabled: touchEnabled});

      // Debug panel
      var debugPanel = this.debugPanel = options.debugPanel;
      if (debugPanel) {
        this.on("change:pressed", function() {
          debugPanel.set({pressed: input.get("pressed")});
        });
        this.on("change:touched", function() {
          debugPanel.set({touched: input.get("touched")});
        });
        this.on("change:clicked", function() {
          debugPanel.set({clicked: input.get("clicked")});
        });
      }

      if (touchEnabled) {
        // Prevent touch scroll
        $(document).bind("touchmove.InputTouchScroll", function(e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

        // Prevent links from opening popup after a while
        document.documentElement.style.webkitTouchCallout = "none";
      }

      this.on("change:drawTouchpad", this.toggleTouchpad, this);
      this.on("attach", this.onAttach, this);
      this.on("detach", this.onDetach, this);
    },
    onAttach: function() {
      this.onDetach();
      // Handle keyboard input
      $(document).on("keydown.Input", this.onKeydown.bind(this));
      $(document).on("keyup.Input", this.onKeyup.bind(this));

      // Touch pad
      this.toggleTouchpad();
    },
    onDetach: function() {
      $(document).off(".Input");
      $(document).off(".InputTouchpad");
      this.set({
        left: false,
        right: false,
        buttonA: false,
        buttonB: false,
        pause: false,
        pressed: [],
        touched: [],
        clicked: false
      });
    },

    // Touch pad
    toggleTouchpad: function() {
      $(document).off(".InputTouchpad");

      if (!this.hasTouchpad()) return;
      
      if (this.get("touchEnabled")) {
        if (window.navigator.msMaxTouchPoints) {
          $(document).on("pointerdown.InputTouchpad", this.onTouchStart.bind(this));
          $(document).on("pointermove.InputTouchpad", this.onTouchMove.bind(this));
          $(document).on("pointerup.InputTouchpad", this.onTouchEnd.bind(this));
          $(document).on("pointercancel.InputTouchpad", this.onTouchEnd.bind(this));
        } else {
          $(document).on("touchstart.InputTouchpad", this.onTouchStart.bind(this));
          $(document).on("touchmove.InputTouchpad", this.onTouchMove.bind(this));
          $(document).on("touchend.InputTouchpad", this.onTouchEnd.bind(this));
          $(document).on("touchleave.InputTouchpad", this.onTouchEnd.bind(this));
          $(document).on("touchcancel.InputTouchpad", this.onTouchEnd.bind(this));
        }
      } else {
        // Fallback to handling mouse events
        $(document).on("mousedown.InputTouchpad", this.onMouseDown.bind(this));
        $(document).on("mousemove.InputTouchpad", this.onMouseDown.bind(this));
        $(document).on("mouseup.InputTouchpad", this.onMouseUp.bind(this));
      }

      return this;
    },
    hasTouchpad: function() {
      var drawTouchpad = this.get("drawTouchpad");
      if (_.isBoolean(drawTouchpad)) return drawTouchpad;
      if (drawTouchpad == "auto" && this.get("touchEnabled")) return true;
      return false;
    },

    // Engine core functions
    update: function(dt) {
      return this.hasTouchpad();
    },
    draw: function(context) {
      var input = this,
          drawPause = this.get("drawPause");

      // Draw the touch pad
      _.each(this.touchButtons, function(button) {
        if (button.button != "pause" || drawPause)
          button.draw(context, !!input.get(button.button));
      });

      return this;
    },

    // Keyboard events
    onKeydown: function(e) {
      var button = this.keyCodeToButton(e.keyCode),
          attrs = {};
      attrs[e.keyCode] = true;
      if (button) attrs[button] = true;
      this.set(attrs);
    },
    onKeyup: function(e) {
      var button = this.keyCodeToButton(e.keyCode),
          attrs = {};
      attrs[e.keyCode] = false;
      if (button) attrs[button] = false;
      this.set(attrs);
    },

    // Touch events
    detectTouched: function() {
      var canvas = this.engine.canvas,
          touchButtons = this.touchButtons,
          touched = _.clone(this.get("touched")) || [],
          attrs = {touched: []};

      _.each(ongoingTouches, function(touch) {
        var x = touch.pageX - canvas.offsetLeft,
            y = touch.pageY - canvas.offsetTop;

        _.each(touchButtons, function(button) {
          if (x > button.x && x < button.x + button.width &&
            y > button.y && y < button.y + button.height) {
            attrs.touched.push(button.button);
            attrs[button.button] = true;
          }
        });
      });

      _.each(touched, function(button) {
        if (_.indexOf(attrs.touched, button) == -1)
          attrs[button] = false;
      });

      if (_.isEqual(attrs.touched, touched)) delete attrs.touched;
      if (!_.isEmpty(attrs)) this.set(attrs);

      return this;
    },
    onTouchStart: function(e) {
      e.preventDefault();
      var touches = e.changedTouches || [{
          identifier: e.pointerId,
          pageX: e.pageX,
          pageY: e.pageY
        }];

      for (var i = 0; i < touches.length; i++)
        ongoingTouches.push(copyTouch(touches[i]));
      this.detectTouched();
    },
    onTouchMove: function(e) {
      e.preventDefault();
      var touches = e.changedTouches || [{
          identifier: e.pointerId,
          pageX: e.pageX,
          pageY: e.pageY
        }];

      for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
      }

      this.detectTouched();
    },
    onTouchEnd: function(e) {
      e.preventDefault();
      var touches = e.changedTouches || [{
          identifier: e.pointerId,
          pageX: e.pageX,
          pageY: e.pageY
        }];

      for (var i=0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) ongoingTouches.splice(idx, 1);
      }

      this.detectTouched();
    },

    // Mouse events
    onMouseDown: function(e) {
      if (!e.which) return;

      var canvas = this.engine.canvas,
          x = e.pageX - canvas.offsetLeft,
          y = e.pageY - canvas.offsetTop,
          clicked = this.get("clicked"),
          attrs = {clicked: true};

      _.each(this.touchButtons, function(button) {
        if (x > button.x && x < button.x + button.width &&
          y > button.y && y < button.y + button.height &&
          clicked != button.button) {
          attrs.clicked = button.button;
          attrs[button.button] = true;
          return false;
        }
      });
      if (attrs.clicked === clicked) delete attrs.clicked;
      if (attrs.clicked === true) attrs[clicked] = false;

      if (!_.isEmpty(attrs)) this.set(attrs);
    },
    onMouseUp: function(e) {
      var clicked = this.get("clicked"),
          attrs = {clicked: false};
      if (_.isString(clicked)) attrs[clicked] = false;

      if (!_.isEmpty(attrs)) this.set(attrs);
    },

    // Button helpers
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
    pausePressed: function() {
      return !!this.get("pause");
    },
    keyCodeToButton: function(keyCode) {
      switch (keyCode) {
        case 39:
        return "right";
        case 37:
        return "left";
        case 90:
        return "buttonB";
        case 88:
        return "buttonA";
        case 80:
        return "pause";
      }
      return null;
    }
  });

  // Touch event helpers.
  // Source: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events
  var ongoingTouches = [];
  function copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
  }
  function ongoingTouchIndexById(idToFind) {
    for (var i=0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
      if (id == idToFind) return i;
    }
    return -1;
  }

}).call(this);
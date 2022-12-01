const makeItSnow = () => {
  var Snow = function (canvas_id, options) {
    var defaultOptions = {
      speed: 1,
      count: 1000,
      images: ["flake1.png", "flake2.png", "flake3.png"],
      size: {
        min: 10,
        max: 30,
      },
    };

    if (options !== null) {
      for (var prop in defaultOptions) {
        if (defaultOptions.hasOwnProperty(prop)) {
          if (!options.hasOwnProperty(prop)) {
            options[prop] = defaultOptions[prop];
          }
        }
      }
    }

    var canvas = document.querySelector(canvas_id);

    var ctx = canvas.getContext("2d");

    var stopped = true,
      paused = false;

    var halfHorizontal, halfVertical;

    var rand = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var rand_float = function (min, max) {
      return Math.random() * (min - max) + max;
    };

    var flakes = [];

    var Flake = function () {
      var image = new Image();
      var imageLoaded = false;
      var x,
        y,
        y_step,
        size,
        direction,
        x_step,
        x_step_size,
        rotate,
        rotate_speed,
        rotateDiretion,
        flip,
        flip_speed;

      var reset = function () {
        size = rand(options.size.min, options.size.max);
        x = rand(size, canvas.width);
        y = -size;
        y_step = rand_float(1, 5);
        x_step = 0;
        x_step_size = rand(1, 10) / 100;
        direction = rand_float(-1.5, 1.5);
        rotate = 0;
        rotateDiretion = rand(0, 1) ? -1 : 1;
        rotate_speed = 1 + Math.random() * (2 - 1);
        flip = 1;

        if (rand(1, 100) <= 50) {
          flip_speed = -rand_float(0.01, 0.05);
        } else {
          flip_speed = 0;
        }
      };

      image.onload = function () {
        imageLoaded = true;
        reset();
        y = rand(-size, canvas.height);
      };

      image.src = options.images[rand(0, options.images.length - 1)];

      this.draw = function () {
        if (imageLoaded) {
          y += y_step;
          x_step += x_step_size;
          x += Math.cos(x_step);
          x += direction;

          rotate += rotateDiretion * rotate_speed;

          if (rotate < 0) {
            rotate = 360;
          } else if (rotate > 360) {
            rotate = 0;
          }

          flip += flip_speed;

          if (flip <= 0 || flip >= 1) {
            flip_speed *= -1;
          }

          ctx.save();
          ctx.translate(x, y);
          ctx.translate(size / 2, size / 2);
          ctx.rotate((rotate * Math.PI) / 180);
          ctx.scale(flip, 1);
          ctx.drawImage(image, -(size / 2), -(size / 2), size, size);
          ctx.restore();

          if (y >= canvas.height + size) {
            reset();
          }
        }
      };
    };

    this.updateCanvasSize = function () {
      canvas.width = canvas.parentNode.offsetWidth;
      canvas.height = canvas.parentNode.offsetHeight;
      halfHorizontal = canvas.width / 2;
      halfVertical = canvas.height / 2;
    };

    this.start = function () {
      if (stopped) {
        stopped = false;

        for (let i = 0; i < options.count; i++) {
          flakes.push(new Flake());
        }

        this.draw();
      } else if (paused) {
        paused = false;
        this.draw();
      }
    };

    this.stop = function () {
      flakes = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stopped = true;
      paused = false;
    };

    this.pause = function () {
      paused = true;
    };

    this.draw = function () {
      if (!stopped && !paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < flakes.length; i++) {
          flakes[i].draw();
        }

        window.requestAnimationFrame(() => this.draw());
      }
    };

    this.updateCanvasSize();

    window.addEventListener("resize", () => this.updateCanvasSize());
  };

  var SnowFall = new Snow("#Snow", {
    images: [
      "https://www.e-webdev.ru/assets/images/flakes/flake1.png",
      "https://www.e-webdev.ru/assets/images/flakes/flake2.png",
      "https://www.e-webdev.ru/assets/images/flakes/flake3.png",
      "https://www.e-webdev.ru/assets/images/flakes/flake4.png",
      "https://www.e-webdev.ru/assets/images/flakes/flake5.png",
      "https://www.e-webdev.ru/assets/images/flakes/flake6.png",
      "https://www.e-webdev.ru/assets/images/flakes/flake7.png",
    ],
  });
  SnowFall.start()
}


export default makeItSnow
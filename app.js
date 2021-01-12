window.onload = init();
function init() {
  initAnimation();

  function initAnimation() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var imagePath = "./sample.png";
    var image = new Image();
    image.src = imagePath;

    //set canvas width and height
    canvas.width = Number(window.innerWidth);
    canvas.height = 40;
    image.onload = function () {
      initDraw();
      loop();
    };

    var canvasEndX = canvas.width;
    var canvasEndY = canvas.height;
    var waveStartPoint = canvasEndY - 20;

    var amplitude = 20;
    var period = 600;
    var degree = 0;

    function initDraw() {
      imageSet(image, canvasEndX, canvasEndY);
      waveDrawing(
        waveStartPoint,
        canvasEndX,
        canvasEndY,
        degree,
        amplitude,
        period
      );
    }

    function loop() {
      setInterval(function () {
        imageSet(image, canvasEndX, canvasEndY);
        waveDrawing(
          waveStartPoint,
          canvasEndX,
          canvasEndY,
          degree,
          amplitude,
          period
        );
        degree += 12;
      }, 30);
    }

    function imageSet(imageObj, canvasEndX, canvasEndY) {
      var imgWidth = imageObj.width;
      var imgHeight = imageObj.height;

      ctx.globalCompositeOperation = "destination-over";
      ctx.drawImage(
        image,
        0,
        0,
        imgWidth,
        imgHeight,
        0,
        0,
        canvasEndX,
        canvasEndY
      );
    }

    function waveDrawing(waveStartPoint, canvasEndX, canvasEndY, deg, am, tp) {
      var waveStartY = waveStartPoint;
      ctx.globalCompositeOperation = "copy";

      ctx.beginPath();
      ctx.moveTo(0, waveStartY);

      for (var x = 0; x <= canvasEndX; x += 1) {
        var y = -am * Math.sin((Math.PI / tp) * (deg + x));
        ctx.lineTo(x, y + waveStartY);
      }

      ctx.lineTo(canvasEndX, canvasEndY);
      ctx.lineTo(0, canvasEndY);
      ctx.closePath();

      // ctx.fillStyle = "rgba(255,255,255,1)"; //opacity 1
      ctx.fillStyle = "#7fbec7";
      ctx.fill();
    }
  }
}

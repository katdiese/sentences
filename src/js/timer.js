$(document).ready(function() {
  $('#startGame').on('click', function() {
    var gameTime = 60 * 1.5,
        display = $('#time');
    startTimer(gameTime, display);


});

  var startTimer = function(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            // clearInterval(timer);
        }
    }, 1000);
}


});
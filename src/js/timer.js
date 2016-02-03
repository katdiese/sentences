var min;
var sec;
var time;
var timer;
$(document).ready(function() {


  $('#startGame').on('click', function() {
    beginCountdown();
    secondsPassed();

  });

  $('#restartGame').on('click', function() {
    restart();
  });

  function beginCountdown() {
    clearInterval(timer);
    min = 1;
    sec = 30;
    time = 1000 * 10;
    timer = setInterval(function() {tick()}, "1000");
    timerStop = setTimeout(function() {clearClock()}, time);
  }

  function restart() {
    clearTimeout(timerStop);
    beginCountdown();
  }


  function tick() {
    if(min || sec > 0) {
      if(sec > 0) {
        sec--;
      }
      else if (min > 0) {
        min--;
        sec = 59;
      }
    }
    if(sec >= 10) {
      $('#time').text(min + ": " + sec);
    }
    else if(sec < 10)
      $('#time').text(min + ": 0" + sec);
  }

  function clearClock() {
    window.clearInterval(timer);
    $('main').hide();
    $('#gameEnd').fadeIn();
  }

  function secondsPassed() {
    setInterval(function() {countDown()}, 1000);
  }

  function countDown() {
    var timeElapsed = time-= 1000;
    // console.log(timeElapsed);
  }


});
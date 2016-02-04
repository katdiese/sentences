var min;
var sec;
var time;
var timer;
$(document).ready(function() {

  var clockAudio = new Audio('../sounds/27086__daveincamas__mantelclockticks.wav');
  var dingAudio = new Audio('../sounds/23152__owlstorm__ding.wav');
  var startAudio = new Audio('../sounds/243020__plasterbrain__game-start.ogg')

  $('#startGame').on('click', function() {
    beginCountdown();
    secondsPassed();
    startAudio.play();
  });

  $('#restartGame').on('click', function() {
    clockAudio.pause();
    restart();
    beginCountdown();
  });

  function beginCountdown() {
    clearInterval(timer);
    min = 1;
    sec = 30;
    time = 1000 * 91;
    timer = setInterval(function() {tick()}, "1000");
    timerStop = setTimeout(function() {clearClock()}, time);
  }

  function restart() {
    clearTimeout(timerStop);
    // beginCountdown();
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
    setInterval(function() {lastScramble()}, 1000);
  }

  function lastScramble() {
    var timeElapsed = time-= 1000;
    if(timeElapsed === 10000) {
      clockAudio.play();
      setTimeout(function() { clockAudio.pause(); }, 10000);
    }
    else if(timeElapsed === 0) {
      dingAudio.play();
    }
    // console.log(timeElapsed);
  }


});
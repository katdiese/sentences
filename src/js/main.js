// add scripts

var score;
var easy;
var hard;
var shake;

var correctAudio = new Audio('../sounds/243701__ertfelda__correct.wav');
var nextAudio = new Audio('../sounds/128919__ecfike__click-2.wav')

$(document).on('ready', function() {


  $('input').on('checked', function(){
    console.log('checked');
  });

  buttons();
  getWords();
  // allRight();


});

function buttons() {
  $('#showRules').on('click', function() {
    $('.menu').toggle();
    $('.rules').fadeIn();
  });
  $('#menuReturn').on('click', function() {
    $('.rules').toggle();
    $('.menu').fadeIn();
  });
  $('#startGame').on('click', function() {
    $('.menu').hide();
    $('.gamePlay').show();
    $('#score').html("Score: 0");
    $('nav').show();
  });
  // $('#showMenu').on('click', function() {
  //   $('.gamePlay').hide();
  //   $('.menu').fadeIn();
  // });
  $('#showMenu').on('click', function() {
    location.reload();
  });
  $('#endRestart').on('click', function() {
    // $('#gameEnd').hide();
    // $('.menu').fadeIn();
    // $('#time').html("1:30");
    // $('#score').html("Score: 0");
    // $('body').removeClass('insanityBackground');
    location.reload();
  });
  $('#showMenu').on('click', function() {
    location.reload();
  });
}


function getWords() {
    $.ajax({
    url: 'data/data.json',
    method: 'GET'
  }).then(function(data) {
    var sentenceLength = 0;
    $('#startGame').on('click', function() {
      checkDifficultyLevel();
      score = 0;
      var thisSentence = findRandSentence(data);
      sentenceLength = thisSentence.length;
      console.log(sentenceLength);
      nextRound(thisSentence);
    });
    $('#next').on('click', function(){
      nextAudio.play();
      if(sentenceLength === $('.highlight').length || sentenceLength === $('.correct').length) {
        console.log(sentenceLength);
        console.log($('.correct').length);
        score+=sentenceLength;
        $('#finalScore').html(score);
        $('#score').html('Score: ' + score);
            }
      var nextSentence = findRandSentence(data);
      sentenceLength = nextSentence.length;
      nextRound(nextSentence);
    });
    $('#restartGame').on('click', function(){
      $('#wordbank').empty();
      $('#solution').empty();
      $('#time').html('1:30');
      var thisSentence = findRandSentence(data);
      nextRound(thisSentence);
    });
  });
}

//finds random sentence from data
function findRandSentence(data) {
  // console.log(data.sentences[16]);
  var length = data.sentences.length - 1;
  var randStr = Math.round(Math.random() * (length));
  var currSentence = data.sentences[randStr];
  console.log(currSentence);
  return currSentence.sentArr;
}

function checkDifficultyLevel() {
  if($('input:checked').val() === "easy") {
        console.log("easy checked!");
        easy = true;
        hard = false;
        shake = false;
      }
  else if($('input:checked').val() === "hard") {
        console.log("Hard checked!");
        hard = true;
        easy = false;
        shake = false;
      }
  else if($('input:checked').val() === "insanity") {
    hard = true;
    easy = false;
    shake = true;
  }
  else {
        easy = true;
        hard = false;
        console.log(easy);
      }
}


function scrambleSentence(sentence) {
  var sentLength = sentence.length -1;
  while(sentLength >= 0) {

    var randIndex = Math.round(Math.random() * sentLength);
    currDragClass = dragClass(sentence[randIndex]);
    $('#wordbank').append('<div class= "wordStyles" id= '+currDragClass+'><p>' + sentence[randIndex] + '</p></div>');
    $('.wordStyles').draggable();
    if(shake === true) {
      $('.wordStyles').addClass("shake-crazy shake-constant shake-constant--hover");
      $('body').addClass("insanityBackground");
    } else {
      $('.wordStyles').removeClass("shake-crazy shake-constant shake-constant--hover");
    }
    sentence.splice(randIndex, 1);
    sentLength--;
  }
  $('#wordbank').css('height', '100%');
}

function droppableInOrder(sentence) {
  // console.log(sentence);
  for(i = 0; i < sentence.length; i++) {
    currDropClass = dropClass(sentence[i]);
    currDropClassID = "#" + currDropClass;
    dragName = dragClass(sentence[i]);
    currDragClassID = "#" + dragName;
    $('#solution').append('<div class="dropStyles" id='+currDropClass+'></div>');
    $(currDropClassID).droppable({
      accept: currDragClassID,
      drop: function(event, ui) {
        if(easy) {
          $(this)
            .addClass('highlight');
          correctAudio.play();
          }
        else if(hard) {
          $(this)
            .addClass('correct');
          }
        }

    });
  }
  $('#solution').css('height', '100%');
}

function checkCorrect(checkSentence, highlightSentence, score) {
  if(checkSentence.length === highlightSentence.length) {
    score++;
    console.log(score);
  }
}

var dragClass = function(thisClass) {
  var noPunctuation = thisClass.replace(/[.?"',\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  return "drag-" + noPunctuation;
}

var dropClass = function(thisClass) {
  var noPunctuation = thisClass.replace(/[.?"',\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  return "drop-" + noPunctuation;
}


function nextRound(sentence) {
  $('#wordbank').empty();
  $('#solution').empty();
  droppableInOrder(sentence);
  scrambleSentence(sentence);
}
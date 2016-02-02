// add scripts

$(document).on('ready', function() {
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
  });
  $('#showMenu').on('click', function() {
    $('.gamePlay').hide();
    $('.menu').fadeIn();
  });
}

function getWords() {
    $.ajax({
    url: 'data/data.json',
    method: 'GET'
  }).then(function(data) {
    var sentenceLength = 0;
    var score = 0;
    $('#startGame').on('click', function() {
      var thisSentence = findRandSentence(data);
      sentenceLength = thisSentence.length;
      console.log(sentenceLength);
      nextRound(thisSentence);
    });
    $('#next').on('click', function(){
      if(sentenceLength == $('.highlight').length) {
        score+=sentenceLength;
        $('#score').html('Score: ' + score)
      }
      var nextSentence = findRandSentence(data);
      sentenceLength = nextSentence.length;
      nextRound(nextSentence);
    });
    $('#restartGame').on('click', function(){
      $('#wordbank').empty();
      $('#solution').empty();
      var thisSentence = findRandSentence(data);
      nextRound(thisSentence);
    });
    // $("#next").on('click', function() {
    //   checkCorrect(thisSentence);
    // });
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



function scrambleSentence(sentence) {
  var sentLength = sentence.length -1;
  while(sentLength >= 0) {

    var randIndex = Math.round(Math.random() * sentLength);
    currDragClass = dragClass(sentence[randIndex]);
    $('#wordbank').append('<div class= "wordStyles" id= '+currDragClass+'><p>' + sentence[randIndex] + '</p></div>');
    $('.wordStyles').draggable();
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
        $(this)
        .addClass('highlight');
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
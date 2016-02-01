// add scripts

$(document).on('ready', function() {
  buttons();
  getWords();


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
    console.log(length);
    $('button').on('click', function() {
      var thisSentence = findRandSentence(data);
      droppableInOrder(thisSentence);
      scrambleSentence(thisSentence);
    });
  });
}

//finds random sentence from data
function findRandSentence(data) {
  var length = data.sentences.length - 1;
  var randStr = Math.round(Math.random() * (length));
  var currSentence = data.sentences[randStr];
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
  console.log(sentence);
  for(i = 0; i < sentence.length; i++) {
    currDropClass = dropClass(sentence[i]);
    currDropClassID = "#" + currDropClass;
    dragName = dragClass(sentence[i]);
    currDragClassID = "#" + dragName;
    $('#solution').append('<div class="dropStyles" id='+currDropClass+'></div>');
    drop(currDragClassID, currDropClassID);
  }
  $('#solution').css('height', '100%');
}

var dragClass = function(thisClass) {
  var noPunctuation = thisClass.replace(/[.',\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  return "drag-" + noPunctuation;
}

var dropClass = function(thisClass) {
  var noPunctuation = thisClass.replace(/[.?',\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  return "drop-" + noPunctuation;
}


function drop(drag, dropClass) {
  console.log(drag, dropClass);

  $(dropClass).droppable({
  drop: function(event, ui) {
    $(this)
      .addClass("highlight")
      // .html("<p>dropped!</p>");
  }
});
}
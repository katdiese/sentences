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
      parseSentence(thisSentence);
    });
  });
}

function findRandSentence(data) {
  var length = data.sentences.length - 1;
  var randStr = Math.round(Math.random() * (length));
  var currSentence = data.sentences[randStr];
  return currSentence.sentArr;
}

function parseSentence(sentence) {
  var sentLength = sentence.length -1;
  while(sentLength >= 0) {
    var randIndex = Math.round(Math.random() * sentLength);
    $('#wordbank').append("<div class='wordStyles'><p>" + sentence[randIndex] + "</p></div>");
    sentence.splice(randIndex, 1);
    sentLength--;
  }
}
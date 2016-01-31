// add scripts

$(document).on('ready', function() {
  buttons();
  hoverChoice();


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
    var length = data.sentences.length - 1;
    console.log(length);
    $('button').on('click', function() {
      // data.sentences.length;
      var randStr = Math.round(Math.random() * (length));
      var currSentence = data.sentences[randStr];


      for(i = 0; i < currSentence.sentArr.length; i++) {
        var length2 = currSentence.sentArr.length - 1;
        var randArr1 = Math.round(Math.random() * length2);
        $('#wordbank').append("<p>" + currSentence.sentArr[randArr1] + "</p>");
        data.sentences.sentArr.splice(randStr1,1);
      }
      data.sentences.splice(randStr, 1);
      console.log(data.sentences.length);
      length = length-1;
    });
  });
}
// ajax request function
function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

//append loading gif function
function loadingGif(id) {
  var styles = '<div id="loader"><img src="ass/img/loader.gif" alt="loading..."></div>';
  return $(id).html(styles);
}

function adjustScore(score1, score2) {
  switch (true) {
    case score === score2:
      player1score++;
      player2score++;
    case score > score2:
      player1score++;
    case score < score2:
      player2score++;
  }
}

function setCharAt(str,index,chr) {
  if(index > str.length-1) {return str;}
  return str.substr(0,index) + chr + str.substr(index+1);
}

//audio events function
function audioEvents() {
  $('.glyphicon-volume-off').on('click', function(){
    $('.audio').prop("volume", 0);
  });

  $('.glyphicon-volume-up').on('click', function(){
    $('.audio').prop("volume", 1);
  });
}

//bullethole timings
function appendBullets(id){
  var bullet = '<img src="ass/img/bullethole.png"></img>';
  return $(id).html(bullet);
}

//compare vals and append bullets
function compareBullets(val1, val2, id, id2){
  if (val1 < val2) {
    appendBullets(id);
  } else {
    appendBullets(id2);
  }
}

// ajax request function
function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

// split string function
function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

//audio events function
function audioEvents() {

  //audio off button event
  $('.glyphicon-volume-off').on('click', function(){
    $('.audio').prop("volume", 0);});

    //audio on button event
    $('.glyphicon-volume-up').on('click', function(){
      $('.audio').prop("volume", 1);
    }
  );
}

//play audio
function playAudio(audio) {
  return audio.play();
}

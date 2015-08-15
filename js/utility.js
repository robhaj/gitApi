// ajax request function
function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}


//append repo,followers,following,accountc
// function appendInfo(fullname,profileurl){
//   var outhtml = '<table class="table"><thead><tr><th><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username1+'</a>)</span></h2></th></tr></thead>';
//   outhtml = outhtml + '<tbody><tr><td><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username1+'"></a></td></tr>';
//   outhtml = outhtml + '<tr><td>Followers:</td><td> '+followersnum+'</td><td id="followers"></td></tr><tr><td>Following:</td><td>'+followingnum+'</td><td id="following"></td></tr><tr><td>Repos:</td><td>'+reposnum+'</td><td id="repos"></td></tr>';
//   outhtml = outhtml + '<tr><td>Location:</td><td> '+location+'</td><td id="location"></td></tr>';
//   outhtml = outhtml + '<tr><td>Account created:</td><td>'+splitStamp+'</td><td id="start"></td></tr>';
//     return outhtml;
// }

//append loading gif function
function loadingGif(id) {
  var styles = '<div id="loader"><img src="css/loader.gif" alt="loading..."></div>';
  return $(id).html(styles);
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

//bullethole timings
function appendBullets(id){
  setTimeout(function(){
    var bullet = '<img src="img/bullethole.png"></img>';
    return $(id).html(bullet);
  }, 3000);

}

//compare vals and append bullets
function compareBullets(val1, val2, id, id2){
  if (val1 > val2) {
    appendBullets(id);
  } else {
    appendBullets(id2);
  }
}

//play audio
function playAudio(audio) {
  return audio.play();
}

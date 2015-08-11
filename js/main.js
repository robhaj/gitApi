// split string function
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

$(function(){

  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    var username = $('#ghusername').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';

    requestJSON(requri, function(json) {

      if(json.message == "Not Found" || username === '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      } else {

        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;

        if(fullname === undefined) { fullname = username; }

        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        outhtml = outhtml + '<p>Location: '+location+'</p>';

        var repositories;

        $.getJSON(repouri, function(json){
          repositories = json;
          outputPageContent();
        });

        //outputs content
        function outputPageContent() {
          if(repositories.length === 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
          }
          $('#ghapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler

  $('#ghcodesearch').on('click', function(e){
    e.preventDefault();
    $('#search-results').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    var language = $('#user-language').val();
    var username = $('#ghusername').val();
    var searchTerm = $('#searchTerm').val();
    var codeSearch  = 'https://api.github.com/search/code?q='+searchTerm+'in:file+language:'+language+'+user:'+username;

    requestJSON(codeSearch, function(json) {
      var path = json.items[0].html_url;
        path = setCharAt(path,7,'/raw.');
        path = setCharAt(path,17, 'busercontent');
        path = path.replace('blob/', '');
        $.ajax({
          url:path,
          success: function(data) {
            $('#search-results').html("Code: "+data);
          }
        });
    });
  });
});

// //ajax request function
function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

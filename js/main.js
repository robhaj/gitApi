//main function
$(function(){

  //player 1
  //open click handler
  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();

    //loading gif
    $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
    $('#ghapidata2').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    //cache api urls and usernames
    var username1 = $('#ghusername1').val();
    var username2 = $('#ghusername2').val();
    var requri1   = 'https://api.github.com/users/'+username1;
    var requri2   = 'https://api.github.com/users/'+username2;
    var repouri1  = 'https://api.github.com/users/'+username1+'/repos';
    var repouri2  = 'https://api.github.com/users/'+username2+'/repos';

    //make ajax request1
    requestJSON(requri1, function(json) {
      //validation
      if(json.message == "Not Found" || username1 === '') {
        $('#ghapidata').html("<h2>One or more of the users were not found!</h2>");

        // else we have a user and we display their info
      } else {

        var fullname   = json.name;
        var username1   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;

        //default name
        if(location === '' || location === 'undefined') {location = "Unknown";}
        if(fullname === undefined)
        fullname = username1;

        //structure output
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username1+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username1+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        outhtml = outhtml + '<p>Location: '+location+'</p>';

        //repo list
        var repositories;

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

        }

        $.getJSON(repouri1, function(json){
          repositories = json;
          outputPageContent();
        });

        requestJSON(requri2, function(json) {

          if(json.message == "Not Found" || username2 === '') {
            $('#ghapidata').html("<h2>One or more of the users were not found!</h2>");

          } else {
            // else we have a user and we display their info
            var fullname   = json.name;
            var username2   = json.login;
            var aviurl     = json.avatar_url;
            var profileurl = json.html_url;
            var location   = json.location;
            var followersnum = json.followers;
            var followingnum = json.following;
            var reposnum     = json.public_repos;

            if(location === '' || location === undefined) {location = "Unknown";}
            if(fullname === undefined) { fullname = username2; }

            var outhtml2 = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username2+'</a>)</span></h2>';
            outhtml2 = outhtml2 + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username2+'"></a></div>';
            outhtml2 = outhtml2 + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
            outhtml2 = outhtml2 + '<div class="repolist clearfix">';
            outhtml2 = outhtml2 + '<p>Location: '+location+'</p>';

            var repositories2;



            function outputPageContent2() {
              if(repositories2.length === 0) { outhtml2 = outhtml2 + '<p>No repos!</p></div>'; }
              else {
                outhtml2 = outhtml2 + '<p><strong>Repos List:</strong></p> <ul>';
                $.each(repositories2, function(index) {
                  outhtml2 = outhtml2 + '<li><a href="'+repositories2[index].html_url+'" target="_blank">'+repositories2[index].name + '</a></li>';
                });
                outhtml2 = outhtml2 + '</ul></div>';
              }

              $('#ghapidata2').html(outhtml2);

            }//end outputPageContent2

            $.getJSON(repouri2, function(json){
              repositories2 = json;
              outputPageContent2();
            });
          } // end else statement
        }); // end requestJSON Ajax call
      }//else end
    });//end ajax call

    //api to raw url modification

    // requestJSON(codeSearch, function(json) {
    //   var path = json.items[0].html_url;
    //     path = setCharAt(path,7,'/raw.');
    //     path = setCharAt(path,17, 'busercontent');
    //     path = path.replace('blob/', '');
    //     $.ajax({
    //       url:path,
    //       success: function(data) {
    //         $('#search-results').html("Code: "+data);
    //       }
    //     });
    // });

  });//end event handler
});//end main function




// split string function
function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}


// reusable ajax request function
function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

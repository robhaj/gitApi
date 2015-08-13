//main function
$(function(){

  audioEvents();

  //open click handler
  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();

    var audio = $(".colt")[0];    //api to raw url modification
    audio.play();

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

    //player 1
    //make ajax request1
    requestJSON(requri1, function(json) {

      //validation
      if(json.message === "Not Found" || username1 === '') {
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
        var outhtml = '<table class="table"><thead><tr><th><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username1+'</a>)</span></h2></th></tr></thead>';
        outhtml = outhtml + '<tbody><tr><td><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username1+'"></a></td></tr>';
        outhtml = outhtml + '<tr><td>Followers:</td><td> '+followersnum+'</td><td id="followers"></td></tr><tr><td>Following:</td><td>'+followingnum+'</td><td id="following"></td></tr><tr><td>Repos:</td><td>'+reposnum+'</td><td id="repos"></td></tr>';
        // outhtml = outhtml + '<div class="repolist clearfix">';
        outhtml = outhtml + '<tr><td>Location:</td><td> '+location+'</td><td id="location"></td></tr></tbody></table>';

        //outputs content1
        function outputPageContent() {

          // if(repositories.length === 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          // else {
          //   outhtml = outhtml + '<p><strong>5 Random Repos:</strong></p> <ul>';
          //   for (index=0;index<5;index++) {
          //     outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
          //   }
          // }
          // outhtml = outhtml + '</ul></div>';

          $('#ghapidata').html(outhtml);
        }

        // var repositories;

        //repo list json
        $.getJSON(repouri1, function(json){
          repositories = json;
          outputPageContent();
        });

        //player 2
        requestJSON(requri2, function(json) {

          //validation
          if(json.message == "Not Found" || username2 === '') {
            $('#ghapidata').html("<h2>One or more of the users were not found!</h2>");

          } else {
            // else we have a user and we display their info
            var fullname   = json.name;
            var username2   = json.login;
            var aviurl     = json.avatar_url;
            var profileurl = json.html_url;
            var location   = json.location;
            var followersnum2 = json.followers;
            var followingnum2 = json.following;
            var reposnum2     = json.public_repos;

            //validation
            if(location === '' || location === undefined) {location = "Unknown";}
            if(fullname === undefined) { fullname = username2; }

            //styling player 2 output
            var outhtml2 = '<table class="table"><thead><tr><th><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username2+'</a>)</span></h2></th></tr></thead>';
            outhtml2 = outhtml2 + '<tbody><tr><td><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username2+'"></a></td></tr>';
            outhtml2 = outhtml2 + '<tr><td>Followers:</td><td>'+followersnum2+'</td><td id="followers2"></td></tr><tr><td>Following:</td><td> '+followingnum2+'</td><td id="following2"</tr><tr><td>Repos:</td><td> '+reposnum2+'</td><td id="repos2"></td></tr>';
            // outhtml2 = outhtml2 + '<div class="repolist clearfix">';
            outhtml2 = outhtml2 + '<tr><td>Location:</td><td> '+location+'</td><td id="location2"></td></tr>';


            // var repositories2;

            //outputs content 2
            function outputPageContent2() {
              // if(repositories2.length === 0) { outhtml2 = outhtml2 + '<p>No repos!</p></div>'; }
              // else {
              //   outhtml2 = outhtml2 + '<tr><td><strong>5 Random Repos:</strong></td></tbody></table>';
              //     for (index=0;index<5;index++) {
              //     outhtml2 = outhtml2 + '<td><a href="'+repositories2[index].html_url+'" target="_blank">'+repositories2[index].name + '</a></td>';
              //   }
              // }
              // outhtml2 = outhtml2 + '</ul></div>';
              $('#ghapidata2').html(outhtml2);

              if (followingnum > followingnum2){
                $('#following').html('X');}
                else {
                  $('#following2').html('X');
                }

                if (followersnum > followersnum2){
                  $('#followers').html('X');}
                  else {
                    $('#followers2').html('X');
                  }

                  if (reposnum > reposnum2){
                    $('#repos').html('X');}
                    else {
                      $('#repos2').html('X');
                    }

                  }//end outputPageContent2
                  $.getJSON(repouri2, function(json){
                    repositories2 = json;
                    outputPageContent2();
                  });

                } // end else statement
              }); // end requestJSON Ajax call
            }//else end
          });//end ajax call


          // github api code search request

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

          $.ajax({
            url: 'https://api.githunt.io/programmingexcuses',
            success: function(data) {
              console.log(data);
            }
          });
        });//end event handler
      });//end main function






      //reusable functions

      // split string function
      function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
      }

      // ajax request function
      function requestJSON(url, callback) {
        $.ajax({
          url: url,
          complete: function(xhr) {
            callback.call(null, xhr.responseJSON);
          }
        });
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

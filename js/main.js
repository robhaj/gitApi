$(document).ready(function(){
  //audio controls
  audioEvents();
});

$(function(){

  //open click handler
  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();

    //gunshot sounds on click
    playAudio($(".colt")[0]);

    //loading gif
    loadingGif('#ghapidata');
    loadingGif('#ghapidata2');

    //cache api urls and usernames
    var userUrl='https://api.github.com/users/';
    var username1 = $('#ghusername1').val();
    var username2 = $('#ghusername2').val();
    var requri1   = userUrl+username1;
    var requri2   = userUrl+username2;
    var repouri1  = userUrl+username1+'/repos';
    var repouri2  = userUrl+username2+'/repos';

    //make ajax request1
    requestJSON(requri1, function(json) {

      //validation for if invalid/no username
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
        var start = json.created_at;

        //format timestamp
        var splitStamp = start.split('T')[0];
        var timeCompare = setCharAt(splitStamp, 4, '');
        timeCompare = setCharAt(timeCompare, 6, '');

        //name/location validation
        if(location === '' || location === 'undefined') {location = "Unknown";}
        if(fullname === undefined || fullname ==='null')
        fullname = username1;

        //structure output
        var outhtml = '<table class="table"><thead><tr><th><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username1+'</a>)</span></h2></th></tr></thead>';
        outhtml = outhtml + '<tbody><tr><td><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username1+'"></a></td></tr>';
        outhtml = outhtml + '<tr><td>Followers:</td><td> '+followersnum+'</td><td id="followers"></td></tr><tr><td>Following:</td><td>'+followingnum+'</td><td id="following"></td></tr><tr><td>Repos:</td><td>'+reposnum+'</td><td id="repos"></td></tr>';
        outhtml = outhtml + '<tr><td>Location:</td><td> '+location+'</td><td id="location"></td></tr>';
        outhtml = outhtml + '<tr><td>Account created:</td><td>'+splitStamp+'</td><td id="start"></td></tr>';

        //outputs content1
        function outputPageContent() {

          if(repositories.length === 0) { outhtml = outhtml + '<p>No repos!</p>'; }
          else {
            var rand = Math.floor(Math.random() * (repositories.length));
            var randRepo = repositories[rand];
            var url = randRepo.html_url;
            var rname = randRepo.name;
            var descrip = randRepo.description;
            var language = randRepo.language;
            var stargazers = randRepo.stargazers_count;

            //add random repo header to table
            outhtml = outhtml + '<tr><td>Random Repo:</td><td id ="randRepo"><a href='+url+'>'+rname+'</a></td></tr>';
            outhtml = outhtml + '<tr><td>Stargazers:</td><td id=starGazers1>'+stargazers+'</td></tr>';

            //no repo description conditional
            if (descrip === '') {
              descrip = "No description";
            }

            //add randRepo description to table
            outhtml = outhtml + '<tr><td>Description:</td><td id="description">'+descrip+'</td></tr>';
            outhtml = outhtml + '<tr><td>Language:</td><td id="language">'+language+'</td></tr>';

          }

          //append player 1
          $('#ghapidata').html(outhtml);
        }

        var repositories;

        //repolist1 json
        $.getJSON(repouri1, function(json){
          repositories = json;
          outputPageContent();
        });

        //make ajax request 2
        requestJSON(requri2, function(json) {

          //validation for if invalid/no username
          if(json.message == "Not Found" || username2 === '') {
            $('#ghapidata').html("<h2>One or more of the users were not found!</h2>");

          } else {

            // else we have a user and we display their info
            var fullname   = json.name;
            var username2   = json.login;
            var aviurl     = json.avatar_url;
            var profileurl = json.html_url;
            var location2   = json.location;
            var followersnum2 = json.followers;
            var followingnum2 = json.following;
            var reposnum2     = json.public_repos;
            var start2 = json.created_at;

            //format timestamp
            var splitStamp2 = start2.split('T')[0];
            var timeCompare2 = setCharAt(splitStamp2,4,"");
            timeCompare2 = setCharAt(timeCompare2, 6, "");

            //location and username validation
            if(location2 === '' || location2 === undefined) {location = "Unknown";}
            if(fullname === undefined || fullname === null) {
              fullname = username2; }

              //styling player 2 output
              var outhtml2 = '<table class="table"><thead><tr><th><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username2+'</a>)</span></h2></th></tr></thead>';
              outhtml2 = outhtml2 + '<tbody><tr><td><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username2+'"></a></td></tr>';
              outhtml2 = outhtml2 + '<tr><td>Followers:</td><td>'+followersnum2+'</td><td id="followers2"></td></tr><tr><td>Following:</td><td> '+followingnum2+'</td><td id="following2"</tr><tr><td>Repos:</td><td> '+reposnum2+'</td><td id="repos2"></td></tr>';
              outhtml2 = outhtml2 + '<tr><td>Location:</td><td> '+location2+'</td><td id="location2"></td></tr>';
              outhtml2 = outhtml2 + '<tr><td>Account created:</td><td>'+splitStamp2+'</td><td id="start2"></td></tr>';


              //outputs content 2
              function outputPageContent2() {

                if(repositories2.length === 0) { outhtml2 = outhtml2 + '<p>No repos!</p></div>'; }
                else {
                  var rand2 = Math.floor(Math.random() * (repositories2.length));
                  var randRepo2 = repositories2[rand2];
                  var url2 = randRepo2.html_url;
                  var rname2 = randRepo2.name;
                  var descrip2 = randRepo2.description;
                  var language2 = randRepo2.language;
                  var stargazers2 = randRepo2.stargazers_count;

                  if (descrip2 === '')
                  descrip2 = "No description";

                  outhtml2 = outhtml2 + '<tr><td>Random Repo:</td><td id ="randRepo2"><a href='+url2+'>'+rname2+'</a></td></tr>';
                  outhtml2 = outhtml2 + '<tr><td>Stargazers:</td><td>'+stargazers2+'</td><td id=starGazers2></td></tr>';
                  outhtml2 = outhtml2 + '<tr><td>Description:</td><td id="descrip2">'+descrip2+'</td>';
                  outhtml2 = outhtml2 + '<tr><td>Language:</td><td id="language2">'+language2+'</td></tr>';
                }

                //append player 2
                $('#ghapidata2').html(outhtml2);

                //set starting score
                var pscore = 0;
                var pscore2 = 0;

                //compare and append bullet img
                compareBullets(followingnum, followingnum2, '#following', '#following2');
                compareBullets(followersnum, followersnum2, '#followers', '#followers2');
                compareBullets(reposnum, reposnum2, '#repos', '#repos2');
                compareBullets(timeCompare2, timeCompare, '#start', '#start2');

                if (location === '' || location === 'null')
                appendBullets('#location2');

                if (location2 === '' || location2 === 'null' || location2 === 'null' || location2 === "undefined")
                appendBullets('#location');

              }//end outputPageContent2

              $.getJSON(repouri2, function(json){
                repositories2 = json;
                outputPageContent2();
              });

            } // end else statement
          }); // end requestJSON Ajax call
        }//else end
      });//end ajax call
    });//end event handler
  });//end main function

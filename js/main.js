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
        var start4 = start.split('T')[0];
        var datcompare = setCharAt(start4,4, '');
        datcompare = setCharAt(datcompare, 6, '');

        //name/location validation
        if(location === '' || location === 'undefined') {location = "Unknown";}
        if(fullname === undefined)
        fullname = username1;

        //structure output
        var outhtml = '<table class="table"><thead><tr><th><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username1+'</a>)</span></h2></th></tr></thead>';
        outhtml = outhtml + '<tbody><tr><td><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username1+'"></a></td></tr>';
        outhtml = outhtml + '<tr><td>Followers:</td><td> '+followersnum+'</td><td id="followers"></td></tr><tr><td>Following:</td><td>'+followingnum+'</td><td id="following"></td></tr><tr><td>Repos:</td><td>'+reposnum+'</td><td id="repos"></td></tr>';
        outhtml = outhtml + '<tr><td>Location:</td><td> '+location+'</td><td id="location"></td></tr>';
        outhtml = outhtml + '<tr><td>Account created:</td><td>'+start4+'</td><td id="start"></td></tr>';

        //outputs content1
        function outputPageContent() {

          if(repositories.length === 0) { outhtml = outhtml + '<p>No repos!</p>'; }
          else {
            var rand = Math.floor(Math.random() * (repositories.length));
            var url = repositories[rand].html_url;
            var rname = repositories[rand].name;
            var descrip = repositories[rand].description;
            outhtml = outhtml + '<tr><td>Random Repo:</td><td id ="randRepo"><a href='+url+'>'+rname+'</a></td></tr>';
            // outhtml = outhmtl + '<tr><td>Description:</td><td id="description">'+descrip+'</td></tr>';
          }
          $('#ghapidata').html(outhtml);
        }

        var repositories;

        //repolist1 json
        $.getJSON(repouri1, function(json){
          repositories = json;
          outputPageContent();
        });

        //player 2
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
            var start3 = start2.split('T')[0];
            var datcompare2 = setCharAt(start3,4,"");
            datcompare2 = setCharAt(datcompare2, 6, "");

            //validation
            if(location === '' || location === undefined) {location = "Unknown";}
            if(fullname === undefined) { fullname = username2; }

            //styling player 2 output
            var outhtml2 = '<table class="table"><thead><tr><th><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username2+'</a>)</span></h2></th></tr></thead>';
            outhtml2 = outhtml2 + '<tbody><tr><td><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username2+'"></a></td></tr>';
            outhtml2 = outhtml2 + '<tr><td>Followers:</td><td>'+followersnum2+'</td><td id="followers2"></td></tr><tr><td>Following:</td><td> '+followingnum2+'</td><td id="following2"</tr><tr><td>Repos:</td><td> '+reposnum2+'</td><td id="repos2"></td></tr>';
            outhtml2 = outhtml2 + '<tr><td>Location:</td><td> '+location2+'</td><td id="location2"></td></tr>';
            outhtml2 = outhtml2 + '<tr><td>Account created:</td><td>'+start3+'</td><td id="start2"></td></tr>';

            var repositories2;

            //outputs content 2
            function outputPageContent2() {

              if(repositories2.length === 0) { outhtml2 = outhtml2 + '<p>No repos!</p></div>'; }
              else {
                var rand2 = Math.floor(Math.random() * (repositories2.length));
                var url2 = repositories2[rand2].html_url;
                var rname2 = repositories2[rand2].name;
                var descrip2 = repositories2[rand2].description;
                if (descrip2 === '') {
                  console.log(descrip2);
                }
                console.log(repositories2[rand2].description);
                outhtml2 = outhtml2 + '<tr><td>Random Repo:</td><td id ="randRepo2"><a href='+url2+'>'+rname2+'</a></td></tr>';
                outhtml2 = outhtml2 + '<tr><td>Description:</td><td id="descrip2">'+descrip2+'</td>';
              }

              $('#ghapidata2').html(outhtml2);

              //set starting score
              var pscore = 0;
              var pscore2 = 0;

              //scoring conditionals
              if (followingnum > followingnum2){
                $('#following').html('<img src="img/bullethole.png"></img>');
                pscore++;

              } else {
                $('#following2').html('<img src="img/bullethole.png"></img>');
                pscore2++;
              }

              if (followersnum > followersnum2){
                $('#followers').html('<img src="img/bullethole.png"></img>');
                pscore++;

              } else {
                $('#followers2').html('<img src="img/bullethole.png"></img>');
                pscore2++;
              }

              if (reposnum > reposnum2){
                $('#repos').html('<img src="img/bullethole.png"></img>');
                pscore++;

              } else {
                $('#repos2').html('<img src="img/bullethole.png"></img>');
                pscore2++;
              }

              if (location === '' || location === 'null') {
                $('#location2').html('<img src="img/bullethole.png"></img>');
                pscore2++;
              }

              if (location2 === '' || location2 === 'null' || location2 === null || location2 === "undefined") {
                $('#location').html('<img src="img/bullethole.png"></img>');
                pscore++;
              }

              if (datcompare < datcompare2) {
                $('#start').html('<img src="img/bullethole.png"></img>');
                pscore++;

              } else {
                $('#start2').html('<img src="img/bullethole.png"></img>');
                pscore2++;
              }

              $.ajax({
                url: 'https://api.githunt.io/programmingexcuses',
                success: function(data) {
                  if (pscore > pscore2) {
                    console.log(("Player2 says: "+data));
                  } else {
                    console.log(("Player1 says: "+data));
                  }
                }
              });

              if (pscore > pscore2) {
                console.log('player 1 wins');
              } else
              console.log('player 2 wins');

            }//end outputPageContent2

            //get second repolist json
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

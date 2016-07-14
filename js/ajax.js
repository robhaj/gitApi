  // code search ajax request

  $.ajax({
    url:path,
    success: function(data) {
      $('#search-results').html("Code: "+data);
    }
  });

  //grab github url for matching code
  // requestJSON('https://api.github.com/users?since=135',
  // function(json) {
  //   var path = json.items[rand2].html_url;
  //   // change to rawdata url
  //   path = setCharAt(path,7,'/raw.');
  //   path = setCharAt(path,17, 'busercontent');
  //   path = path.replace('blob/', '');
  // });

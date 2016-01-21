var request = require('request');
var cheerio = require('cheerio');
var gs = require('github-scraper'); // require the module
var url = 'nelsonic/followinfdfsg?page=3'; // a random dude
gs(url, function(err, data) {
  console.log(jsonp.data); // or what ever you want to do with the data
});

// dependencies
var express = require('express');
var request=require("request");
var cheerio=require("cheerio");
var app = express();


// perfrom request
app.get('/scrape/:user', function(req, res){

  url = 'https://github.com/'+req.params.user;

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // pass DOM to cheerio
      var $ = cheerio.load(html);
      console.log($);
      var streak = ($('.text-muted').last().text());
      res.jsonp({ data: streak });
    }
  });
});

app.listen('8082');
console.log('Magic happens on port 8081');
exports = module.exports = app;

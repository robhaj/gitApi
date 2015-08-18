var request = require('request');
var cheerio = require('cheerio');

    var url = 'https://github.com/robhaj';

    request(url, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        console.log($('.text-muted').last().text());
      }
    });

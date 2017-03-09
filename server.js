var express = require("express");
var request = require('request');

var app = express();

var PORT = 8000;

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

function getArticles(query, page) {
  query = query || 'refugee';
  page = page || 0;
  var articles = [];
  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': "fa3d1b231c1e42149ce9c29c797c6457",
      'q': query,
      'page': page
    },
  }, function(err, res, body) {
    body = JSON.parse(body);
    var docs = body.response.docs;
    docs.forEach((doc) => {
      for(kw in doc.keywords) {
        var keep = true;
        if (doc.keywords[kw].name === 'glocations') {

          var image;
          if (doc.multimedia.length > 0) {
            image = 'http://www.nytimes.com/' + doc.multimedia[0].url
          }
          var article = {
            url: doc.web_url,
            snippet: doc.lead_paragraph,
            source: doc.source,
            title: doc.headline.main,
            pubDate: doc.pub_date,
            image: image,
            location: doc.keywords[kw].value
          }
          articles.push(article);
          break;
        } 
      }
    })
  })
  return articles;
}

app.get('/articles', function(req, res) {
  var articles = getArticles();
  setTimeout(function() {
  res.status(200).send(articles);
  }, 1000)
})

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

app.use(function(req, res, next) {
	res.status(404);
	res.send("404 Error - File Not Found");
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Error - Server Error");
});


app.listen(PORT, function() {
	console.log("Listening on port " + PORT);
});

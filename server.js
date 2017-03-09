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

function getArticles(query) {
  query = query || 'refugee'
  var articles = [];
  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': "fa3d1b231c1e42149ce9c29c797c6457",
      'q': query
    },
  }, function(err, res, body) {
    body = JSON.parse(body)
    docs = body.response.docs
    docs.forEach((doc) => {
      var image;
      if (doc.multimedia.length > 0) {
        image = 'http://www.nytimes.com/' + doc.multimedia[0].url
      }
      var keywords = [];
      for (keyword in doc.keywords) {
        console.log(doc.keywords[keyword].value)
        keywords.push(doc.keywords[keyword].value);
      }
      var article = {
        url: doc.web_url,
        snippet: doc.lead_paragraph,
        source: doc.source,
        title: doc.headline.main,
        pubDate: doc.pub_date,
        image: image,
        keywords: keywords
      }
      articles.push(article);
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
// app.use(express.static("joey"));

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

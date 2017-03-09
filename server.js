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


app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

request.get({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  qs: {
    'api-key': "fa3d1b231c1e42149ce9c29c797c6457",
    'q': "refugee"
  },
}, function(err, res, body) {
  body = JSON.parse(body)
  articles = [];
  docs = body.response.docs
  docs.forEach((doc) => {
    var article = {
      url: doc.web_url,
      snippet: doc.lead_paragraph,
      source: doc.source,
      title: doc.headline.main,
      pubDate: doc.pub_date,
      images: doc.multimedia.find((i) => {
        if (i.type === 'image') {
          return i.url;
        }
      })
    }
    console.log(article);
  })

})

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

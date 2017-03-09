

var express = require("express");

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

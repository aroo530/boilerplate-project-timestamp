// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/:input", function (req, res) {
  const input = req.params.input;
  // I could create a date object now but I wanted to make the code a bit more symmetrical
  let tempDate;
  if (new Date(input) != "Invalid Date") {
    tempDate = new Date(input);
    res.json({
      unix: new Date(tempDate).getTime(),
      utc: new Date(tempDate).toUTCString(),
    });
  } else if (new Date(parseInt(input) != "Invalid Date")) {
    tempDate = new Date(parseInt(input));
    res.json({
      unix: new Date(parseInt(input)).getTime(),
      utc: new Date(parseInt(input)).toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

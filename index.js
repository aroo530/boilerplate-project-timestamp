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
app.get("/api", (_req, res) => {
  tempDate = new Date();
  res.json({
    unix: tempDate.getTime(),
    utc: tempDate.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  if (Number.isInteger(Number(date))) {
    tempDate = new Date(parseInt(date));
    console.log("date is unix");
    res.json({
      unix: new Date(parseInt(date)).getTime(),
      utc: new Date(parseInt(date)).toUTCString(),
    });
    //compare input to regex
  } else if (/\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/.test(date)) {
    tempDate = new Date(date);
    console.log("input is utc");
    res.json({
      unix: tempDate.getTime(),
      utc: tempDate.toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

// app.get("/api/:input", (_req, res) => {
//   const input = _req.params.input;
//   // I could create a date object now but I wanted to make the code a bit more symmetrical
//   let tempDate;
//   if (new Date(input) != "Invalid Date") {
//     console.log("first if");
//     tempDate = new Date(input);
//     res.json({
//       unix: new Date(tempDate).getTime(),
//       utc: new Date(tempDate).toUTCString(),
//     });
//   } else {
//     res.json({
//       error: "Invalid Date",
//     });
//   }
// });

// listen for requests :)
//process.env.PORT
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

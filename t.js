var qs = require("querystring");
var http = require("http");

var options = {
  "method": "POST",
  "hostname": "localhost",
  "port": "5000",
  "path": "/api/vivly",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "postman-token": "9d8ed6db-0f19-2ae5-a451-831dbe684ce1"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ genre: 'action' }));
req.end();
require("./database");

const cron = require("node-cron");
const express = require("express");
const app = express();
const Model = require("./Model");
var http = require("https");
var port = 4000;
var options = {
  host: "hn.algolia.com",
  path: "/api/v1/search_by_date?query=nodejs",
  method: "GET"
};

cron.schedule("* * * * 1", function () {
  console.log("Running Cron Job call Node WS");
  http
    .request(options, function (res) {
      res.setEncoding("utf8");
      var data = "";
      res
        .on("data", function (chunk) {
          data += chunk;
        })
        .on("end", function () {
          var response = null;
          response = JSON.parse(data);
          const model = new Model(response);
          model.save();
        })
        .on("error", function (err) {
          console.error("Error al procesar el mensaje: " + err);
        })
        .on("uncaughtException", function (err) {
          console.error(err);
        });
    })
    .end();
});
app.listen("3128");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/models", (req, res) => {
  Model.find({}, function (err, users) {
    var userMap = {};
  //  users.forEach(function (user) {
    //  userMap[user._id] = user;
  //  });
    res.send(users);
  });
});
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
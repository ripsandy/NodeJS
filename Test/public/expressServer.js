var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tiger",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO nodes VALUES ('NODE', 'ALWAYS', 'SUCKS')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/endpoint', function (req, res) {
  res.send(200);
  });
  
  app.post('/endpoint', function (req, res) {
  console.log(res);
  var data = bodyParser.json(res);
  consolse.log(data);
  });
app.listen(3000);
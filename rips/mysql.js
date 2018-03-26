var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tiger",
  database: "nodedb"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

var sql = "DELETE FROM nodes WHERE Title = 'B';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: ");
  });
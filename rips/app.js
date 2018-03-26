var express = require("express");
var app = express();
bodyparser = require("body-parser");
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
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ type: "application/json" }));

app.post("/login", function (req, res) {

    // res.send("req.body");
    console.log(req.body);
    console.log(req.body.author);
   

    var sql = "INSERT INTO nodes VALUES ('" + req.body.author + "', '" + req.body.title + "', '" + req.body.body + "');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Record inserted");
        res.send(result);
       
    });

});

app.post("/delta", function (req, res) {

    res.send();
    console.log(req.body);
    console.log(req.body.author);

    var sql = "DELETE FROM nodes WHERE Author = '" + req.body.author + "';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
});

app.post("/ret", function (req, res) {

    // res.send();
    console.log(req.body);
    console.log(req.body.author);

    var sql = "SELECT * FROM nodes where Author = '"+ req.body.author +"';";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        JSON.stringify(result)
        console.log(result);
        res.send(result[0]);
    });

});

app.get('/test', function (req, res) {
    conn.query('select * from nodes', function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
            console.log("Mission Successfull");
        } else {
            response.send(results);
            console.log("Mission Successfull");
        }
    });
})

// app.get('/login', function (req, res) {
//     res.send(req.body);
// })

app.get('/test/:user', function (req, res) {
    res.send('Hello ' + req.params.user);
})

app.listen(3000, function () {
    console.log("server running at port 3000");
});


   var express = require('express');
   var bodyParser = require('body-parser');
   var mysql = require('mysql');
   var app = express();

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(express.static('public'));

  var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tiger',
  database: 'nodedb'
   });
   connection.connect();
   if(connection.connect())
   {console.log("Yo Man");}
else
{console.log("No Man");}

    app.post('/blah', function(req, res, next) {
    var cope = req.body.params;
    console.log('request received:', req.body);
   var query = connection.query('insert into nodes set ?', cope, function (err,     result) {
    if (err) {
        console.error(err);
        return res.send(err);
    } else {
        return res.send('Ok');
    }
    });
    //res.send('received the data.');
    });
    app.listen(3036);
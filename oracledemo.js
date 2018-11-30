const express = require('express');
var url = require('url');
const app = express();
const port = process.env.port || 3001;

let connection = require('./models/oconnection.js');


app.get('/lists', function (req, res) {
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    // var id = req.query.id;
    // res.send(id);
//    var id = req.params.id;    
    connection.fetchAll("select * from ComCountry", (promise) => {
        promise.then((result) => {
           // console.log(result.rows);
           res.type('json');
        //    console.log(result);
            res.send(JSON.stringify(result));
        }).catch((error) => {
            res.send(err);
        });
    });
  });


app.get('/list/:id([0-9]*)', function (req, res) {
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    // var id = req.query.id;
    // res.send(id);
   var id = req.params.id;    
    connection.fetchAll("select * from ComCountry where CountryID = "+id, (promise) => {
        promise.then((result) => {
           // console.log(result.rows);
           res.type('json');
           console.log(result);
            res.send(JSON.stringify(result));
        }).catch((error) => {
            res.send(err);
        });
    });
  });
  
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
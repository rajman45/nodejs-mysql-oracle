const express = require('express');
var url = require('url');
const app = express();
const port = 3000;

// let mysql  = require('mysql');
// let config = require('./config/config.js');

// let connection = mysql.createConnection(config);
// connection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }});

// let sql = "select * from TrnBatchFileList";
// let lists=[];
// connection.query(sql, (error, results, fields) => {
//     if (error) {
//     return console.error(error.message);
//     }
//     lists=results;
//     console.log(results);
// });

//app.get('/', (req, res) => res.send('Hello World!'))
let connection = require('./models/connection.js');
app.get('/list/:id([0-9]*)', function (req, res) {
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    // var id = req.query.id;
    // res.send(id);
   var id = req.params.id;
    let sql = "select * from TrnBatchFileList where BatchID = "+req.params.id;    
    connection.fetchAll(sql).then(function(rows){
        res.send(rows);
    }).catch((err)=>{
        res.send(err);
    });


    
  });
  app.get('/update', function (req, res) {

    connection.updatetData('TrnBatchFileList',{'BatchName':'manishTT'},{'BatchID':'1'}).then(function(rows){
        res.send(rows);
    }).catch((err)=>{
        res.send(err);
    });
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
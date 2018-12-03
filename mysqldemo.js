const express = require('express');
var url = require('url');
var path = require('path');
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
    let sql = "select * from tbl where ID = "+req.params.id;    
    connection.fetchAll(sql).then(function(rows){
        res.send(rows);
    }).catch((err)=>{
        res.send(err);
    });


    
  });
  app.get('/update', function (req, res) {

    connection.updatetData('tbl',{'Name':'manishTT'},{'ID':'1'}).then(function(rows){
        res.send(rows);
    }).catch((err)=>{
        res.send(err);
    });
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



app.get('/file', function (req, res) {    
    var templateDir = path.join(__dirname, '/emailTemplates','template.html');    
    res.sendFile(templateDir);
});

app.get('/sendmail', (req, res) => {
    
    'use strict';
const nodemailer = require('nodemailer');
var fs = require('fs');
var templateFile = path.join(__dirname, '/emailTemplates','template.html');
var templateString = fs.readFileSync(templateFile, 'utf-8');
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'host',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'user', // generated ethereal user
            pass: 'pass' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'foo@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: templateString // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
  
});

app.get('/*', function (req, res) {
    res.send('Bad Request');
});


let mysql  = require('mysql');
let config = require('../config/config.js');


let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }}
);

var fetchAll = (sql) => {
    return new Promise(function(resolve, reject) {
            
        connection.query(sql, (error, results) => {
            if (error) {
                reject(error.message);
            }            
            resolve(results);
        });
    });
    
};

var updatetData=(tbl,updateDatas,where)=>{
    return new Promise(function(resolve, reject) {
        connection.query('UPDATE '+ tbl +' SET ? Where ?'
        , [updateDatas,where],
        (error, result) => {
            if (error) {
                reject(error.message);
            }  
      
            resolve(result);
        }
      );
    });
};

module.exports.updatetData = updatetData;
module.exports.fetchAll = fetchAll;
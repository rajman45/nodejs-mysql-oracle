let oracledb = require('oracledb');
let config = require('../config/oconfig.js');
async function fetchAll(sql, callback) {
    var numRows = 1000;
    let connection;
    try {
        connection = await oracledb.getConnection(
            {
                user: config.user,
                password: config.password,
                connectString: config.connectString,
                database: config.database,
            },
            
            function (err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                console.log('Connection was successful!');
                
                var promise = new Promise(function (resolve, reject) {
                    connection.execute(sql,{}, //no binds
                        {
                            resultSet: true,
                            prefetchRows: 1000
                        }, function (err, result) {
                        if (err) {
                            doRelease(connection);
                            reject(err);
                        }
                        var procJson = [];

                        function processResultSet(connection, resultSet, numRows) {
                            resultSet.getRows(numRows, function(err, rows) {
                                if (err) throw err;
         
                                if (rows.length) {

                                    for (var i = 0; i < rows.length; i++) {
                                        if(procJson.length < numRows){
                                            procJson.push({});
                                            for (var j = 0; j < resultSet.metaData.length; j++) {
                                                procJson[i][resultSet.metaData[j].name.toLowerCase()] = rows[i][j];
                                            }
                                        }
                                       
                                    }  
                                    if (rows.length <= numRows) // might be more rows
                                        processResultSet(connection, result.resultSet, numRows); //try to get more rows from the result set
                                    else{
                                        doRelease(connection);
                                        result.resultSet.close(function(err) {
                                            if (err) console.error(err.message);
                 
                                            connection.release(function(err) {
                                                if (err) console.error(err.message);
                                            });
                                        });
                                    }
                                     // always close the result set                                  
                                    
         
                                    return; //exit recursive function prior to closing result set
                                }
         
                                // console.log('Finish processing ' + rowsProcessed + ' rows');
                                 
                                // console.log('Total time (in seconds):', ((Date.now() - startTime)/1000));
                                resolve(procJson);
                                
                            });
                        }
         
                        processResultSet(connection, result.resultSet, numRows);
                        
                    });
                });
                callback(promise);
               
                // connection.close(
                //     function (err) {
                //         if (err) {
                //             console.error(err.message);
                //             return;
                //         }
                //     });
            });
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
function doRelease(connection) {
    connection.close(function (err) {
        if (err) {
            console.error("close db connection failed:" + err.message);
        }
        return;
    });
}

// fetchAll("select * from WebUser where WEBUSERID < 200", (promise) => {
//     promise.then((result) => {
//         console.log(result.rows);
//     }).catch((error) => {
//         console.log(error);
//     });
// });

module.exports.fetchAll = fetchAll;

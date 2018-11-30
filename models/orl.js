//var oracledb = require('oracledb');
console.log('Test');
async function run() {
    let connection;
    try {
        connection = await oracledb.getConnection(
            {
                user: "MOBIFIN_QA_WEB",
                password: "MOBIFIN_QA_WEB",
                connectString: "192.168.2.249/mobifin"
            },
            function (err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                console.log('Connection was successful!');

                connection.close(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                    });
            });
    } catch (err) {
        console.error(err);
    }finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
}
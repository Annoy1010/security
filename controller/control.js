// DATABASE
const sql = require('mssql/msnodesqlv8');
/// Database Info
var config = {
    user: process.env.USER,
    password: process.env.PASSWORDSRV,
    server: 'DESKTOP-0E1NOTR\\SQLEXPRESS',
    database: 'Library',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }

}

/// Connect to database
sql.connect(config, function(err) {
    if (err) {
        console.log(err);
    }
    var request = new sql.Request();

    request.query('select * from UserAccount',  function(err, recordset) {
        if (err) {
            console.log(err);
        }
        else {
            account = recordset;
            console.log(recordset);
        }
        sql.close();
    });
});

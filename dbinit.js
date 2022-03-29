let mysql = require('mysql');

if (process.argv.length < 6){
    console.error('Not enough arguments given. node dbinit.js db-host db-name db-user db-pass');
    process.exit(1);
}

// Get database parameters from command line args
// node dbinit.js db_host db_name db_user db_password
const DB_CONFIG = {
    host: process.argv[2],
    database: process.argv[3],
    user: process.argv[4],
    password: process.argv[5]
};

let conn = mysql.createConnection(DB_CONFIG);
let query = `CREATE TABLE LogEntries(
	entryTimestamp TIMESTAMP NOT NULL PRIMARY KEY,
    levelNum INT NOT NULL,
    sortAlgorithm VARCHAR(20) NOT NULL,
    levelCompleted BOOL DEFAULT 0,
    mistakesMade INT DEFAULT 0,
    levelTime TIME NOT NULL
);`;

conn.query(query, (err, rows, fields) => {
    if (err){
        console.error(err);
    }
    else{
        console.log('Database successfully initialized');
    }
});
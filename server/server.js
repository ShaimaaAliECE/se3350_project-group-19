const express = require('express');
const mysql = require('mysql');
const path = require('path');

// Create Express server
const server = express();
server.use(express.static(path.join(__dirname, 'build')));

// Set server port number
const PORT = 4000;

// Exit if not enough arguments provided
if (process.argv.length < 6){
    console.error('Not enough arguments provided. Usage: node server.js db_host db_name db_user db_password');
    process.exit(1);
}

// Get database parameters from command line args
// node server.js db_host db_name db_user db_password
const DB_CONFIG = {
    host: process.argv[2],
    database: process.argv[3],
    user: process.argv[4],
    password: process.argv[5]
};


// Route for adding a DB entry
server.get('/add-log-entry', (req, res) => {
    // Check that request has all required fields
    console.log('Request received: ' + req.url);
    if (req.query.completed && req.query.mistakes && req.query.timeSpent){
        let currentDate = new Date();
        let timestampString = currentDate.toISOString().replace('T', ' ').replace('Z', ''); // format date as yyyy-mm-dd hh:mm:ss.sss
        let timeSpentSeconds = req.query.timeSpent / 1000;
        let timeSpentHours = Math.floor(timeSpentSeconds / 3600);
        let timeSpentMinutes = Math.floor((timeSpentSeconds % 3600) / 60);
        let timeSpentString = `${timeSpentHours}:${timeSpentMinutes}:${timeSpentSeconds}`;

        // Add new entry to DB
        // Connect to DB and send query
        let conn = mysql.createConnection(DB_CONFIG);
        let query = `INSERT INTO LogEntries VALUES('${timestampString}', ${req.query.completed}, ${req.query.mistakes}, '${timeSpentString}')`;
        conn.query(query, (err, rows, fields) => {
            if (err){
                console.log(err);
                // If the query failed, send the error message in the response
                res.status(500).json({
                    success: false,
                    error: 'DB error: ' + err.message
                });
            }
            else{
                // Send a success response (this will only be called via AJAX so no need to send any HTML)
                res.json({
                    success: true
                });
            }
        });
    }
    else{
        res.status(400).json({
            success: false,
            error: 'Request is missing one or more required fields: completed, mistakes, timeSpent'
        });
    }
});

// Router for react app (only works in build)
if (process.env.NODE_ENV !== 'development'){
    server.get('/*', (req, res) => {
        // Return the app page
        res.sendFile('build/index.html', {root: __dirname});
    });
}

server.listen(PORT);

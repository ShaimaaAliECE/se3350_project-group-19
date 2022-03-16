const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');

// Create Express server
const server = express();
server.use(express.static(path.join(__dirname, 'build')));
server.use(cookieParser('sortin'));
server.use(express.urlencoded({extended: true}));

// Set server port number
const PORT = 4000;

// Admin login credentials (who needs security lol)
const ADMIN_USERNAME = 'sortin';
const ADMIN_PASSWORD = 'admin';

// Command line argument to disable database functionality (for testing)
let useDatabase = true;
if (process.argv[2] && (process.argv[2] == '-n' || process.argv[2] == '--no-db')){
    useDatabase = false;
    console.log('Running server with database functions disabled');
}

// Exit if not enough arguments provided (unless DB functions are disabled)
if (useDatabase && process.argv.length < 6){
    console.error('Not enough arguments provided. Usage: node server.js db_host db_name db_user db_password');
    process.exit(1);
}

// Get database parameters from command line args if enabled
// node server.js db_host db_name db_user db_password
const DB_CONFIG = useDatabase ? {
    host: process.argv[2],
    database: process.argv[3],
    user: process.argv[4],
    password: process.argv[5]
} : null;

// ======================================================================== //
//                                                                          //
//                              DATABASE ROUTES                             //
//                                                                          //
// ======================================================================== //

// Route for adding a DB entry
server.get('/add-log-entry', (req, res) => {
    // Check that request has all required fields
    console.log('Request received: ' + req.url);
    if (req.query.level && req.query.algorithm && req.query.completed && req.query.mistakes && req.query.timeSpent){
        // Only do anything database-related if it's enabled
        if (useDatabase){
            let currentDate = new Date();
            let timestampString = currentDate.toISOString().replace('T', ' ').replace('Z', ''); // format date as yyyy-mm-dd hh:mm:ss.sss
            let timeSpentSeconds = req.query.timeSpent / 1000;
            let timeSpentHours = Math.floor(timeSpentSeconds / 3600);
            let timeSpentMinutes = Math.floor((timeSpentSeconds % 3600) / 60);
            let timeSpentString = `${timeSpentHours}:${timeSpentMinutes}:${timeSpentSeconds}`;

            // Add new entry to DB
            // Connect to DB and send query
            let conn = mysql.createConnection(DB_CONFIG);
            let query = `INSERT INTO LogEntries VALUES('${timestampString}', ${req.query.level}, '${req.query.algorithm}', ${req.query.completed}, ${req.query.mistakes}, '${timeSpentString}')`;
            conn.query(query, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    // If the query failed, send the error message in the response
                    res.status(500).json({
                        success: false,
                        error: 'DB error: ' + err.message
                    });
                    return;
                }
                else {
                    // Send a success response (this will only be called via AJAX so no need to send any HTML)
                    res.json({
                        success: true
                    });
                    return;
                }
            });
            conn.end();
        }
        // If DB connection is disabled, send an error response
        else{
            res.status(503).json({
                success: false,
                error: 'Request was valid, but database functionality is disabled on this server.'
            });
            return;
        }
    }
    else{
        res.status(400).json({
            success: false,
            error: 'Request is missing one or more required fields: level, algorithm, completed, mistakes, timeSpent'
        });
        return;
    }
});

// Route for fetching all data
server.get('/get-all-data', (req, res) => {
    if (useDatabase){
        let conn = mysql.createConnection(DB_CONFIG);
        let query = 'SELECT * FROM LogEntries';
        conn.query(query, (err, rows, fields) => {
            if (err){
                console.log(err);
                res.status(500).json({
                    success: false,
                    error: 'Database error: ' + err.message
                });
                return;
            }
            else{
                res.json({
                    success: true,
                    data: rows
                });
                return;
            }
        });
        conn.end();
    }
    else{
        res.status(503).json({
            success: false,
            error: 'Database functions are disabled on this server'
        });
        return;
    }
});


// ======================================================================== //
//                                                                          //
//                              ADMIN ROUTES                                //
//                                                                          //
// ======================================================================== //

// Route for accessing admin portal
server.get('/admin', (req, res) => {
    if (!req.cookies['admin']){
        res.redirect('/login');
    }
    else{
        res.sendFile('admin/admin.html', {root: __dirname});
    }
});

// Route for admin login (GET request - from navigating to the login page)
server.get('/login', (req, res) => {
    res.sendFile('admin/login.html', {root: __dirname});
});

// Route for admin login (POST request - from submitting the form)
server.post('/login', (req, res) => {
    // Check the submitted credentials
    if (req.body.username == ADMIN_USERNAME && req.body.password == ADMIN_PASSWORD){
        // Set the admin cookie and proceed to the admin page
        res.cookie('admin', 'admin').sendFile('admin/admin.html', {root: __dirname});
    }
    else{
        // Return to the login page
        res.sendFile('admin/login.html', {root: __dirname});
    }
});

// Route to log out
server.get('/log-out', (req, res) => {
    // Clear admin cookie and return to login page
    res.clearCookie('admin').redirect('/login');
});

// ======================================================================== //
//                                                                          //
//                              FILE ROUTES                                 //
//                                                                          //
// ======================================================================== //

//Route for the admin CSS file
server.get('/admin.css', (req, res) => {
    res.sendFile('admin/admin.css', {root: __dirname});
});

// Route for the admin script
server.get('/admin.js', (req, res) => {
    res.sendFile('admin/admin.js', {root: __dirname});
})

// Router for react app (only works in build)
if (process.env.NODE_ENV !== 'development'){
    server.get('/*', (req, res) => {
        // Return the app page
        res.sendFile('build/index.html', {root: __dirname});
    });
}

server.listen(PORT);

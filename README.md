# SE3350 Project - Group 19 - Sortin'

## Build instructions
Run `npm run build` as before. The resulting files will end up in `/server/build` rather than `/build`.

## Starting the server
The server file is `/server/server.js` and should be run with the following command, assuming you're in the `server` directory:

`node server.js db_host db_name db_user db_password`

where:
* `db_host` is the IP address of the database server (should be `127.0.0.1`).
* `db_name` is the name of the database. Will likely be `sortin-logging` but it hasn't yet been created in GCP yet.
* `db_user` and `db_pass` are the login credentials for the database server.
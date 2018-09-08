// Load modules
const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// Define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Opening Dossier..."});
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});

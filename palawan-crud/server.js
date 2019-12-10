const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql');

var status = 200;

var config = require('../config.json');

var connection = mysql.createConnection({
    host     : config.palawan.host,
    user     : config.palawan.username,
    password : config.palawan.password,
    database : config.palawan.database
});
connection.connect();

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(config.palawan.port, () => {
    console.log("Palawan CRUD");
    console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {    
    res.sendStatus(200);
});

app.get('/toggle', (req, res) => {    
    if(status == 200) 
        status = 404;
    else
        status = 200;

    res.sendStatus(status);
});

app.get('/read', (req, res) => {    
    connection.query(config.palawan.read, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
});

app.get('/update', (req, res) => {    
    connection.query(config.central.update.replace("<param>", req.query.param), function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
});
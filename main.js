const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// require nedb
const Datastore = require('nedb');

// create data store
const namesDB = new Datastore({
    filename: 'names.db',
    autoload: true
});

// Create server
const app = express()
    .use(bodyParser.json())
    .use(cors())
    .use(express.static('./public'));

// Configure JSON API
app.get('/names', (req, res) => {
    namesDB.find({}, (err, docs) => {
        if(err) {
            console.error(err);
            res.send(500);
        } else {
            res.send(JSON.stringify(docs));
        }
    });
});
app.post('/names', (req, res) => {
    const newDoc = {
        name: req.body.name
    };
    namesDB.insert(newDoc, err => {
        if(err) {
            console.error(err);
            res.send(500);
        } else {
            res.send('ok');
        }
    });
});

// Start server
const port = 3300;
const server = app.listen(port, () => {
    console.log('App listening at port', server.address().port);
});

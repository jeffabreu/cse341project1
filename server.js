const express = require('express'); //include this from the library
const bodyParser = require ('body-parser');
const mongodb = require('./data/database');
const app = express();
 
 const port = process.env.PORT || 3000;
 app.use(bodyParser.json());
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 
    'Origin, x-Requested-with, Content-Type, Accept, Z-key')
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, DELETE, OPTIONS');
    next();
 })
 app.use('/', require('./routes'));  


 mongodb.initDb(err => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node is running on port ${port}`);
        });
    }
});

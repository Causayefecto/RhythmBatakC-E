
const express = require('express');
const dataStore = require('nedb');
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '10mb'}))

const dataBase = new dataStore('database.db');
dataBase.loadDatabase();


app.get('/api', (request, response) => {
    dataBase.find({}, (err, data) => {
        if (err){
            response.end();
            return;
        }
        response.json(data);
    });

});

app.post('/api', (request, response) => {
    //console.log('I got a request!');
    const data = request.body;
    const timeStamp = Date.now();
    data.timeStamp = timeStamp;
    dataBase.insert(data);
    //response.json(data);
    
});

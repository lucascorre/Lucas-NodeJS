const express = require('express');
const app = express();
const http = require('http').Server(app);

const { MongoClient, ObjectID } = require('mongodb');
//import { MongoClient, ObjectID } from 'mongodb';

const { join } = require('path');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect((err, instance) => {
    if(err) {
        process.exit(1);
    }
    else {
        app.get('/', (req, res) => res.redirect('/chat'));

        const db = instance.db('ChatNodeJS');
        const collection = db.collection('Chat');

        collection.insertOne({ Pseudo: 'Lucas', message: 'Hello World' });
        
        collection.find({}, (err, rawResults) => {
            rawResults.forEach(results => console.log(results));
        });

        //collection.updateOne({ _id: ObjectID("id du message") }, { $set: { message: "Bonjour" }});

        http.listen(3000, () => console.log('Server Ready'));
    }
});

app.use(express.static(__dirname + "/public"));
const express = require('express');
const app = express();
const fs = require('fs');

const chatFile =fs.readFileSync('./index.html')

function chatController (req, res)  {
    res.end(chatFile);
}

app.get('/', (req,res) => res.end('Hello World'));
app.get('/chat', chatController);

app.listen(3000, () => console.log('Server ready'));
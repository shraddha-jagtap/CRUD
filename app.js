const express = require('express');
const app = express();
const db = require('./Custom/crud.js');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'frontend/index.html'));
})

app.get('/api/db-test',(req, res) => {
    
    res.send(db.db_test());
})

app.post('/api/insert',(req, res)=>{
    res.send(db.insertData(req.body));
})

app.post('/api/read',(req, res) => {
    db.readData(req.body.name,( message)=>{
        res.send(`<pre> ${message} </pre>`)
    });
})

// app.post('/api/read',(req, res) => {
//     res.send(db.readData(req.body.name));
// })

app.post('/api/update',(req, res) => {
    db.updateData(req.body);
})

app.post('/api/delete',(req, res) => {
    db.deleteData(req.body,(message)=>{
        res.send(message)
    })
    ;
})

app.listen(2333, ()=>{
    console.log("http://localhost:2333");
})
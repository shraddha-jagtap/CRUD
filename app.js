const express = require('express');
const app = express();
const db = require('./Custom/db.js');
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
    res.send(db.Create_db(req.body));
})

app.post('/api/read',(req, res) => {
    db.readData(req.body.name);
})

app.post('/api/update',(req, res) => {
    db.updateDataByName(req.body.name,{value: req.body.value});
})

app.post('/api/delete',(req, res) => {
    db.deleteDataByName(req.body.name);
})

app.listen(2333, ()=>{
    console.log("http://localhost:2333");
})
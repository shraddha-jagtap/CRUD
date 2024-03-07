const mongodb = require('mongodb');
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

const url = process.env.connectionString;

const mongoose = require('mongoose');

mongoose.connect(url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        dbName: 'testDB'})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define a schema for your data
const dataSchema = new mongoose.Schema({
    name: String,
    value: String
});

const Data = mongoose.model('Data', dataSchema,'testColl');

exports.mongoose = mongoose;
exports.dataSchema = dataSchema;
exports.Data = Data;
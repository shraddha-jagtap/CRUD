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

// Replace the placeholder with your Atlas connection string


function db_test(){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    return "Database Connection is working";
}

function Create_db(insertRow){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
// Create data to be inserted
const newData = new Data(insertRow);

// Save the data to the database
newData.save()
    .then(savedData => {
        console.log('Data inserted:', savedData);
    })
    .catch(error => {
        console.error('Error inserting data:', error);
    });

    return "Data Added To Database";
}


function readData(name){
        async function re(){
            
        console.log(await Data.find()
        .then(data => {
            console.log('Data read:', data);
            return data;
        })
        .catch(error => {
            console.error('Error reading data:', error);
            throw error; // Re-throw the error for the caller to handle
        }));
        }
        re()
}

async function updateDataByName(name, newData) {
    try {
        const updatedData = await Data.findOneAndUpdate({ name: name }, newData, { new: true });
        console.log('Data updated:', updatedData);
        return updatedData;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

async function deleteDataByName(name) {
    try {
        const deletedData = await Data.findOneAndDelete({ name: name });
        console.log('Data deleted:', deletedData);
        return deletedData;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

// // Usage example
// updateDataByName('Alice', {})
//     .then(updatedData => {
//         console.log('Updated data:', updatedData);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

exports.deleteDataByName = deleteDataByName
exports.updateDataByName = updateDataByName;
exports.readData = readData;
exports.db_test = db_test;
exports.Create_db = Create_db;
require('./dbConnect');

function db_test(){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    return "Database Connection is working";
}

function Create_db(insertRow){
    
    // mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(() => console.log('Connected to MongoDB'))
    // .catch(err => console.error('Could not connect to MongoDB', err));

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
                throw error;
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

exports.deleteDataByName = deleteDataByName
exports.updateDataByName = updateDataByName;
exports.readData = readData;
exports.db_test = db_test;
exports.Create_db = Create_db;
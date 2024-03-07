const { mongoose,Data,dataSchema} = require('./dbConnect');

function test(){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    return "Database Connection is working";
}

function insertData(insertRow){
    const newData = new Data(insertRow);

    newData.save()
        .then(savedData => {
            console.log('Data inserted:', savedData);
        })
        .catch(error => {
            console.error('Error inserting data:', error);
        });

    return "Data Added To Database";
}


// function readData(name){
//     let message='';
//     var newMessage;
//     async function read(name){

//     const Data = mongoose.model('Data', dataSchema,'testColl');
    
//     await Data.find({name: name})
//     .then(data => {
//         // console.log('Data read: ', data);
//        data.forEach(row => {
//         console.log("+"+message + "+");
//             message += `${row.name} is ${row.value}\n`;
//              newMessage = message

//         });
//         return message;
//     })
//     .catch(error => {
//         console.error('Error reading data: ', error);
//         throw error;
//     });
//     return message;
//     }
//     console.log(88);
//     console.log("/"+message+"/");
//     return read(name);
// }

async function readData(name,callback){
    let message = '';
    let value;
    const Data = mongoose.model('Data', dataSchema,'testColl');
    
    await Data.find({name})
        .then(data => {
            console.log('Data read: ', data);
            value = data;
        })
        .catch(error => {
            console.error('Error reading data: ', error);
            throw error;
        });
        value.forEach(row => {
            message += `${name} is ${row.value}\n`
        });
            console.log(message);
        callback(message);
    return;
}

async function updateData(data) {
    try {
        const updatedData = await Data.findOneAndUpdate({ name: data.name, value: data.value}, {value: data.newvalue}, { new: true });
        console.log('Data updated:', updatedData);
        
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }

    return;
}

async function deleteData(body,cb) {
    try {
        const deletedData = await Data.findOneAndDelete({ ...body });
        console.log('Data deleted:', deletedData);
        return cb('deleted');
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

exports.deleteData = deleteData
exports.updateData = updateData;
exports.readData = readData;
exports.test = test;
exports.insertData = insertData;
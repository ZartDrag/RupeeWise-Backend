//will be used to connect to the database
const mongoose = require('mongoose'); //import statement
const mongoURI = "mongodb+srv://RupeeWise:qwerty123@cluster0.lgnhsk2.mongodb.net/RupeeWise?retryWrites=true&w=majority"
//MongoDB connection string

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        //this function only fires when the connection is established; async in nature
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo; //this makes connectToMongo() publically accessible
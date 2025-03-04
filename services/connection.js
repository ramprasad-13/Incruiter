const mongoose = require('mongoose');
require('dotenv').config();

const URL= process.env.MONGO_URI;

const db = async()=>{
    try {
        await mongoose.connect(URL);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database');
    }
}

module.exports = db;
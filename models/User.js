const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        max: 100
    },
    mobileNumber:{
        type: Number,
        required: true,
        unique: true,
        max:9999999999
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 100
    },
    password:{
        type: String,
        required: true,
        max: 100
    },
    role:{
        type: String,
        required: true,
        max: 100,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isVerified:{
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
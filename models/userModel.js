const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "userName is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    userType: {
        type: String,
        required: [true, "user type is required"],
        default: "client",
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://imgs.search.brave.com/CDDvhzV6J8VWNYRes5lFasLXiRupzJrN61LK6_B_jHY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9keWwz/NDdoaXd2M2N0LmNs/b3VkZnJvbnQubmV0/L2FwcC91cGxvYWRz/LzIwMjMvMDkvU3Rh/ZGl1bV9WMl8xOTgw/JUUyJTgwJThBJUMz/JTk3JUUyJTgwJThB/MTEyOF9UZXh0LXNj/YWxlZC5qcGc'
    },
    answer:{
        type: String,
        required: [true, "answer is required"]
    }
},{timestamps:true});

//export
module.exports = mongoose.model('User', userSchema);
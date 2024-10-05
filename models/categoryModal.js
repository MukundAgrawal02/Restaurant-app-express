const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tilte is required"]
    },
    imageUrl: {
        type: String,
        default: 'https://imgs.search.brave.com/CDDvhzV6J8VWNYRes5lFasLXiRupzJrN61LK6_B_jHY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9keWwz/NDdoaXd2M2N0LmNs/b3VkZnJvbnQubmV0/L2FwcC91cGxvYWRz/LzIwMjMvMDkvU3Rh/ZGl1bV9WMl8xOTgw/JUUyJTgwJThBJUMz/JTk3JUUyJTgwJThB/MTEyOF9UZXh0LXNj/YWxlZC5qcGc'
    },

}, { timestamps: true });

module.exports = mongoose.model('category', categorySchema);
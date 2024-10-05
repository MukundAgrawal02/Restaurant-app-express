// Import required modules
const mongoose = require('mongoose');

// Connect to MongoDB database
 const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB ${mongoose.connection.host}`);
    } catch (error) {
        console.log("Db error", error);
    }
}
module.exports = connectDb;
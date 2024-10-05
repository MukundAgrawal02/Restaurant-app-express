// Import required modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// Load environment variables from.env file
dotenv.config();

// Connect to MongoDB database
connectDb();

// Create an instance of Express app and configure middleware
const app = express();

// Configure middleware for CORS, JSON parsing, and logging
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Import routes
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/resturant',require('./routes/resturantRoutes'));
app.use('/api/v1/category',require('./routes/categoryRoutes'));

// Define API endpoints
app.get('/api/v1', (req, res) => {
    res.send("HELLO");
    console.log("HELLO");
})

// Start the server on port
app.listen(process.env.PORT || 8080, () => {
    console.log("Server started on http://localhost:3000");
})
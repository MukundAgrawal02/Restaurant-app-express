// Import required modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

// Basic setup for Swagger definition
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API with JWT Authentication',
        version: '1.0.0',
        description: 'A simple Express API application with JWT authentication',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', // Optional, indicates the format of the token
          },
        },
      },
      security: [
        {
          bearerAuth: [], // Apply this globally to all endpoints
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to your routes
  };

// Initialize swagger-jsdoc with the options
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Use Swagger UI to display the API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Import routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/resturant', require('./routes/resturantRoutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));

// Define API endpoints
app.get('/api/v1', (req, res) => {
    res.send("HELLO");
    console.log("HELLO");
})

// Start the server on port
app.listen(process.env.PORT || 8080, () => {
    console.log("Server started on http://localhost:3000");
    console.log('API docs available at http://localhost:3000/api-docs');

})
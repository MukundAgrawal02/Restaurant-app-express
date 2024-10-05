const express = require('express');
const { registerController, loginController } = require('../controllers/authContollers');

// Create an instance of Express app
const router = express.Router();
 // Define routes for authentication
 router.post('/register',registerController);
 router.post('/login',loginController);

module.exports = router;
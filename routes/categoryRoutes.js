const express = require('express');

// Import controllers functions
const { createCategoryController } = require('../controllers/categoryController');

const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();
//routes
//Create category 
router.post('/create',createCategoryController);

module.exports = router;
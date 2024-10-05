const express = require('express');

// Import controllers functions
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require('../controllers/resturantController');
 // Import middleware for authentication
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();
//routes
//Create resturants
router.post('/create', authMiddleware, createResturantController);
//get all resturants
router.get('/getAll', getAllResturantController);
//get by id
router.get('/get/:id', getResturantByIdController);
//delete resturants
router.delete('/delete/:id',authMiddleware, deleteResturantController);


module.exports = router;
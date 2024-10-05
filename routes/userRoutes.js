const express = require('express');
const { getUserController,updateUserController,updatePasswordController,resetPasswordController, getAllUsersController, deleteUserController } = require('../controllers/userContoller');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();
//routse
//GET all user 
router.get('/getAll', authMiddleware,getAllUsersController);
//GET user 
router.get('/getUser', authMiddleware, getUserController);
 //PUT user  update user details  by id in request body
router.put('/updateUser', authMiddleware, updateUserController)
 //PUT user  update user password  by id in request body
router.post('/updatePassword', authMiddleware, updatePasswordController)

router.post('/resetPassword', authMiddleware, resetPasswordController)

//delete user
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)

module.exports = router;
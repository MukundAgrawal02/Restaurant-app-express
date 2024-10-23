const express = require('express');
const { getUserController,updateUserController,updatePasswordController,resetPasswordController, getAllUsersController, deleteUserController } = require('../controllers/userContoller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
//routse
//GET all user 
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 *        
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/user/getAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Requires JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/getAll', authMiddleware, getAllUsersController);

/**
 * @swagger
 * /api/v1/user/getUser:
 *   get:
 *     summary: Get a single user
 *     description: Retrieve details of a specific user. Requires JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/getUser', authMiddleware, getUserController);

/**
 * @swagger
 * /api/v1/user/updateUser:
 *   put:
 *     summary: Update user details
 *     description: Update the details of a user by their ID, which should be provided in the request body. Requires JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put('/updateUser', authMiddleware, updateUserController);

/**
 * @swagger
 * /api/v1/user/updatePassword:
 *   post:
 *     summary: Update user password
 *     description: Update the password of a user by their ID, which should be provided in the request body. Requires JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/updatePassword', authMiddleware, updatePasswordController);

/**
 * @swagger
 * /api/v1/user/resetPassword:
 *   post:
 *     summary: Reset user password
 *     description: Reset the password for a user. Requires JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               answer:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/resetPassword', authMiddleware, resetPasswordController);

/**
 * @swagger
 * /api/v1/user/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID. Requires JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/deleteUser/:id', authMiddleware, deleteUserController);

module.exports = router;

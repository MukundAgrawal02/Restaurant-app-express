const userModel = require("../models/userModel");
const bcyrpt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Register controller
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address,answer } = req.body;
        //validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please fill all fields"
            });
        }
        //check if user already exists
        const exisitingUser = await userModel.findOne({ email })
        if (exisitingUser) {
            return res.status(500).send({
                success: false,
                message: "User already exists"
            });

        }
        //hash password
        var salt = bcyrpt.genSaltSync(10);

        const hashPassword = await bcyrpt.hash(password, salt);

        //crate new user
        const user = await userModel.create({
            userName,
            email,
            password: hashPassword,
            phone,
            address,
            answer
        });
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in register APi",
            error
        });
    }
}

//login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please fill all fields"
            });
        }
        //check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        //check password
        const isMatch = await bcyrpt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            });
        }

        //create JWT token with expiration time 7 days
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET,{
            expiresIn: '7d',
        });

        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            token,
            user
        })
        // //generate JWT token
        // const token = user.generateJWT();
        // res.send({
        //     success: true,
        //     message: "User logged in successfully",
        //     token
        // });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login APi",
            error
        });
    }

}
module.exports = { registerController, loginController }
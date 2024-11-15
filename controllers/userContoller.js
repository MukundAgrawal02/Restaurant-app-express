const userModel = require("../models/userModel");
const bcyrpt = require("bcryptjs");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      count: users.length,
      message: "All users retrieved successfully",
      users
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all users API",
      error
    });
  }

}
const getUserController = async (req, res) => {
  try {
    // get user by id from request body
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    // send user details to client
    res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      user
    });

  } catch (error) {
    // log error in console
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error
    });
  }
};

//UPDATE user 
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validate
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    //update user
    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    //save user 
    await user.save();

    // send updated user details to client
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error
    });
  }
};

//reset password controller
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    //validation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please fill all fields"
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or invalid answer"
      });
    }
    //reset password
    //hash password
    var salt = bcyrpt.genSaltSync(10);

    const hashPassword = await bcyrpt.hash(newPassword, salt);

    //update password
    user.password = hashPassword;
    //save user
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reset password API",
      error
    })
  }
}

//update password controller
const updatePasswordController = async (req, res) => {
  try {
    //find user 
    const user = await userModel.findById({ _id: req.body.id });
    //check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    //validation
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please fill all fields"
      });
    }

    //validate old password
    const isMatch = await bcyrpt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password"
      });
    }
    if (oldPassword === newPassword) {
      return res.status(500).send({
        success: false,
        message: "New password should not be same as old password"
      });
    }
    //hash new password
    var salt = bcyrpt.genSaltSync(10);
    const hashPassword = await bcyrpt.hash(newPassword, salt);
    //update password
    user.password = hashPassword;
    //save user
    await user.save();

    //send updated user details to client
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
      user
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password API",
      error
    })
  }
}

//delete user controller
const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id
    await userModel.findByIdAndDelete({_id:id})
    //send success message
    res.status(200).send({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete user API",
      error
    })
  }
}

module.exports = { getAllUsersController, getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController };
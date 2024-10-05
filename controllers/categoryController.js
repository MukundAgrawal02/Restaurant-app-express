const categoryModal = require("../models/categoryModal");

//create categories controller
const createCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        //validation
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "Title must be provided"
            })
        }
        const newCategory = new categoryModal({ title: title, imageUrl: imageUrl });
        //save to database
        await newCategory.save();
        //send response back to client
        res.status(200).send({
            success: true,
            message: "Category created successfully",
            category: newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create category API",
            error
        })
    }
};

module.exports = {
    createCategoryController
}
const { response } = require("express");
const resturantModel = require("../models/resturantModel");

//CREATE RESTURANTS
const createResturantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
        //validaton
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "Title and address must be provided"
            });
        }

        //create new resturant
        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });

        //save to database
        await newResturant.save();
        res.status(201).send({
            success: true,
            message: "Resturant created successfully",
            resturant: newResturant
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create resturant API",
            error
        });
    }
};

const getAllResturantController = async (req, res) => {
    try {
        const resturants = await resturantModel.find({});
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: "No resturants found"
            });
        }
        res.status(200).send({
            success: true,
            message: "All resturants fetched successfully",
            totalCount: resturants.length,
            resturants
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all resturants API",
            error
        });
    }
};

const getResturantByIdController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({
                success: false,
                message: "ID is required"
            });
        }
        const resturant = await resturantModel.findById({ _id: req.params.id });
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "Resturant not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Resturant fetched successfully",
            resturant
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get resturant by id API",
            error
        });
    }
};

const deleteResturantController = async (req, res) => {
    try {
        const resturantid = req.params.id;
        if (!resturantid) {
            return res.status(404).send({
                success: false,
                message: "Please enter Id or Resturant not found"
            });
        }

        await resturantModel.findByIdAndDelete({ _id: resturantid });
        res.status(200).send({
            success: true,
            message: "Resturant deleted successfully"
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete resturant API",
            error
        });
    }
};
module.exports = {
    createResturantController, getAllResturantController, getResturantByIdController,
    deleteResturantController
};
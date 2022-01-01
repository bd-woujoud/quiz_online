
const categoryModel = require("../models/categorieModel");


module.exports = {

    createCategory: (req, res) => {


        categoryModel.findOne({ nomCat: req.body.nomCat }, (err, category) => {

            if (category) {
                res.status(422).json({
                    success: false,
                    message: 'category exist'

                })

            } else {

                const data = {
                    nomCat: req.body.nomCat,

                }


                categoryModel.create(data, (err, category) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: "error create category",

                        })
                    } else {
                        res.status(201).json({
                            success: true,
                            message: "category successfuly created",
                            data: category
                        })
                    }
                })
            }
        })
    },



    getallcategory: function (req, res) {
        categoryModel.find({}).populate('qcm').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'categories',
                    success: true,
                    data: data
                })
        })
    },


    getByIdcategory: function (req, res) {
        categoryModel.findById({ _id: req.params.id }).populate('qcm').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'categories',
                    success: true,
                    data: data
                })
        })
    },

    deletecategory: function (req, res) {
        categoryModel.findByIdAndDelete({ _id: req.params.id }, (err, cat) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    success: false,
                    errors: err
                })

            } else {

                res.status(200).json({
                    message: 'catreogry deleted successfuly',
                    success: true,
                    data: cat
                })

            }
        })
    },

    updatecategory: (req, res) => {
        console.log(req.body);
        categoryModel.findByIdAndUpdate({ _id: req.params.id }, { nomCat: req.body.nomCat }, { new: true }, (err, cat) => {
            if (err) {

                res.status(500).json({
                    success: false,
                    messge: "error updating category",
                    erors: err
                })



            } else {

                res.status(200).json({
                    success: true,
                    messge: "category updated successfuly",
                    data: cat
                })
            }
        })
    },

}
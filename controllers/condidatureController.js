

const adminModel = require("../models/adminModel");
const condidatureModel = require("../models/condidatureModel");
const { validatecondidature } = require("../validation/condidatureSchema")

module.exports = {

    createcondidature: async (req, res) => {


        //validation data


        const { error } = validatecondidature(req.body)

        if (error)
            return res.status(422).json({
                message: 'user data validation error',
                success: false,
                errors: error
            })

        let cvv = req.file
        if (cvv.mimetype !== 'application/pdf') {

            res.json({ msg: 'please enter a valid extention' })

        }

        if (error)
            return res.status(422).json({
                success: false,
                errors: error,
                message: 'user data validation error'
            })

        const { email } = req.body


        const user = await condidatureModel.findOne({ email: email })

        if (user)
            return res.status(422).json({
                message: "user with this email is already exist!",
                errors: {
                    details: [
                        {

                            "path": [
                                "email"
                            ]
                        }
                    ]
                }
            })


        else {

            condidatureModel.create({

                name: req.body.name,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                cv: cvv.filename,
                offre: req.body.offre

            }, function (err, candidature) {
                if (err) {
                    res.json({ message: 'error add condidature' + "  " + err, data: null, status: 500 })
                } else {
                    res.json({ message: 'condidature created successfully', data: candidature, status: 200 })
                }
            })
        }


    },


    getallcondidature: function (req, res) {
        condidatureModel.find({}).populate('offre').populate('test').populate('categorie').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'condidatures',
                    success: true,
                    data: data
                })
        })
    },


    getByIdcondidature: function (req, res) {
        condidatureModel.findById({ _id: req.params.id }).populate('offre').populate('test').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'condidature',
                    success: true,
                    data: data
                })
        })
    },


    deletecondidature: function (req, res) {
        condidatureModel.findByIdAndDelete({ _id: req.params.id }, (err, condidature) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    success: false,
                    errors: err
                })
            } else {
                res.status(200).json({
                    message: 'condidature deleted successfuly',
                    success: true,
                    data: condidature
                })
            }
        })
    },

    updatecondidature: (req, res) => {

        condidatureModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, condidature) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    messge: "error updating condidature",
                    erors: err
                })
            } else {
                res.status(200).json({
                    success: true,
                    messge: "condidature updated successfuly",
                    data: condidature
                })
            }
        })
    },

}

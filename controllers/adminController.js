
const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {  validateadmin,ValidateResetPasswordData } = require('../validation/adminSchema')
const { SignToken } = require('../helpers/auth')
const nodemailer=require('nodemailer')
module.exports = {

    createadmin: async function (req, res) {


        const { error } = validateadmin(req.body)

        if (error)
            return res.status(422).json({
                success: false,
                errors: error,
                message: 'user data validation error'
            })

        const { password, email } = req.body

        // tester l'existance de user avec email
        const user = await adminModel.findOne({ email: email })

        if (user)
            return res.status(422).json({
                messaage: 'user invalid credantials',
                errors: {
                    details: [
                        {
                            "message": "user with this email is already exist!",
                            "path": [
                                "email"
                            ]
                        }
                    ]
                }
            })

         const passwordhash = await bcrypt.hash(req.body.password, 10) // cryptage password lors de la creation

         req.body.password = passwordhash

        adminModel.create(req.body, function (err, admin) {

            if (err) {

                res.json({ message: 'error add admin' + err, data: null, status: 500 })

            } else {

                res.json({ message: 'admin added successfuly', data: admin, status: 200 })
            }

        })

    },


    login: async (req, res) => {

        const { password, email } = req.body

        const { error } = validateadmin(req.body)

        if (error)
            return res.status(422).json({
                success: false,
                errors: error,
                message: 'admin data validation error'
            })


        const admin = await adminModel.findOne({ email: email })

        if (!admin) {
            return res.status(422).json({
                success: false,
                errors: {
                    details: [
                        {
                            path: ['email'], message: 'admin with this email does not exist'
                        }
                    ]
                },
            })
        }

        const ismatch = await bcrypt.compare(password, admin.password) 
        console.log(ismatch);
        if (!ismatch) {
            res.status(422).json({
                success: false,
                errors: {
                    details: [
                        {
                            path: ['password'], message: 'invalid password try again'
                        }
                    ]
                },
            })
        } else {

            const token = await SignToken(admin._id) //creation de methode pour creer  access token 

            res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

            res.status(200).json({
                success: true,
                message: 'succesffully logged in',
            })

        }

    },


    logout: (req, res) => {
        res.clearCookie("access_token");
        res.status(200).json({
            isconnected: false,
           
        })
    },


    sendMail: function (req, res) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'wwwwboudhina@gmail.com',
                pass: 'zoula1983',
            }
        });

        

        const test =req.body.test

        var mailOptions = {

            from: req.body.from,
            to: req.body.to,
            text: 'Click the link below to take the test',
            html: `<a href='http://localhost:5000/test/getbyid/${test}'>test link</a>`

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ message: 'error ' + error });
            } else {

                res.json({ message: 'Email sent: ' + info.response });
            }
        })


    },




}




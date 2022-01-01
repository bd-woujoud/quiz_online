
const qcmModel = require("../models/qcmModel");
const testModel = require("../models/testModel");
const Condidature = require('../models/condidatureModel')
var readlineSync = require("readline-sync");
module.exports = {

    createtest: async (req, res, next) => {

        console.log(req.body);

        const questions = await qcmModel.find({ categorie: req.body.category })
        console.log(questions);
        function getRandomQuestionSet(number) {
            var qSet = [];
            while (qSet.length < number) {
                var randomIndex = Math.floor(Math.random() * questions.length);
                if (qSet.indexOf(randomIndex) === -1) {
                    qSet.push(randomIndex)
                }
            }
            return questions.filter(function (d, i) {
                return qSet.indexOf(i) > -1;
            })
        }

        const myquestions = getRandomQuestionSet(5)

        let qts = []
        for (let item of myquestions) {
            qts.push(item._id)
        }

        let data = {
            questions: qts,
            condidature: req.body.condidature
        }

        testModel.create(data, (err, test) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "error create test",
                    errors: { details: [{ path: ['global'], message: 'something went wrong' }] }
                })
            } else {
                let obj = {
                    test: test._id,
                    to: req.body.to,
                    subject: 'test a passer',
                    text: 'test link'
                }


                /* res.status(201).json({
                    success: true,
                    message: "test successfuly created",
                    data: test
                }) */

                Condidature.findByIdAndUpdate({ _id: req.body.condidature }, { test: test._id }, { new: true }, (err, con) => {
                    res.status(200).json({
                        messge: "condidature",
                        data: con
                    })
                })

                req.mail = obj
                next()
            }
        })
    },



    getalltest: function (req, res) {
        testModel.find({}).populate('questions').populate('condidature').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'tests',
                    success: true,
                    data: data
                })
        })
    },


    gettestById: function (req, res) {
        testModel.findById({ _id: req.params.id }).populate('questions').populate('condidature', ' -_id -cv').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'test',
                    success: true,
                    data: data
                })
        })
    },

    deletetest: function (req, res) {
        testModel.findByIdAndDelete({ _id: req.params.id }, (err, test) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    success: false,
                    errors: err
                })
            } else {
                res.status(200).json({
                    message: 'test deleted successfuly',
                    success: true,
                    data: test
                })
            }
        })
    },

    updatetest: (req, res) => {
        testModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, test) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    messge: "error updating test",
                    erors: err
                })
            } else {
                res.status(200).json({
                    success: true,
                    messge: "test updated successfuly",
                    data: test
                })
            }
        })
    },


}
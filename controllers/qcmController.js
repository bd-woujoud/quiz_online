
const qcmModel = require("../models/qcmModel");


module.exports = {

    createqcm: (req, res) => {

console.log("reqqqqqqq create data", req.body)
        qcmModel.findOne({ question: req.body.question }, (err, qcm) => {

            if (qcm) {
                res.status(422).json({
                    success: false,
                    message: 'qcm  exist'

                })

            } else {

                let data = {

                    question: req.body.question,
                    reponses: req.body.reponses,
                    categorie: req.body.categorie


                }


                qcmModel.create(data, (err, qcm) => {


                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: "error create qcm",
                            errors: { details: [{ path: ['global'], message: 'something went wrong' + err }] }
                        })
                    } else {
                        res.status(201).json({
                            success: true,
                            message: "qcm successfuly created",
                            data: qcm
                        })
                    }
                })
            }

        })
    },



    getallqcm: function (req, res) {
        qcmModel.find({}).populate('categorie').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'qcm',
                    success: true,
                    data: data
                })
        })
    },


    getByIdqcm: function (req, res) {
        qcmModel.findById({ _id: req.params.id }).populate('categorie', 'nomCat_-id').exec((err, data) => {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error' + err,
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'qcm',
                    success: true,
                    data: data
                })
        })
    },

    deleteqcm: function (req, res) {
        qcmModel.findByIdAndDelete({ _id: req.params.id }, (err, qcm) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    success: false,
                    errors: err
                })
            } else {
                res.status(200).json({
                    message: 'qcm deleted successfuly',
                    success: true,
                    data: qcm
                })
            }
        })
    },

    updateqcm: (req, res) => {
        qcmModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, qcm) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    messge: "error updating qcm",
                    erors: err
                })
            } else {
                res.status(200).json({
                    success: true,
                    messge: "qcm updated successfuly",
                    data: qcm
                })
            }
        })
    },

    getqcmBycategoryId: function (req, res, next) {

        qcmModel.find({ categorie: req.params.id }).populate('categorie', 'nomCat').exec((err, data) => {

            if (err) {
                res.status(500).json
                    ({
                        success: false,
                        message: 'errorr' + err,


                    })
            } else {
                var questions = data

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

                var questionSet = getRandomQuestionSet(2);
                // console.log('ffffffffffffffffffffffff',questionSet)
                req.questions = questionSet
                res.status(200).json({
                    message: 'qcm',
                    success: true,
                    data: questionSet
                })
                next()

            }
        })
    },



    findAlltrue: function (req, res) {
        qcmModel.find({ isCorrect: false })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    }

}
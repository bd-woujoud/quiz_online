
const qcmModel = require("../models/qcmModel");
const testModel = require("../models/testModel");
var readlineSync = require("readline-sync");
module.exports = {

    createtest: (req, res) => {




        testModel.create(req.body, (err, test) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "error create test",
                    errors: { details: [{ path: ['global'], message: 'something went wrong' }] } 
                })
            } else {
                res.status(201).json({
                    success: true,
                    message: "test successfuly created",
                    data: test
                })
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
        testModel.findById({ _id: req.params.id }).populate('questions').populate('condidature',' -_id -cv') .exec((err, data) => {
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






test:function(question, isCorrect){
  var condidatAnswer = readlineSync.question(question);
  if(condidatAnswer == isCorrect){
    console.log("correct! ");
    score++;
  }
  else{
    console.log("wrong! ");
    score;
  }
  console.log("your score is ",score);



//LOOP
for(var i=0; i<questions.length; i++){
  var currentq = questions[i];
  test(currentq.question, currentq.isCorrect);
}

//To display the final score.
console.log("YOUR FINAL SCORE IS: " + score+"/10")
}

}
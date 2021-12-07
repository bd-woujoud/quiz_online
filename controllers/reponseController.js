

const reponseModel = require("../models/reponseModel");
module.exports = {
 

    createreponse:function(req,res){


        reponseModel.create(req.body,function(err,reponse){
        
        if (err) {
        
            res.json({message:'error add reponse'+err,data:null ,status:500})   
            
        } else {
            
            res.json({message:'reponse added successfuly',data:reponse ,status:200})
        }

        })

        
        },
        


        getallreponse: function (req, res) {
            reponseModel.find({}).populate('categorie').exec((err, data) => {
                if (err)
                    res.status(500).json
                        ({
                            success: false,
                            message: 'error',
                            errors: err
    
                        })
                else
                    res.status(200).json({
                        message: 'reponses',
                        success: true,
                        data: data
                    })
            })
        },
    

    getreponseById: function (req, res) {

        reponseModel.findById({_id:req.params.id}).populate('categorie').exec((err, data) =>  {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'reponses',
                    success: true,
                    data: data
                })
        })
    },


 
    deletereponse: function (req, res) {
        reponseModel.findByIdAndDelete({ _id: req.params.id }, (err, reponse) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    success: false,
                    errors: err
                })
            } else {
                res.status(200).json({
                    message: 'reponse deleted successfuly',
                    success: true,
                    data: reponse
                })
            }
        })
    },

    updatereponse: (req, res) => {

        reponseModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, reponse) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    messge: "error updating reponse",
                    erors: err
                })

            } else {
                res.status(200).json({
                    success: true,
                    messge: "reponse updated successfuly",
                    data: reponse
                })
            }
        })
    },




}
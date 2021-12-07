
const offreModel = require("../models/offreModel");



module.exports = {
 


    createoffre:function(req,res){


        offreModel.create(req.body,function(err,offre){
        
        if (err) {
        
            res.json({message:'error add offre'+err,data:null ,status:500})   
            
        } else {
            
            res.json({message:'offre added successfuly',data:offre ,status:200})
        }
        })

        
        },
        


        getalloffre: function (req, res) {
            offreModel.find({}).populate('categorie').exec((err, data) => {
                if (err)
                    res.status(500).json
                        ({
                            success: false,
                            message: 'error',
                            errors: err
    
                        })
                else
                    res.status(200).json({
                        message: 'offres',
                        success: true,
                        data: data
                    })
            })
        },
    

    getoffreById: function (req, res) {

        offreModel.findById({_id:req.params.id}).populate('categorie').exec((err, data) =>  {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: 'offres',
                    success: true,
                    data: data
                })
        })
    },

    getoffreBycategorie: function (req, res) {

        offreModel.find({categorie:req.params.id}).populate('condidature').populate('categorie','nomCat').exec((err, data) =>  {
            if (err)
                res.status(500).json
                    ({
                        success: false,
                        message: 'error',
                        errors: err

                    })
            else
                res.status(200).json({
                    message: `liste des offres de category `,
                    success: true,
                    data: data,
                })
        })
    },



 
    deleteoffre: function (req, res) {
        offreModel.findByIdAndDelete({ _id: req.params.id }, (err, offre) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    success: false,
                    errors: err
                })
            } else {
                res.status(200).json({
                    message: 'offre deleted successfuly',
                    success: true,
                    data: offre
                })
            }
        })
    },

    updateoffre: (req, res) => {

        offreModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, offre) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    messge: "error updating offre",
                    erors: err
                })

            } else {
                res.status(200).json({
                    success: true,
                    messge: "offre updated successfuly",
                    data: offre
                })
            }
        })
    },


    Searchoffre: function(req,res){
        offreModel.find({
            $or: [ {title: { $regex: req.params.keyWord, $options: 'i' }}, 
            { contrat: { $regex: req.params.keyWord, $options: 'i' } } ,
            { description: { $regex: req.params.keyWord, $options: 'i' } } ,
            //{ ville: { $regex: req.params.keyWord, $options: 'i' } } ,
           // { recent: { $regex: req.params.keyWord, $options: 'i' } } ,,,,,,???????????????????????????????????
        ]
        } , (err , offres )=> {
            if (err)
            res.status(500).json({
                message: err,
                status: 500
            })
        else
            res.status(200).json({
                message: 'all offres found',
                data:offres
    })
    
    })
}



}
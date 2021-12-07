
const mongoose=require('mongoose')
const Schema = mongoose.Schema
const categorieSchema=new Schema({


    nomCat:{

        type:String,
        required:true

    },

  
    qcm:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:'qcm'

    }]
})


module.exports=new mongoose.model('categorie',categorieSchema)
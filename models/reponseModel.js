
const mongoose=require('mongoose')
const Schema = mongoose.Schema
const reponseSchema=new Schema({

    alternative:{

        type:String,
        required:true

    },

    isCorrect:{
        type:Boolean,
        default:false,
        required:true
    }

})


module.exports= new mongoose.model('reponse',reponseSchema)
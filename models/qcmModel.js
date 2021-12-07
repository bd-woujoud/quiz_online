
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const qcmSchema = new Schema({

    question: {

        type: String,
        required:true

    },
    
    reponses: [
        
        {
            text: {
                type: String,
                required: true
            },

            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],

    categorie: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorie' 

    }

})
module.exports = mongoose.model('qcm', qcmSchema)

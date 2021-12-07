
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testSchema = new Schema({

    score: {
        
        type: Number,
        require: true,
        default :0
        

    },

    questions: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'qcm'
        
    }],



    // answers: [{

    //     qcm: {

    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'qcm'
    //     },

    //     reponse: {

    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'reponse'
    //     },

    //}],

    condidature: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'condidature'
    }],


},

    { timestamps: true }) //lazma fel offre welcondidaturewtest

module.exports = new mongoose.model('test', testSchema)
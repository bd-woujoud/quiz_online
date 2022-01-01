
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testSchema = new Schema({

    score: {
        type: Number,
        require: true,
        default: 0
    },

    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qcm'
    }],


    condidature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'condidature'
    },

    isvalid: {
        type: Boolean,
        default: false
    }

},

    { timestamps: true })

module.exports = new mongoose.model('test', testSchema)

const mongoose =require('mongoose')
const Schema =mongoose.Schema
const offreSchema=new Schema({

title:{

    type:String,
    required:true,
  
},

contrat:{
    
    type:String,
    required:true

},

ville:{
    
    type:String,
    required:true

},

description:{
    
    type:String,
    required:true
   
},

categorie:{

    type:mongoose.Schema.Types.ObjectId,
    ref:'categorie'
},

condidature:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'condidature'
}]

},
{timestamps:true})

module.exports= new mongoose.model('offre',offreSchema)
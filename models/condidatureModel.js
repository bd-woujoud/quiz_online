
const mongoose=require('mongoose')
const Schema =mongoose.Schema

const  condidatureSchema=new Schema({

name:{

    type:String,
  
  
},

lastname:{

    type:String,
   
},

email:{

    type:String, 
   
},

phone:{

    type:Number,
   
},

cv:{

    type:String,
    unique:true

},

offre:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'offre'
},

test:{ //id de test saret fih creation  yet3aba ba3ed mayefctilo test

    type:mongoose.Schema.Types.ObjectId,
    ref:'test'
}

},
{timestamps:true})
module.exports= new mongoose.model('condidature',condidatureSchema)
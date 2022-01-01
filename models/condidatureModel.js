
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
   
   
},

offre:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'offre'
},

test:{ 

    type:mongoose.Schema.Types.ObjectId,
    ref:'test'
},

categorie:{ 

    type:mongoose.Schema.Types.ObjectId,
    ref:'categorie'
}

},
{timestamps:true})
module.exports= new mongoose.model('condidature',condidatureSchema)
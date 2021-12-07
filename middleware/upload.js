
var multer= require("multer");
const path=require("path")
const fs=require("fs")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')  
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })




var upload = multer({ storage: storage })
module.exports=upload







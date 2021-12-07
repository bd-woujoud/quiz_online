
const express=require('express')
const db=require('./config/database')
const bodyParser = require('body-parser');
const port=5000
const app = express()
require('dotenv').config()
 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use('/admin',require('./routers/adminRouter'))
app.use('/category',require('./routers/categorieRouter'))
app.use('/condidature',require('./routers/condidatureRouter'))
app.use('/offre',require('./routers/offreRouter'))
app.use('/reponse',require('./routers/reponseRouter'))
app.use('/qcm',require('./routers/qcmRouter'))
app.use('/test',require('./routers/testRouter'))


app.get("/file/:cv", function (req, res) {
    res.sendFile(__dirname + "/upload/" + req.params.cv);
});



// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req,res, next) {
    let err = new Error();
       err.status = 404;
       next(err);
   });

// handle errors
app.use(function (err, req, res, next) {
    
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: " Path Not found" });
    else
        res.status(500).json({ message: "Something looks wrong " +err});
});
app.listen(port,console.log(`server is running at localhost:${port}`));
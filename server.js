
const express = require('express')
require('./config/database')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
// to read body from request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
const port=process.env.SERVER_URL

app.use('/admin',require('./routers/adminRouter'))
app.use('/category',require('./routers/categorieRouter'))
app.use('/condidatures',require('./routers/condidatureRouter'))
app.use('/offres',require('./routers/offreRouter'))
app.use('/qcms',require('./routers/qcmRouter'))
app.use('/test',require('./routers/testRouter'))

app.get("/file/:cv", function (req, res) {
    res.sendFile(__dirname + "/upload/" + req.params.cv);
});


// handle errors
app.use(function (err, req, res, next) {
    
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: " Path Not found" });
    else
        res.status(500).json({ message: "Something looks wrong " +err});
});
app.listen(process.env.PORT,console.log(`server is running at localhost:${port}`));
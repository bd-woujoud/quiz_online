const reponseController =require('../controllers/reponseController');
const express=require('express');

const route= express.Router();

route.post('/add',reponseController.createreponse)
route.get('/getall',reponseController.getallreponse)
route.get('/getbyid/:id',reponseController.getreponseById)
route.delete('/deletebyid/:id',reponseController.deletereponse)
route.put('/updatebyid/:id',reponseController.updatereponse)



module.exports=route;
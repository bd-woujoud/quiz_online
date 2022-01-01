
const offreController =require('../controllers/offreController');
const express=require('express');
const route= express.Router();

route.post('/',offreController.createoffre)
route.get('/',offreController.getalloffre)
route.get('/getbyid/:id',offreController.getoffreById)
route.get('/getbycat/:id',offreController.getoffreBycategorie)
route.delete('/deletebyid/:id',offreController.deleteoffre)
route.put('/updatebyid/:id',offreController.updateoffre)
route.get('/search',offreController.Searchoffre)


module.exports=route;
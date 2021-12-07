
const offreController =require('../controllers/offreController');
const express=require('express');
const route= express.Router();

route.post('/add',offreController.createoffre)
route.get('/getall',offreController.getalloffre)
route.get('/getbyid/:id',offreController.getoffreById)
route.get('/getbycat/:id',offreController.getoffreBycategorie)
route.delete('/deletebyid/:id',offreController.deleteoffre)
route.put('/updatebyid/:id',offreController.updateoffre)
route.get('/search/:keyWord',offreController.Searchoffre)


module.exports=route;
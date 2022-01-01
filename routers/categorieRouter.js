const categorieController =require('../controllers/categorieController');
const express=require('express');

const route= express.Router();

route.post('/add',categorieController.createCategory)
route.get('/',categorieController.getallcategory)
route.get('/getbyid/:id',categorieController.getByIdcategory)
route.delete('/deletebyid/:id',categorieController.deletecategory)
route.put('/updatebyid/:id',categorieController.updatecategory)

module.exports=route;         
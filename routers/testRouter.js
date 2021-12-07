const testController =require('../controllers/testController');
const express=require('express');

const route= express.Router();

route.post('/add',testController.createtest)
route.get('/getall',testController.getalltest)
route.get('/getbyid/:id',testController.gettestById)
route.delete('/deletebyid/:id',testController.deletetest)
route.put('/updatebyid/:id',testController.updatetest)



module.exports=route;
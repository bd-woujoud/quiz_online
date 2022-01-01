const qcmController =require('../controllers/qcmController');
const express=require('express');
const route= express.Router();

route.post('/add',qcmController.createqcm)
route.get('/getall',qcmController.getallqcm)
route.get('/getbyid/:id',qcmController.getByIdqcm)
route.get('/isCorrect',qcmController.findAlltrue)
route.get('/getbycatid/:id',qcmController.getqcmBycategoryId)
route.delete('/deletebyid/:id',qcmController.deleteqcm)
route.put('/:id',qcmController.updateqcm)

module.exports=route;
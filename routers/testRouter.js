const testController = require('../controllers/testController');
const qcmController = require('../controllers/qcmController')

const express = require('express');
const adminController = require('../controllers/adminController');

const route = express.Router();

route.post('/', testController.createtest, adminController.sendMail)
route.get('/getall', testController.getalltest)
route.get('/getbyid/:id', testController.gettestById)
route.delete('/deletebyid/:id', testController.deletetest)
route.put('/updatebyid/:id', testController.updatetest)

module.exports = route;
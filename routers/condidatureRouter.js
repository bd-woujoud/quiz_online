
const condidatureController = require('../controllers/condidatureController');
const express = require('express');
const upload = require('../middleware/upload')
const route = express.Router();



route.post('/', upload.single('pdf'), condidatureController.createcondidature)
route.get('/', condidatureController.getallcondidature)
route.get('/getbyid/:id', condidatureController.getByIdcondidature)
route.delete('/deletebyid/:id', condidatureController.deletecondidature)
route.put('/updatebyid/:id', condidatureController.updatecondidature)



module.exports = route;

const express = require('express')
const adminController=require('../controllers/adminController');
const isauth = require('../middleware/isauth');
const route = require('express').Router(); 



route.post('/add',adminController.createadmin)
route.post('/login',adminController.login)
route.post('/logout',adminController.logout)
route.post('/sendmail',adminController.sendMail)
route.get('/isauth', isauth, adminController.isAuthenticated)
module.exports=route ;
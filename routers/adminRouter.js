
const express=require('express')
const adminController=require('../controllers/adminController');
const route = require('express').Router(); 



route.post('/addadmin',adminController.createadmin)
route.post('/login',adminController.login)
route.post('/logout',adminController.logout)

route.post('/sendmail',adminController.sendMail)

module.exports=route ;



 

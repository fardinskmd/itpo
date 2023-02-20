const express= require('express')
const route= express.Router()
const login= require('../Controller/login')

const path = require("path")
const multer = require('multer')


var storage = multer.diskStorage({
  destination: 'Upload',


  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
  }
});


var UPLOADS = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
    // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //   cb(null, true);
    // } else {
    //   cb(null, false);
    //    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));}
  }
})



route.post('/login',login.Login)
route.post('/qruser',login.qruser)
route.post('/loginqruser',login.loginqruser)
route.get('/getqrusers',login.getqrusers)



module.exports=route
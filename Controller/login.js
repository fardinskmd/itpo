
const mongoose = require("mongoose")
const login=require('../Model/login')
const qruser=require('../Model/qruser')
const { isMatch } = require('lodash');



// qr user registration api


exports.qruser = async (req, res) => {

  const { name,email,mobile, password } = req.body;
  if (!name || !email || !mobile||!password) {
    return res.status(400).json({ error: "pllzzz fill all field" });
  }
  try {

    const newproductcategory = new qruser({ name,email, mobile, password});
    const productcategorys = await newproductcategory.save();
    if (productcategorys) {
      res.status(200).json({
        Message: "User Added Succsesfully", productcategorys
      });
    }

  } catch (err) {
    console.log(err)
  }
}

// qr user login api


exports.loginqruser = async (req, res) => {

  const { email, password } = req.body;
  let abc=await qruser.findOne({email:req.body.email})
  if(abc){
    if(abc.password==req.body.password){
      return res.status(200).json({ message: "Login Succsesfully"})
    }else{
      return res.status(400).json({ error: "Password Not Mtched"})
    }

  }else{
    return res.status(400).json({ error: "User Not Found"})
  }

}


module.exports.getVarietyByLanguage = async (req, res, next) => {
  let Language = req.params.language;

  let crops = await variety.findOne({language:Language})
  if (crops) {
    return res.status(200).json({ msg: "variety  get successfulley", crops})
  } else {
    return res.status(400).json({ error: "variety not found with given id",crops})
  }
};

// get all product castegory




exports.Login = function (req,res) {
   
  login.findOne({email:req.body.email}, (err, user)=>{
      if(err){
         
          res.status(200).json({message:'server errors'});
      }else if(user==undefined){
          res.status(400).json({message:'User Not Found!',status:404});
      }else{
        res.status(200).json({results:user,message:'login successfully',status:200});
      }
  })
  
}

// get qr users



exports.getqrusers = async (req, res) => {

  try {
    const viewcrop = await qruser.find()
    console.log(viewcrop)
    return res.json(viewcrop);
  } catch (err) {
    res.json({ message: "no crop Found" });
  }
};










const mongoose = require ('mongoose')
const jwt=require('jsonwebtoken')
const Joi=require('joi')
const passwordCompx = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    repassword:{
        type:String,
        required:true
    },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this.id}, process.env.JWTKEY,{expiresIn:"7d"})
    return token
};
const User = mongoose.model("user",userSchema);
const validate = (date) =>{
    const schema = Join.object({
        userName:Joi.string().required().label("Username"),
        email:Joi.string().required().label("E-mail"),
        password:passwordCompx().required().label("Password"),
        repassword:passwordCompx().required().label("Re-Enter Password")
    })
    return schema.validate(data)
};
module.exports = {User,validate}
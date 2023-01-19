const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
   username: {
       type: String,
       trim: true,
       required : [true, 'Enter your username'],
       maxlength: 32
   },
   email: {
       type: String,
       trim: true,
       required : [true, 'Enter a E-mail'],
       unique: true,
       match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Enter your valid email address'
       ]
   },
   password: {
       type: String,
       trim: true,
       required : [true, 'Please add a Password'],
       minlength: [6, 'password must have at least six(6) characters'],
       match: [
           /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
           'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
       ]
   },

}, {timestamps: true});

userSchema.pre('save', async function(next){
   if(!this.isModified('password')){
       next()
   }
   this.password = await bcrypt.hash(this.password, 6);
});

userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}

userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

module.exports = mongoose.model("User", userSchema);
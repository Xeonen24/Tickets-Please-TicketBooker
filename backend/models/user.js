const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
       type: String,
       trim: true,
       required : [true, 'Enter your username'],
       maxlength: 16
   },
   email: {
       type: String,
       trim: true,
       required : [true, 'Enter a E-mail'],
       unique: true,
   },
   password: {
       type: String,
       trim: true,
       required : [true, 'Please add a Password'],
       minlength: [6, 'password must have at least six(6) characters'],
   },
   isAdmin:{
    type: Boolean,
    required: true,
    default: false,
   },

}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
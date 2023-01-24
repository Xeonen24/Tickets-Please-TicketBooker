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

userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
  };
    userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

module.exports = mongoose.model("User", userSchema);
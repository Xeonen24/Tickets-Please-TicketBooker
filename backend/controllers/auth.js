const { json } = require("body-parser");
const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next)=>{
    const {username} = req.body;
    const userExist = await User.findOne({username});
    if (userExist){
     return  next(new ErrorResponse('E-mail already exists', 400))
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.signin = async (req, res, next)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return  next(new ErrorResponse('E-mail and password are required', 400))
        }
        const user = await User.findOne({username});
        if(!user){
            return  next(new ErrorResponse('Invalid credentials', 400))
        }
        const isMatched = await user.comparePassword(password);
        if (!isMatched){
          return  next(new ErrorResponse('Invalid credentials', 400))
        }
        generateToken(user, 200, res);    }
    catch(error){
        console.log(error);
        next(new ErrorResponse('Cannot log in, check your credentials', 400))
    }
}

const generateToken = async (user, statusCode, res) =>{
    const token = await user.jwtGenerateToken();
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 900000)
    };
    res
    .status(statusCode)
    .cookie('token', token, options )
    .json({success: true, token})
}

exports.logout = (req, res, next)=>{
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}

exports.userProfile = async (req, res, next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        sucess: true,
        user
    });
}

exports.singleUser = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            sucess: true,
            user
        })
    } catch (error) {
        next(error)
    }
}
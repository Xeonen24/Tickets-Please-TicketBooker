const router = require('express').Router()
const {User,validate} = require('../models/users')
const bcrypt = require('bcrypt')

router.post('/',async (req,res)=> {
    try{
        const{error}=validate(req.body);
        if(error)
            return res.send({message:error.details[0].message})
        const user = await User.findOne({email:req.body.email});
        if(user)
            return res.send({message:"User already exists"})
        const checks = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPw = await bcrypt.hash(req.body.password,salt)

        await new User({...req.body,password:hashPw}).save();
        res.send({message:"User registered"})
    }catch (error) {
        res.send({message:"Internal error please try again"})
    }
})

module.exports = router
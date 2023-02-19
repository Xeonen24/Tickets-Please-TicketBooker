const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const User = require('../models/user');
const authen = require('../middleware/authen')
const Booking = require('../models/booking');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/register',asyncHandler( async (req, res) => {
    const { username, email, password, password2 } = req.body;
    if(!username || !email || !password || !password2) {
        return res.status(403).json({ error:'Fill in fields missing'})
    }
    try{
        const userExists = await User.findOne({email:email})
        if(userExists){
            return res.status(422).json({error:'User already exists'})
        }else if (password !== password2){
            return res.status(422).json({error:'Password do not match'})
        }else{
            const user = new User({
                username,
                email,
                password,
                password2
             });
             const salt = await bcrypt.genSalt(10);
             user.password = await bcrypt.hash(password, salt);
             user.password2 = await bcrypt.hash(password2, salt);
             await user.save();
        }
        res.status(201).json({message:'User registered'})
    }catch(err){
        console.log(err);
    }  
}));

router.post('/login', asyncHandler(async (req, res) => {
    try{
        let token
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({error:'Please fill in fields'})
        }
        let userSignin = await User.findOne({username});
        
        if(userSignin){
            const isMatch = await bcrypt.compare(password, userSignin.password);
            token = await userSignin.generateAuthToken();
            res.header( 'Access-Control-Allow-Credentials',true);
            res.cookie('jwtoken',token, { maxAge: 900000, httpOnly: false,SameSite: 'Lax'});
            res.send('Cookie set!');
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
            res.status(200).json({message:'User signed in'})
        }else{
            res.status(400).json({message:'Invalid credentials'});
        }
    }catch(err){
        console.log(err)
    }
}));

router.get('/username', authen, asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.userID);
        res.json({ username: user.username });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch username' });
    }
}));
router.post('/logout', asyncHandler( async (req, res) => {
    res.clearCookie('jwtoken');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}))


router.post('/store-booking',authen, asyncHandler(async (req, res) => {
    try {
    const booking = new Booking({
      selectedSeats: req.body.selectedSeats,
      totalPrice: req.body.totalPrice,
      bookingItemTitle: req.body.bookingItemTitle,
      bookingItemId: req.body.bookingItemId,
      selectedTheatre: req.body.selectedTheatre,
      user: req.userID
    });
      await booking.save();
      console.log(`New booking added with ID: ${booking._id}`);
      res.status(201).send('Booking stored successfully'); 
    } catch (err) {
      console.log(err);
      res.status(422).send('Error storing booking');
    }
  }));

router.get('/bookings', authen, asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userID });
    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching bookings');
  }
}));

  

module.exports = router;




// let user = await User.findOne({ email });
// if (user) return res.status(400).json({ msg: 'User already exists' });

// user = new User({
//     username,
//     email,
//     password
// });
// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(password, salt);
// await user.save();
// const payload = { user: { id: user.id } };
// jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
//     if (err) throw err;
//     res.json({ token });
// });


// 
// let user = await User.findOne({ username });
// if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
// const isMatch = await bcrypt.compare(password, user.password);
// if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
// const payload = { user: { id: user.id } };
// jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
//     if (err) throw err;
//     res.json({ token });
// });
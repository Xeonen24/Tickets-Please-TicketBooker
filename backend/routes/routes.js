const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const User = require('../models/user');
const authen = require('../middleware/authen')
const requireAuth = require('../middleware/authen')
const Booking = require('../models/booking');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')('sk_test_51LezboSCzIg6FeOGHiHSBH5v9iWTDm5744OchYIzILo6NoxVmaGDShUIrS37B9V4keAxKdrOhD5n7Ji8t9aVTHJ700bz5Vq9s0');

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

router.post('/update-password', authen, asyncHandler(async (req, res) => {
    try {
      const finduser = await User.findById(req.userID);
      if (finduser) {
        const { password, password2 } = req.body;
        if (password !== password2){
            return res.status(422).json({error:'Password do not match'})
        }else{
            const salt = await bcrypt.genSalt(10);
            finduser.password = await bcrypt.hash(password, salt);
            finduser.password2 = await bcrypt.hash(password2, salt);
            await finduser.save();
            console.log(`Password updated successfully`);
            res.status(201).send('Password updated successfully');
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to update password' });
    }
  }));
  

  router.post('/login', asyncHandler(async (req, res) => {
    try {
      let token;
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Please fill in fields' });
      }
      let userSignin = await User.findOne({ username });
      if (userSignin) {
        const isMatch = await bcrypt.compare(password, userSignin.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }
        token = await userSignin.generateAuthToken();
        userSignin.tokens.push({ token });
        await userSignin.save();
        res.header('Access-Control-Allow-Credentials', true);
        res.cookie('jwtoken', token, { maxAge: 99999999999, httpOnly: false, SameSite: 'Lax' });
        res.status(200).json({ message: 'User signed in' });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to sign in' });
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

router.post('/store-booking', authen, asyncHandler(async (req, res) => {
  try {
    const booking = new Booking({
      selectedSeats: req.body.selectedSeats,
      paymentId: req.body.paymentId,
      totalPrice: req.body.totalPrice,
      bookingItemTitle: req.body.bookingItemTitle,
      bookingItemId: req.body.bookingItemId,
      selectedTheatre: req.body.selectedTheatre,
      showTime:req.body.showTime,
      isPaid: false,
      user: req.userID
    });
    await booking.save();
    console.log(`New booking added with ID: ${booking._id}`);
    if (req.body.isPaid && req.body.isPaid === true) {
      booking.isPaid = true;
      await booking.save();
      console.log(`Booking with ID: ${booking._id} marked as paid`);
    }
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

router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

router.get('/admin', requireAuth, (req, res) => {
  res.render('admin');
});

module.exports = router;

const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const User = require("../models/user");
const authen = require("../middleware/authen");
const Booking = require("../models/booking");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

router.use(cookieParser());

router.post("/register", asyncHandler(async (req, res) => {
  const { username, email, password, password2 } = req.body;
  if (!username || !email || !password || !password2) {
    return res.status(403).json({ error: "Please fill in all details" });
  }
  try {
    const userExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: email });
    if (userExists || emailExists) {
      return res.status(422).json({ error: "User already exists" });
    } else if (password !== password2) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const user = new User({
        username,
        email,
        password,
        password2,
      });
      await user.save();
      res.status(201).json({ message: "User registered" });
      if (res.status === 201) {
        const user = await User.findOne({ username });
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
        res.header('Authorization', `Bearer ${token}`).json({ message: 'Authentication successful' });
      }
    }

  } catch (err) {
    const errors = {};
    if (err.errors) {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
    }
    console.log(errors);
    res.status(422).json({ errors });
  }
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

  res.header('Authorization', `Bearer ${token}`).json({ message: 'Authentication successful' });
}));

router.post(
  "/update-password",
  authen,
  asyncHandler(async (req, res) => {
    try {
      const finduser = await User.findById(req.user.id);
      if (finduser) {
        const { password, password2 } = req.body;
        if (password !== password2) {
          return res.status(422).json({ error: "Password do not match" });
        } else {
          finduser.password = password;
          finduser.password2 = password2;
          await finduser.save();
          res.status(201).send("Password updated successfully");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update password" });
    }
  })
);

router.get(
  "/username",
  authen,
  asyncHandler(async (req, res) => {
    const { id } = req.user;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
);


router.post('/logout', async (req, res) => {
  res.clearCookie("jwtoken", {
    path: '/',
    domain: 'vercel.app',
  });
  req.session.destroy();
  res.clearCookie("connect.sid", {
    path: '/',
    domain: 'vercel.app',
  })
  res.status(200).json({ message: "User signed out" });
});

router.post(
  "/store-booking",
  authen,
  asyncHandler(async (req, res) => {
    try {
      const booking = new Booking({
        selectedSeats: req.body.selectedSeats,
        paymentId: req.body.paymentId,
        totalPrice: req.body.totalPrice,
        bookingItemTitle: req.body.bookingItemTitle,
        bookingItemId: req.body.bookingItemId,
        selectedTheatre: req.body.selectedTheatre,
        showTime: req.body.showTime,
        isPaid: false,
        user: req.user.id,
      });
      await booking.save();
      if (req.body.isPaid && req.body.isPaid === true) {
        booking.isPaid = true;
        await booking.save();
      }
      res.status(201).send("Booking stored successfully");
    } catch (err) {
      console.log(err);
      res.status(422).send("Error storing booking");
    }
  })
);

router.get(
  "/bookings",
  authen,
  asyncHandler(async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.id });
      res.json(bookings);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching bookings");
    }
  })
);

module.exports = router;

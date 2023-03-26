const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  selectedSeats: {
    type: Array,
    default: [],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingItemTitle: {
    type: String,
    required: true,
  },
  bookingItemId: {
    type: String,
    required: true,
  },
  selectedTheatre: {
    type: String,
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  },
  paymentId:{
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

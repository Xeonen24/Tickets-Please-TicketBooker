const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  selectedSeats: {
    type: Array,
    default: [],
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  bookingItemTitle: {
    type: String,
    default: '',
  },
  bookingItemId: {
    type: String,
    default: '',
  },
  selectedTheatre: {
    type: String,
    default: '',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

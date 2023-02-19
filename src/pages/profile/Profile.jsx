import React,{ useEffect, useState } from 'react';
import axios from 'axios';

const Profile=()=> {
    const [bookings, setBookings] = useState([]);
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/bookings', { withCredentials: true })
        .then(response => {
          setBookings(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    useEffect(() => {
      const fetchUsernames = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/username', { withCredentials: true });
          setUsernames(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUsernames();
    }, []);
  return (
    <div>Hi {usernames.username}, this is your profile page.
    <div>
    {bookings.map(booking => (
        <div key={booking._id}>
          <p>{booking.selectedSeats}</p>
          <p>{booking.totalPrice}</p>
          <p>{booking.bookingItemTitle}</p>
          <p>{booking.bookingItemId}</p>
          <p>{booking.selectedTheatre}</p>
          <p>{booking.userId}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Profile
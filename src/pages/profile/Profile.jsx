import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [usernames, setUsernames] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings", { withCredentials: true })
      .then((response) => {
        setBookings(response.data);
        localStorage.setItem("selectedSeats2", JSON.stringify(response.data.map(booking => booking.selectedSeats)));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);  

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/username", {
          withCredentials: true,
        });
        setUsernames(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsernames();
  }, []);

  return (
    <div className="profile-container">
      <h1>Hi {usernames}, this is your profile page.</h1>
      <table>
        <thead>
          <tr>
            <th>Selected Seats</th>
            <th>Total Price</th>
            <th>Movie Title</th>
            <th>Movie ID</th>
            <th>Theatre</th>
            <th>Show Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>
               <div>{booking.selectedSeats}</div>
              </td>
              <td>{booking.totalPrice}</td>
              <td>{booking.bookingItemTitle}</td>
              <td>{booking.bookingItemId}</td>
              <td>{booking.selectedTheatre}</td>
              <td>{booking.showTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;

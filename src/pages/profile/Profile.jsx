import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [usernames, setUsernames] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPaymentId, setShowPaymentId] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;
  const [title, setTitle] = useState("TicketsPlease | Profile");

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings", {
          withCredentials: true,
        });
        const formattedBookings = response.data.map((booking) => {
          return { ...booking, selectedSeats: booking.selectedSeats };
        });
        setBookings(formattedBookings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
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

  const togglePaymentId = () => {
    setShowPaymentId(!showPaymentId);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const changePw = {
        password,
        password2,
      };
      try {
        const config = {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(changePw);
        const res = await axios.post(
          "http://localhost:5000/api/update-password",
          body,
          config
        );
        console.log(res.data);
        alert("Successfully changed password");
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className="profile-container">
      <h1>Hi {usernames}, welcome to your profile page.</h1>
      {bookings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Selected Seats</th>
              <th>Total Price</th>
              <th>Movie Title</th>
              <th>Movie ID</th>
              <th>Theatre</th>
              <th>Show Time</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.selectedSeats.join(", ")}</td>
                <td>{booking.totalPrice}</td>
                <td>{booking.bookingItemTitle}</td>
                <td>{booking.bookingItemId}</td>
                <td>{booking.selectedTheatre}</td>
                <td>{booking.showTime}</td>
                <td>
      <a className="none" onClick={togglePaymentId}>
        {showPaymentId ? booking.paymentId : "Click to reveal"}
      </a>
    </td>
  </tr>
))}

        </tbody>
      </table>
    ) : (
      <h2>Looks like you haven't made any bookings yet.</h2>
    )}
      <div>
      <button className="green_btn" onClick={() => setShowForm(!showForm)}>Change Password</button>
      </div>
      {showForm && (
      <form method ="POST" className="form_containerss" onSubmit={e => onSubmit(e)}>
						<h1>Change Password</h1>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={e => onChange(e)}
							required
							className="input inputs"
						/>
						<input
							type='password'
							placeholder='Re-Enter Password'
							name='password2'
							value={password2}
							onChange={e => onChange(e)}
							required
							className="input inputs"
						/>
						<button type="submit" className="green_btn">
							Update Password
						</button>
					</form>
      )}
    </div>
  );
};
export default Profile;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./book-page.scss";
import logo from "../../assets/screen-thumb.png";
import axios from "axios";
import FetchPoster from "../FetchPoster";
import { loggedIN } from "../../App";

const BookPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [overview, setOverview] = useState("");
  const [title, setTitle] = useState("TicketsPlease | Booking");

  useEffect(() => {
    document.title = title;
    if (loggedIN) {
      return;
    } else {
      window.location.href = "/login";
    }
  }, [title]);

  const selectSeat = (rowIndex, seatNumber, seatType) => {
    const seatId = `${seatType}${seatNumber + 1}`;
    const seat = [seatType, seatNumber + 1];
    const seatAlreadySelected = selectedSeats.some(
      (selectedSeat) =>
        JSON.stringify(selectedSeat.slice(0, 2)) === JSON.stringify(seat)
    );

    if (seatAlreadySelected) {
      const updatedSelectedSeats = selectedSeats.filter(
        (selectedSeat) =>
          JSON.stringify(selectedSeat.slice(0, 2)) !== JSON.stringify(seat)
      );
      setSelectedSeats(updatedSelectedSeats);
      setTotalPrice(totalPrice - getSeatPrice(seatType));
    } else {
      setSelectedSeats([...selectedSeats, seat.concat(seatId)]);
      setTotalPrice(totalPrice + getSeatPrice(seatType));
    }
  };

  const getSeatPrice = (seatType) => {
    if (seatType === "bronze") {
      return 250;
    } else if (seatType === "silver") {
      return 350;
    } else if (seatType === "gold") {
      return 500;
    } else {
      return 0;
    }
  };

  const renderSeats = () => {
    const seats = [];

    const rowCount = 7;
    let seatNumber = 1;

    const renderRow = (rowIndex, rowType) => {
      const rows = [];

      const seatCount = 10;
      const rowNumber = rowIndex + 1;

      for (let j = 0; j < seatCount; j++) {
        const seatId = `${rowType}-${rowNumber}-${j + 1}`;
        const seat = [rowIndex, j, rowType, seatId];
        const seatSelected = selectedSeats.some(
          (selectedSeat) =>
            JSON.stringify(selectedSeat) === JSON.stringify(seat)
        );

        rows.push(
          <div
            key={seatId}
            id={seatId}
            className={`seat ${seatSelected ? "selected" : ""}`}
            onClick={() => {
              selectSeat(rowIndex, j, rowType);
              const selectedSeat = document.getElementById(seatId);
              if (selectedSeat.classList.contains("selected")) {
                selectedSeat.classList.remove("selected");
              } else {
                selectedSeat.classList.add("selected");
              }
            }}
          ></div>
        );
        seatNumber++;
      }

      seats.push(
        <div key={rowIndex} className="row">
          <h5 className="subtitle">{`${rowType} row ${rowNumber}`}</h5>
          {rows}
        </div>
      );
    };

    for (let i = 0; i < rowCount; i++) {
      if (i <= 1) {
        renderRow(i, "bronze");
      } else if (i >= 2 && i <= 4) {
        renderRow(i, "silver");
      } else {
        renderRow(i, "gold");
      }
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("totalPrice", totalPrice);

    return seats;
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("jwtToken");
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    const amount = totalPrice;

    if (amount === "") {
      alert("Please enter an amount");
    } else {
      const options = {
        key: process.env.REACT_APP_RZPAYKEY,
        key_secret: process.env.REACT_APP_RZPAYKEYSECRET,
        amount: amount * 100,
        currency: "INR",
        name: "TicketsPlease Merchant",
        handler: function (response) {
          const bookingData = {
            selectedSeats,
            totalPrice,
            paymentId: response.razorpay_payment_id,
            bookingItemTitle: localStorage.getItem("bookingItemTitle"),
            bookingItemId: localStorage.getItem("bookingItemId"),
            selectedTheatre: localStorage.getItem("selectedTheatre"),
            showTime: localStorage.getItem("selectedShowTime"),
            isPaid: true,
          };

          axios
            .post(
              `${process.env.REACT_APP_URL}/api/store-booking`,
              bookingData,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              if (res.status === 201) {
                alert(
                  `You have booked ${selectedSeats.length} seat(s) for a total price of ${totalPrice} INR`
                );
                window.location.href = "/profile";
              } else {
                throw new Error("Error processing payment");
              }
            });
        },
        notify: {
          sms: true,
          email: true,
        },
        notes: {
          address: "Alibag, 402201",
        },
        theme: {
          color: "black",
        },
      };
      const pay = new window.Razorpay(options);
      pay.open();
    }
  };

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (!history.location.pathname.startsWith("/booking-page")) {
        localStorage.removeItem("bookingItemTitle");
        localStorage.removeItem("bookingItemId");
        localStorage.removeItem("selectedTheatre");
        localStorage.removeItem("selectedShowTime");
        localStorage.removeItem("totalPrice");
      }
    });
    return () => {
      unlisten();
    };
  }, [history]);

  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: process.env.REACT_APP_TMDBKEY,
  };

  const fetchMovieOverview = async (movieId) => {
    const url = `${apiConfig.baseUrl}movie/${movieId}?api_key=${apiConfig.apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.overview;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  useEffect(() => {
    const itemId = localStorage.getItem("bookingItemId").replace(/"/g, "");
    const url = `${apiConfig.baseUrl}movie/${itemId}?api_key=${apiConfig.apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        fetchMovieOverview(data.id).then((overview) => setOverview(overview));
      })
      .catch((error) => console.error(error));
  }, []);
  if (!movie) return null;

  return (
    <div className="booking">
      <div className="yo">
        <FetchPoster />
        <div className="infomovie">
          <h2>
            Movie : {localStorage.getItem("bookingItemTitle").replace(/"/g, "")}
          </h2>
          &nbsp;
          <h4>{overview}</h4>
          &nbsp;
          <h4>Show Time : {localStorage.getItem("selectedShowTime")}</h4>
          &nbsp;
          <h3>Theatre Name: {localStorage.getItem("selectedTheatre")}</h3>
          &nbsp;
        </div>
      </div>
      <hr></hr>
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Empty</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      <div className="containers">
        <div className="movie-screen">
          <img src={logo} alt="screen" />
        </div>
        Eyes this way please!
        <div className="row-container">
          {renderSeats()}
          &nbsp;
          <h5 className="subtitle">Seats Legend</h5>
          <hr />
          <h5 className="subtitle">
            <span style={{ color: "rgb(205, 127, 50)" }}>Bronze</span> - ₹250
          </h5>
          <h5 className="subtitle">
            <span style={{ color: "rgb(192, 192, 192)" }}>Silver</span> - ₹350
          </h5>
          <h5 className="subtitle">
            <span style={{ color: "rgb(255, 215, 0)" }}>Gold</span> - ₹500
          </h5>
          <div className="text-wrapper">
            <p className="text">
              Selected Seats <span id="count">{selectedSeats.length}</span>
            </p>
            <p className="text">
              Total Price ₹<span id="total">{totalPrice}</span>
            </p>
            <button onClick={handleConfirm}>Book Seats</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;

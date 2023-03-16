import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./book-page.scss";
import logo from "../../assets/screen-thumb.png";
import axios from "axios";

const BookPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  const selectSeat = (rowIndex, seatIndex, seatType) => {
    const selectedSeat = [rowIndex, seatIndex, seatType];
    const seatAlreadySelected = selectedSeats.some(
      (seat) => JSON.stringify(seat) === JSON.stringify(selectedSeat)
    );

    if (seatAlreadySelected) {
      const updatedSelectedSeats = selectedSeats.filter(
        (seat) => JSON.stringify(seat) !== JSON.stringify(selectedSeat)
      );
      setSelectedSeats(updatedSelectedSeats);
      setTotalPrice(totalPrice - getSeatPrice(seatType));
    } else {
      setSelectedSeats([...selectedSeats, selectedSeat]);
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

    const columnCount = 10;

    for (let i = 0; i < 2; i++) {
      const rows = [];

      for (let j = 0; j < columnCount; j++) {
        const seatId = `A${j + 1}${i}`;
        const seat = [i, j, "bronze", seatId];
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
              selectSeat(i, j, "bronze");
              const selectedSeat = document.getElementById(seatId);
              if (selectedSeat.classList.contains("selected")) {
                selectedSeat.classList.remove("selected");
              } else {
                selectedSeat.classList.add("selected");
              }
            }}
          />
        );
      }

      seats.push(
        <div key={i} className="row">
          {rows}
          <h5 className="subtitle">Bronze row</h5>
        </div>
      );
    }

    for (let i = 3; i < 6; i++) {
      const rows = [];

      for (let j = 0; j < columnCount; j++) {
        const seatId = `B${j + 1}${i}`;
        const seat = [i, j, "silver", seatId];
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
              selectSeat(i, j, "silver");
              const selectedSeat = document.getElementById(seatId);
              if (selectedSeat.classList.contains("selected")) {
                selectedSeat.classList.remove("selected");
              } else {
                selectedSeat.classList.add("selected");
              }
            }}
          />
        );
      }

      seats.push(
        <div key={i} className="row">
          {rows}
          <h5 className="subtitle">Silver row</h5>
        </div>
      );
    }

    for (let i = 7; i < 9; i++) {
      const rows = [];

      for (let j = 0; j < columnCount; j++) {
        const seatId = `C${j + 1}${i}`;
        const seat = [i, j, "gold", seatId];
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
              selectSeat(i, j, "gold");
              const selectedSeat = document.getElementById(seatId);
              if (selectedSeat.classList.contains("selected")) {
                selectedSeat.classList.remove("selected");
              } else {
                selectedSeat.classList.add("selected");
              }
            }}
          />
        );
      }

      seats.push(
        <div key={i} className="row">
          {rows}
          <h5 className="subtitle">Gold row</h5>
        </div>
      );
    }
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("totalPrice", totalPrice);

    return seats;
  };
  const handleConfirm = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    const bookingData = {
      selectedSeats,
      totalPrice,
      bookingItemTitle: localStorage.getItem("bookingItemTitle"),
      bookingItemId: localStorage.getItem("bookingItemId"),
      selectedTheatre: localStorage.getItem("selectedTheatre"),
      showTime: localStorage.getItem('selectedShowTime'),
    };

    const res = await axios.post(
      "http://localhost:5000/api/store-booking",
      bookingData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 201) {
      alert(
        `You have booked ${selectedSeats.length} seat(s) for a total price of ${totalPrice} USD`
      );
    } else {
      throw new Error("Error storing booking");
    }
  };

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (!history.location.pathname.startsWith("/booking-page")) {
        localStorage.removeItem("bookingItemTitle");
        localStorage.removeItem("bookingItemId");
        localStorage.removeItem("selectedTheatre");
        localStorage.removeItem('selectedShowTime')
      }
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <div className="booking">
      <h2>Movie : {localStorage.getItem("bookingItemTitle")}</h2>
      <h5>Show Time : {localStorage.getItem("selectedShowTime")}</h5>
      &nbsp;
      <h3>Theatre Name: {localStorage.getItem("selectedTheatre")}</h3>
      &nbsp;
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

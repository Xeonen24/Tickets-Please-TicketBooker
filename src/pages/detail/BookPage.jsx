import React, { useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import './book-page.scss';
import logo from '../../assets/screen-thumb.png'

const BookPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  
  const selectSeat = (rowIndex, seatIndex, seatType) => {
    const selectedSeat = [rowIndex, seatIndex, seatType];
    const seatAlreadySelected = selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify(selectedSeat));
  
    if (seatAlreadySelected) {
      const updatedSelectedSeats = selectedSeats.filter(seat => JSON.stringify(seat) !== JSON.stringify(selectedSeat));
      setSelectedSeats(updatedSelectedSeats);
      setTotalPrice(totalPrice - getSeatPrice(seatType));
    } else {
      setSelectedSeats([...selectedSeats, selectedSeat]);
      setTotalPrice(totalPrice + getSeatPrice(seatType));
    }
  }
  
  const getSeatPrice = (seatType) => {
    if (seatType === 'bronze') {
      return 250;
    } else if (seatType === 'silver') {
      return 350;
    } else if (seatType === 'gold') {
      return 500;
    } else {
      return 0;
    }
  }
  const renderSeats = () => {
    const seats = [];
  
    for (let i = 0; i < 2; i++) {
      seats.push(
        <div className="row" key={i}>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 0, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 0, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 1, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 1, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 2, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 2, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 3, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 3, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 4, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 4, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 5, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 5, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 6, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 6, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 7, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 7, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 8, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 8, 'bronze')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 9, 'bronze'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 9, 'bronze')}></div>
          &nbsp;
        </div>
      );
    }
    for (let i = 3; i < 6; i++) {
      seats.push(
        <div className="row" key={i}>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 0, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 0, 'silver')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 1, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 1, 'silver')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 2, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 2, 'silver')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 3, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 3, 'silver')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 4, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 4, 'silver')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 5, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 5, 'silver')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 6, 'sivler'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 6, 'sivler')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 7, 'sivler'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 7, 'sivler')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 8, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 8, 'silver')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 9, 'silver'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 9, 'silver')}></div>
        </div>
      );
    }
  
    for (let i = 6; i < 8; i++) {
      seats.push(
        <div className="row" key={i}>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 0, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 0, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 1, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 1, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 2, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 2, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 3, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 3, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 4, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 4, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 5, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 5, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 6, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 6, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 7, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 7, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 8, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i,8, 'gold')}></div>
          <div className={`seat ${selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([i, 9, 'gold'])) ? "selected" : ""}`} onClick={() => selectSeat(i, 9, 'gold')}></div>
        </div>
      );
    }
    return seats;
  }
  
  useEffect(() => {
    const unlisten = history.listen(() => {
        if (!history.location.pathname.startsWith("/booking-page")) {
            localStorage.removeItem("bookingItemTitle");
            localStorage.removeItem("bookingItemId");
        }
    });
    return () => {
        unlisten();
    };
}, [history]);
  
  return (
    <div className='booking'>
         <h2>Movie : {localStorage.getItem('bookingItemTitle')}</h2>
         <h5>Movie ID : {localStorage.getItem('bookingItemId')}</h5>
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
          <img src={logo} alt='screen' />
        </div>
        Eyes this way please!
        <div className="row-container">
          {renderSeats()}
          &nbsp;
          <h5 className='subtitle'>Seats Legend</h5>
          <hr/>
          <h5 className='subtitle'><span style={{ color: 'rgb(205, 127, 50)' }}>Bronze</span> - ₹250</h5>
          <h5 className='subtitle'><span style={{ color: 'rgb(192, 192, 192)' }}>Silver</span> - ₹350</h5>
          <h5 className='subtitle'><span style={{ color: 'rgb(255, 215, 0)' }}>Gold</span> - ₹500</h5>
          <div className="text-wrapper">
            <p className="text">Selected Seats <span id='count'>{selectedSeats.length}</span></p>
            <p className="text">Total Price ₹<span id="total">{totalPrice}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage

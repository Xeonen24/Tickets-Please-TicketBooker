import React, { useState, useEffect } from 'react';
import './theatreselect.css';

function TheatreSelect() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [showTimes, setShowTimes] = useState([]);
  const [selectedShowTime, setSelectedShowTime] = useState('');

  async function fetchLocation() {
    const response = await fetch(`https://nominatim.openstreetmap.org/search.php?city=${city}&format=json&addressdetails=1&limit=1`);
    const data = await response.json();
    if (data.length > 0) {
      setLocation({
        latitude: data[0].lat,
        longitude: data[0].lon  
      });
    }
  }  
  
  useEffect(() => {
    if (location) {
      async function fetchTheatres() {
        const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=INOX,${city}&format=json&addressdetails=0&limit=10&lat=${location.latitude}&lon=${location.longitude}&radius=500`);
        const data = await response.json();
        setTheatres(data);
      }      
      fetchTheatres();
    }
  }, [location,city]);

  function handleCityChange(event) {
    setCity(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    fetchLocation();
  }
  function handleTheatreSelection(theatre) {
    const selectedTheatre = theatre.split(',', 3).join(',');
    setSelectedTheatre(selectedTheatre);
    localStorage.setItem('selectedTheatre', selectedTheatre);
    setShowTimes(['9:00 AM - 11:30 AM', '12:00 PM - 2:30 PM', '3:00 PM - 5:30 PM', '6:00 PM - 8:30 PM', '9:00 PM - 11:30 PM']);
  }  
  function handleShowTimeSelection(event) {
    const showTime = event.target.value;
    setSelectedShowTime(showTime);
    localStorage.setItem('selectedShowTime', showTime);
    alert(`Selected show time: ${localStorage.getItem('selectedShowTime')}`);
  }
  function handleConfirm(){
    window.location.href='/booking-page'
  }
  
  return (
    <div className='theatreselect'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='city-input'>
          Enter a city within Maharashtra :
          &nbsp;&nbsp;<input id='city-input' type="text" value={city} onChange={handleCityChange} />
        </label>
        <button className="subbutton" type="submit">Find Theatres</button>
      </form>
      {theatres.length > 0 ? (
        <div className='theatre-list'>
          <h2 className='heading-title'>Nearby Theatres</h2>
          <ul>
            {theatres.map((theatre, index) => (
              <li key={index}>
                <button onClick={() => handleTheatreSelection(theatre.display_name)} className={theatre.display_name === selectedTheatre ? 'selected' : ''}>
                  {theatre.display_name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {showTimes.length > 0 ? (
        <div className='show-times'>
          <h2 className='heading-titles'>Show Times</h2>
          <select value={selectedShowTime} onChange={handleShowTimeSelection}>
          <option value="">Select a show time</option>
          {showTimes.map((showTime, index) => (
        <option key={index} value={showTime}>
          {showTime}
        </option>
      ))}
    </select>
  </div>
) : null}
{selectedShowTime ? (

<div className='confirmation'>
  <p>You have selected the {selectedShowTime} show time.</p>
  <button onClick={handleConfirm}>Confirm</button>
</div>
) : null}
</div>
);
}

export default TheatreSelect;





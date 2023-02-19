import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './theatreselect.css';

function TheatreSelect() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const history = useHistory();

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
    history.push('/booking-page');
  }  
  
  return (
    <div className='theatreselect'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='city-input'>
          City:
          <input id='city-input' type="text" value={city} onChange={handleCityChange} />
        </label>
        <button type="submit">Find Theatres</button>
      </form>
      {theatres.length > 0 ? (
        <div className='theatre-list'>
          <h2>Nearby Theatres</h2>
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
    </div>
  );
}

export default TheatreSelect;
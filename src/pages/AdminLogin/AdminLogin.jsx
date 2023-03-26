import React, { useState } from 'react';
import axios from 'axios';
import './admin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin-login', { username, password });
      if (response.status === 200) {
        window.location.href = 'http://localhost:5000/admin';
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while logging in');
    }
  };
  return (
    <form className="form-containerssss" onSubmit={handleSubmit}>
      <label>
        Username:
        <input className="input" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Log in</button>
    </form>
  );
};

export default AdminLogin;
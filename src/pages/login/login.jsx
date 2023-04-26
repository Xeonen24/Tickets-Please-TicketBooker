import { useState,useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { UserContext } from "../../App";
import axios from "axios";
const Login = () => {

	const {state, dispatch} = useContext(UserContext)
	const [formData, setFormData] = useState({
		username: '',
		password: ''
		});
	const { username, password } = formData;
	
	const [title, setTitle] = useState('TicketsPlease | Login');

	useEffect(() => {
	  document.title = title;
	}, [title]);

	const onChange = e =>
	setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const response = await axios.post('http://localhost:5000/api/login', {
			username,
			password
		  }, {
			withCredentials: true,
			headers: {
			  'Content-Type': 'application/json'
			}
		  });
	  
		  if (response.status === 400) {
			window.alert('Invalid credentials');
		  } else {
			window.alert('Login successful');
			localStorage.setItem('isLoggedIn', true);
			window.location.href = '/';
		  }
		} catch (error) {
		  console.error(error);
		}
	  };
    return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form method ="POST"className="form_container" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={e => onChange(e)}
							value={username}
							required
							className="inputs"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={e => onChange(e)}
							value={password}
							required
							className="inputs"
						/>
						<button type="submit" className="green_btns">
							Sign in
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<span className="white_btns"> Register</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login


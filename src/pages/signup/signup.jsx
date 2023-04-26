import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: ''
	});
	const { username, email, password, password2 } = formData;
	const [title, setTitle] = useState('TicketsPlease | Signup');

	useEffect(() => {
	  document.title = title;
	}, [title]);
  
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match');
		} else {
			const newUser = {
				username,
				email,
				password,
				password2
			};
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};
				const body = JSON.stringify(newUser);
				const res = await axios.post('http://localhost:5000/api/register', body, config);
				console.log(res.data);
				localStorage.setItem("username", username);
				window.location.href='/login'
			} catch (err) {
				console.error(err.response.data);
			}
		}
	};
    return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="left">
					<h1>Welcome Back</h1>
					<Link to="/login">
							<span className="white_btn">Sign In</span>
					</Link>
				</div>
				<div className="right">
					<form className="form_container" onSubmit={e => onSubmit(e)}>
						<h1>Create Account</h1>
						<input
							type='text'
							placeholder='Username'
							name='username'
							value={username}
							onChange={e => onChange(e)}
							required
							className="input"
						/>
						<input
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={e => onChange(e)}
							required
							className="input"
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={e => onChange(e)}
							required
							className="input"
						/>
						<input
							type='password'
							placeholder='Re-Enter Password'
							name='password2'
							value={password2}
							onChange={e => onChange(e)}
							required
							className="input"
						/>
						<button type="submit" className="green_btn">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;

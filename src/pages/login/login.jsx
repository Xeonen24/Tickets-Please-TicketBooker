import { useState,useContext } from "react";
import { Link,useHistory } from "react-router-dom";
import "./login.css";
import { UserContext } from "../../App";
import axios from "axios";
const Login = () => {

	const {state, dispatch} = useContext(UserContext)
	const history = useHistory()
	const [formData, setFormData] = useState({
		username: '',
		password: ''
		});
	const { username, password } = formData;
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
			localStorage.setItem('username', username);
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
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={e => onChange(e)}
							value={password}
							required
							className="input"
						/>
						<button type="submit" className="green_btn">
							Sign in
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn">
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login


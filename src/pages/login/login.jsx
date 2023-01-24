import { useState,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";
import { UserContext } from "../../App";
const Login = () => {

	const {state, dispatch} = useContext(UserContext)
	const [formData, setFormData] = useState({
		username: '',
		password: ''
		});
	const { username, password } = formData;
	const onChange = e =>
	setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
			const config = {
				headers: {
					'Content-Type': 'application/json'
			}
			};
			const body = JSON.stringify({ username, password });
			const res = await axios.post('http://localhost:5000/api/login', body, config);
      		localStorage.setItem('token', res.data.token);
			localStorage.setItem("isLoggedIn", true);
			dispatch({type:"USER",payload:true})
			console.log(res);
			window.location.href='/'
			} catch (err) {
				console.error(err.response.data);
			}
		};
    return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
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


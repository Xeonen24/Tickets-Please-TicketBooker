import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast} from 'react-toastify';
import "./signup.css";

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password:''
    });
    const {username, email, password} = values;
    const handleChange = name => (e) =>{
        setValues({...values, [name]: e.target.value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:5000/api/signup', {
                username,
                email,
                password
            });
            console.log(data);
            if  (data.success === true){
                setValues({username: '', email: '', password:''});
                toast.success("Sign up successfully, please Login!");
            }
        } catch(err){
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
        }
    }
    return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sing in
						</button>
					</Link>
				</div>
				<div className="right">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange("username")}
							value={username}
							required
							className="input"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange("email")}
							value={email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange("password")}
							value={password}
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

import { useState } from "react";
import axios from "axios";
import { toast} from 'react-toastify';
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {

    const [values, setValues] = useState({
        username: 'xeeee',
        password:'asdfgh123'
 
    });

    const { username, password} = values;

    const handleChange = username => (e) =>{
        setValues({...values, [username]: e.target.value});
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:5000/api/signin', {
                username,
                password
            });

            console.log(data);

            if  (data.success === true){
                setValues({ username: '', password:''});
                toast.success("Log In successfully");
                localStorage.setItem("token", JSON.stringify(data))
				window.location = "/";
            }
            

        } catch(err){
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
         
        }
    }
    
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
							onChange={handleChange("username")}
							value={username}
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
							Sing In
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


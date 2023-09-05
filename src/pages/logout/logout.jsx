import React, {useContext,useEffect,useState} from 'react';
import axios from "axios";
import { toast} from 'react-toastify';
import { UserContext } from "../../App";

const Logout = async() =>{
    const { state, dispatch } = useContext(UserContext);
    const [title, setTitle] = useState('Logging out....');

	useEffect(() => {
	  document.title = title;
	}, [title]);
    try{
        
        const token = localStorage.getItem("jwtToken");
        const response = await axios.post(
            `${process.env.REACT_APP_URL}/api/logout`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            }
          );
            toast.success('Log out successfully');
            localStorage.removeItem("jwtToken");
            dispatch({type:"USER",payload:false})
            window.location.href='/';
    }
    catch(error) {
        console.log(error);
    }
    return(
        <div>
            If you stay on this page that means logout function failed otherwise please wait a moment
        </div>
    )
}

export default Logout
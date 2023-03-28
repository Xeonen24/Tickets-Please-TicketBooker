import React, {useContext } from 'react';
import axios from "axios";
import { toast} from 'react-toastify';
import { UserContext } from "../../App";

const Logout = async() =>{
    const { state, dispatch } = useContext(UserContext);
    try{
        const res = await axios.post('http://localhost:5000/api/logout');
            toast.success('Log out successfully');
            localStorage.removeItem('token');
            dispatch({type:"USER",payload:false})
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("data")
            localStorage.removeItem('username')
            document.cookie = "jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
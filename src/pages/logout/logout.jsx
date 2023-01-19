import React, {useContext } from 'react';
import axios from "axios";
import {useHistory } from 'react-router-dom';
import { toast} from 'react-toastify';
import { UserContext } from "../../App";

const Logout = () =>{
    const { state, dispatch } = useContext(UserContext);
    let history = useHistory();
    try{
        axios.get('http://localhost:5000/api/logout')
        .then(res =>{
            toast.success('Log out successfully');
            localStorage.removeItem('token');
            dispatch({type:"USER",payload:false})
            localStorage.removeItem("isLoggedIn");
            history.push('/');
            window.location.reload();
        })
        .catch(error =>{
            console.log(error);
        })
    }
    catch(error) {
        console.log(error);
    }
    return(
        <>
            asd
        </>
    )
}
export default Logout
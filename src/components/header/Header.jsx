import React, { useRef, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from "axios";
import { toast} from 'react-toastify';
import './header.scss';
import logo from '../../assets/tmovie.png';

const Header = () => {
    let history = useHistory();
    const headerRef = useRef(null);
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);
    const logOut = () =>{
        axios.get('http://localhost:5000/api/logout')
        .then(result =>{
            toast.success('Log out successfully');
            localStorage.removeItem('token');
            history.push('/');
        })
        .catch(error =>{
            console.log(error);
        })

    }

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">CinemaSeatsDirect</Link>
                </div>
                <ul className="header__nav">
                    <li>
                        <Link to="/movie" style={{textDecoration: "none"}}>Movies</Link>
                    </li>
                    <li>
                        <Link to="/tv" style={{textDecoration: "none"}}>TV Series</Link>
                    </li>
                    <li>
                        <Link to="/login">Sign in/up</Link>
                    </li>
                    <li>
                        <Link to="" onClick={logOut} >Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default Header;

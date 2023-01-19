import React, { useRef, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/tmovie.png';
import { UserContext } from "../../App";
import {loggedIN} from '../../App'
import axios from 'axios';



const Header = () => {
    const {state,dispatch} = useContext(UserContext)
    const headerRef = useRef(null);
    const getUser = () =>{
        axios.get('http://localhost:5000/api/user/:id')
            .then(response => {
                this.setState({
                    user: response.data.user
                });
            })
            .catch(err => console.log(err));
    }
    const NavMenu = () =>{
        if(state,loggedIN){
            return(
                <>
                <li>
                 <Link to="/movie" style={{textDecoration: "none"}}>Movies</Link>
                </li>
                <li>
                 <Link to="/tv" style={{textDecoration: "none"}}>TV Series</Link>
                </li>
                <li>
                <Link to="/logout"></Link>
                </li>
                </>
            )
        }else{
            return (
                <>
                <li>
                 <Link to="/movie" style={{textDecoration: "none"}}>Movies</Link>
                </li>
                <li>
                 <Link to="/tv" style={{textDecoration: "none"}}>TV Series</Link>
                </li>
                <li>
                 <Link to="/login">Sign in/up</Link>
                </li>
                </>
            )
        }
    }
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

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">CinemaSeatsDirect</Link>
                </div>
                <ul className="header__nav">
                    <NavMenu />
                </ul>
            </div>
        </div>
    );

}

export default Header;

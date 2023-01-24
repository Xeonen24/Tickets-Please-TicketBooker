import React, { useRef, useEffect,useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/tmovie.png';
import { UserContext } from "../../App";
import {loggedIN} from '../../App'

const Header = () => {

    const {state,dispatch} = useContext(UserContext)

    const [navbarClass, setNavbarClass] = useState('');

    const handleClick = () => {
      setNavbarClass('onclick');
    };


    const headerRef = useRef(null);
    const [isOpen, setIsOpen] =React.useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const [navbarOnClick, setnavbarOnClick] = useState(false);

    const NavMenu = () =>{
        
        if(state,loggedIN){
            return(
                <>
                <li>
                    <Link to="/movie" style={{ textDecoration: "none" }}>
                    Movies
                    </Link>
                </li>
                <li>
                    <Link to="/tv" style={{ textDecoration: "none" }}>
                    TV Series
                    </Link>
                </li>
                <li>
                <Link to="#" style={{textDecoration: "none"}}>Book Now</Link>  
                </li>
                <div className='navbar'>
                  <li className={`navbar ${navbarClass}`} onClick={toggleMenu}>
                        <Link to="#">{loggedIN}</Link>
                        {isOpen && (
                        <ul>
                            <div className='curveNav'>
                            <li>
                            <Link to="#">Profile</Link>
                            </li>
                            <li>
                            <Link to="/logout">Logout</Link>
                            </li>
                            <li>
                            <Link to="#">Cancel</Link>
                            </li>
                            </div>
                        </ul>
                        )}
                    </li>
                </div>
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
                <Link to="/">
                    <img className="logologo" src={logo} alt="" />

                <span className='logo-text'>CinemaSeatsDirect</span></Link>
                </div>
                <ul className="header__nav">
                    <NavMenu />
                </ul>
            </div>
        </div>
    );

}

export default Header;

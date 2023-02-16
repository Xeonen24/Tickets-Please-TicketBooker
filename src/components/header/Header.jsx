import React, { useRef, useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/tmovie.png';
import {loggedIN} from '../../App'

const Header = () => {

    const headerRef = useRef(null);
    const [showHr, setShowHr] = useState(false);
    const [isOpen, setIsOpen] =React.useState(false);

    useEffect(() => {

    }, []);
    useEffect(() => {
        function handleScroll() {
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            setShowHr(true);
          } else {
            setShowHr(false);
          }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const NavMenu = () =>{
        
        if(loggedIN){
            return(
                <>
                <li>
                <Link to="/book-movie" style={{textDecoration: "none"}}>Book Now</Link>  
                </li>
                <div className='navbar'>
                  <li className={`navbar`} onClick={toggleMenu}>
                        <Link to="#">{localStorage.getItem('username')}</Link>
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

                <span className='logo-text'>TicketsPlease?</span></Link>
                </div>
                <ul className="header__nav">
                    <NavMenu />
                </ul>
            </div>
            {showHr && <hr className="footerHr" />}
        </div>
    );

}

export default Header;

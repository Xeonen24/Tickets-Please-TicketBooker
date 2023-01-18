import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/tmovie.png';

const Header = () => {
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
                        <Link to="/login">LOGIN</Link>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default Header;

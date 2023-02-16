import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';

const Footer = () => {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);
    const currentYear = currentDate.getFullYear();
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                        TicketsPlease?</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us</Link>
                    </div>
                </div>
            </div>
            <hr className="footerHr"/>
            <div className='rightsReserved'>
            <a href='#'>©TicketsPlease?</a> {currentYear}-{currentYear+1}.All rights reserved.
            </div>
        </div>
    );
}

export default Footer;

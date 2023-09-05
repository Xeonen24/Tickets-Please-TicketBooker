import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/tmovie.png";
import { loggedIN } from "../../App";
import axios from "axios";

const Header = () => {
  const [usernames, setUsernames] = useState([]);
  const headerRef = useRef(null);
  const [showHr, setShowHr] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    if (showDropdown) {
      setTimeout(() => {
        setShowDropdown(false);
      }, 100);
    } else {
      setShowDropdown(true);
    }
  };

  const fetchUsernames = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/username`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsernames(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsernames();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        setShowHr(true);
      } else {
        setShowHr(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavMenu = () => {
    if (loggedIN) {
      return (
        <>
          <li>
            <Link to="/book-movie" style={{ textDecoration: "none" }}>
              Book Now
            </Link>
          </li>
          <div className="navbar">
            <li
              className={`navbar ${showDropdown ? "active" : ""}`}
              onClick={toggleDropdown}
            >
              <Link to="#">{usernames.username}</Link>
              <ul className={showDropdown ? "dropdown-show" : "dropdown-hide"}>
                <div className="curveNav">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                  <li>
                    <Link to="#" onClick={toggleDropdown}>
                      Cancel
                    </Link>
                  </li>
                </div>
              </ul>
            </li>
          </div>
        </>
      );
    } else {
      return (
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
            <Link to="/login">Sign in/up</Link>
          </li>
        </>
      );
    }
  };
  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <Link to="/">
          <div className="logo">
            <img className="logologo" src={logo} alt="" />

            <span className="logo-text">TicketsPlease?</span>
          </div>
        </Link>
        <ul className="header__nav">
          <NavMenu />
        </ul>
      </div>
      {showHr && <hr className="footerHr" />}
    </div>
  );
};

export default Header;

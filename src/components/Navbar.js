import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";
import logo from "../images/myLogo.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [button, setButton] = useState(true);

  //For Showing menu bar whwn window size is shrinked

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  //For Removing signup button after resfresh

  useEffect(() => {
    showButton();
  }, []);

  // calls showButton() when window is resized

  window.addEventListener("resize", showButton);
  return (
    <>
      <nav className="navBar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            FoleyGen
            <img src={logo} alt="logo" width={40} height={40}></img>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {/* turns bar menu to cross when clicked */}
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          {/* appear and disappearing of menu */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/edit" className="nav-links" onClick={closeMobileMenu}>
                Edit Now
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li> */}
          </ul>
          {/* {button && <Button buttonStyle="btn--outline">SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

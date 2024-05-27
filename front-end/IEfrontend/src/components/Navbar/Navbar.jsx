import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link, Navigate, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import UserService from "../../service/UserService";

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn, username }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  // const {username} = useParams();

  const handleLogout = async (e) => {
    try {
      await UserService.logout();
      setIsLoggedIn(false);
      navigate('/');

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="navbar">
      {!isLoggedIn
      ?
          <Link to="/">
            <img src={assets.logo1} alt="" className="logo1" />
          </Link>
          :
          <Link to={`${username}`}>
            <img src={assets.logo1} alt="" className="logo1" />
          </Link>
      }

      <ul className="navbar-menu">
        {!isLoggedIn
            ?
            <Link
                to="/"
                onClick={() => setMenu("home")}
                className={menu === "home" ? "active" : ""}
            >
              Home
            </Link>
            :
            <Link
                to={`${username}`}
                onClick={() => setMenu("home")}
                className={menu === "home" ? "active" : ""}
            >
              Home
            </Link>

        }
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        {/* <a href='#app-download' onClick={()=>setMenu("mobile-app")}className={menu==="mobile-app"?"active":""}>Mobile-app</a> */}
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        {/*<img src={assets.search_icon} alt="" />*/}
        <div className="navbar-search-icon">
          {!isLoggedIn
          ?
          <></>
          :
          <Link to={`${username}/cart`}>
            <img src={assets.basket_icon} alt="" />
          </Link>

          }

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!isLoggedIn
            ?
            <button onClick={() => setShowLogin(true)}>Sign in</button>
        :
        <button onClick={handleLogout}>Sign out</button>
        }

      </div>
    </div>
  );
};

export default Navbar;

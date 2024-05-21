import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import MerchItemAdd from "./components/MerchItemAdd/MerchItemAdd";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameApp, setUsernameApp] = useState("");

  const [showItemAdd, setShowItemAdd] = useState(false);
  return (
    // <>
    //   {showLogin ? (
    //     <LoginPopup
    //       setShowLogin={setShowLogin}
    //       setIsLoggedIn={setIsLoggedIn}
    //       setUsernameApp={setUsernameApp}
    //     />
    //   ) : (
    //     <></>
    //   )}
    //   <>
    //   {showItemAdd ? (
    //     <MerchItemAdd 
    //       setShowItemAdd={setShowItemAdd} 
    //     />
    //   ) : (
    //     <></>
    //   )}
    <>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          setUsernameApp={setUsernameApp}
        />
      )}
      {showItemAdd && (
        <MerchItemAdd setShowItemAdd={setShowItemAdd} />
      )}
        <div className="app">
          <Navbar
            setShowLogin={setShowLogin}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <Routes>
            {/* If user not logged in */}
            <Route path="/" element={<Home setShowItemAdd={setShowItemAdd}/>} />
            {/* if user logged in */}
            <Route
              path={`/?${usernameApp}`}
              element={<Home setShowItemAdd={setShowItemAdd} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
          </Routes>
        </div>
        <Footer />
      </>
  );
};

export default App;

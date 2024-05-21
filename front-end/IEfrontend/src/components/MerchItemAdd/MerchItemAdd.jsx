import React, { useState } from "react";
import "./MerchItemAdd.css";
import { assets } from "../../assets/assets";
import UserService from "../../service/UserService";

import { useNavigate } from "react-router-dom";

const MerchItemAdd = ({ setShowItemAdd }) => {
  const [itemName, setItemName] = useState("Product sheesh"); // Set item name here
  const [itemDescription, setItemDescription] = useState(
    "MEfjisjfosng;zjndf;of"
  ); // Set item description here
  const [itemPrice, setItemPrice] = useState("$10,000,000"); // Set item price here
  const [error, setError] = useState("");

  // Form item getters
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="item-popup">
      <form action="" className="item-popup-container">
        <div className="item-popup-title">
          <h2>{itemName}</h2>
          {error && <p className="error-message">{error}</p>}
          <img
            onClick={() => setShowItemAdd(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="merch-item-img-container">
          <img className="merch-item-image" alt="item image placed here" />
        </div>
        <h4>{itemDescription}</h4>
        <h4>{itemPrice}</h4>
        <div className="item-popup-inputs">
          {/* Inputs like Enter Item Quantity */}
          <h4>Enter quantity</h4>
          <input
            type="number"
            name="email"
            placeholder="Enter desired quantity"
            required
          />
          <h5>Estimated Price: {}</h5>
        </div>
        <button type="submit">Add to Cart</button>
        <div className="item-popup-condition"></div>
      </form>
    </div>
  );
};

export default MerchItemAdd;

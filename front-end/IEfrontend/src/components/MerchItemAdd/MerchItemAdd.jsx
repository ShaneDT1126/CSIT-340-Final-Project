import React, { useState } from "react";
import "./MerchItemAdd.css";
import { assets } from "../../assets/assets";
import UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";

// const MerchItemAdd = ({ setShowItemAdd }) => {
const MerchItemAdd = ({ setShowItemAdd, item }) => {
  const [itemName, setItemName] = useState("Product sheesh"); // Set item name here
  const [itemDescription, setItemDescription] = useState("MEfjisjfosng;zjndf;of"); // Set item description here
  const [itemPrice, setItemPrice] = useState("$10,000,000"); // Set item price here
  const [error, setError] = useState("");

  // Form item getters
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="item-popup">
      <form action="" className="item-popup-container">
        <div className="item-popup-title">
          <h2>{item.name}</h2>
          {error && <p className="error-message">{error}</p>}
          <img
            onClick={() => setShowItemAdd(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="merch-item-img-container">
          <img className="merch-item-image" src={item.image} alt="item image" />
        </div>
        <h4>{item.description}</h4>
        <h4>${item.price}</h4>
        <div className="item-popup-inputs">
          <h4>Enter quantity</h4>
          <input
            type="number"
            name="quantity"
            placeholder="Enter desired quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <h5>Estimated Price: ${quantity * item.price}</h5>
        </div>
        <button type="submit">Add to Cart</button>
        <div className="item-popup-condition"></div>
      </form>
    </div>
  );
};

export default MerchItemAdd;

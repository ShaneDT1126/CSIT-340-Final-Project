import React, {useState, useContext, useEffect} from "react";
import "./MerchItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

// const MerchItem = ({ setShowItemAdd, id, name, price, description, image }) => {
  const MerchItem = ({ setShowItemAdd, id, name, price, description, onAddClick }) => {
      const imageUrl = `http://localhost:8080/auth/getProductImage/${id}`;
  
  return (
    <div className="merch-item">
      <div className="merch-item-img-container">
        <img className="merch-item-image" src={imageUrl} alt={name} />
        <img
          className="add"
          onClick={onAddClick} // make this into a function that also passes id, name, price, description and image when onClick is
          src={assets.add_icon_white}
          alt=""
        />
      </div>
      <div className="merch-item-info">
        <div className="merch-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="merch-item-desc">{description}</p>
        <p className="merch-item-price">${price}</p>
      </div>
    </div>
  );
};

export default MerchItem;

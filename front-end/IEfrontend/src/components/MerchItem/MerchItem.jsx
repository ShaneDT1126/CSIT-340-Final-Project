import React, { useState, useContext } from "react";
import "./MerchItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

// const MerchItem = ({ setShowItemAdd, id, name, price, description, image }) => {
  const MerchItem = ({ setShowItemAdd, id, name, price, description, image, onAddClick }) => {

  
  return (
    <div className="merch-item">
      <div className="merch-item-img-container">
        <img className="merch-item-image" src={image} alt="" />
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
          <img src={assets.rating_stars} alt="" />
        </div>
        <p className="merch-item-desc">{description}</p>
        <p className="merch-item-price">${price}</p>
      </div>
    </div>
  );
};

export default MerchItem;

import React, {useContext, useEffect, useState} from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const PlaceOrder = ({appUsername}) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const tax = 15;
  // const {getTotalCartAmount} = useContext(StoreContext)

    const getTotalAmount = async () =>{
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8080/user/getCartTotal/${appUsername}`,
                {
                   headers: {
                       Authorization: `Bearer ${token}`,
                   }
                });
            if (response.status === 200){
                setTotalAmount(response.data);
                console.log(response.data)
            }
        }catch (error){
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        getTotalAmount()
    }, [appUsername]);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Last name" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone"/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₱{totalAmount}</p>
            </div>
            <hr></hr>
            <div className="cart-total-details">
              <p>Transaction Fee</p>
              <p>₱{tax}</p>
            </div>
            <hr></hr>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₱{totalAmount + tax}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

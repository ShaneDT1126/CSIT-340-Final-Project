import React, {useContext, useEffect, useState} from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import CartItemService from "../../service/CartItemService.js";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";
const Cart = ({appUsername}) => {
  // const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [cartItem, setCartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();
  const tax = 15;


  const fetchItems = async () =>{
    const token = localStorage.getItem('token')

    try {
      const response = await axios.get(`http://localhost:8080/user/getUserCart/${appUsername}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      const totalAmount = await axios.get(`http://localhost:8080/user/getCartTotal/${appUsername}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItem(response.data.cartItemDTO || []);
      setTotalAmount(totalAmount.data || 'No Items in Cart')
      console.log("Data: ",response.data.cartItemDTO)
      console.log("Success!: ",response.data)
      console.log(totalAmount.data)
    }catch (error){
      console.log(error)
    }
  }

  const removeToCart = async (cartId) =>{
    const token = localStorage.getItem('token')
    try {
      const response = await axios.delete(`http://localhost:8080/user/deleteCartItem/${cartId}`,
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
      );

      if (response.status === 200){
        fetchItems();
        console.log(response.data)
        toast.success("Deleted Successfully");
      }
    }catch (error){
      toast.error("Delete Unsuccessful!, Something Went Wrong...")
      console.log("Error: ",error)
    }

  };



  useEffect(() => {
    fetchItems();
  }, [appUsername]);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItem.map((item, index) => {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={`http://localhost:8080/auth/getProductImage/${item.product?.productId}`} alt={''} />
                  <p>{item?.product?.name || 'NA'}</p>
                  <p>{item?.product?.price || 'NA'}</p>
                  <p>{item?.quantity || 'NA'}</p>
                  <p onClick={()=>removeToCart(item?.cartItemId)} className="cross">
                    x
                  </p>
                  <Toaster/>
                </div>

                <hr />
              </div>
            );

        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

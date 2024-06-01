import React, {useContext, useEffect, useState} from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import CartItemService from "../../service/CartItemService.js";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";
import OrderService from "../../service/OrderService.js";
const Cart = ({appUsername}) => {
  // const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [cartItem, setCartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();
  const tax = 15;
  const paymentTotal = totalAmount + tax;
  console.log(appUsername)

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
      setTotalAmount(totalAmount.data )
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

  const addToOrder = async () =>{
    const token = localStorage.getItem('token');
    try {
      const response = await OrderService.addOrder(appUsername,token);
      if(response.status === 200){
        console.log("Order Success!")
      }
    } catch (error){
      toast.error("Order Unsuccessful!")
      console.log("Error: ", error)
    }
  }

  const payWithPaypal = async () =>{
    try {
      const response = await axios.post(`http://localhost:8080/auth/payment/create/${appUsername}/${paymentTotal}`,null);
      console.log(response.data);
      addToOrder();
      window.open(response.data);

    }catch (error){
      console.log("Error Occured: ", error);
    }
  }

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
                  <p>₱{item?.product?.price || 'NA'}</p>
                  <p>{item?.quantity || 'NA'}</p>
                  <p onClick={()=>removeToCart(item?.cartItemId)} className="cross">
                    x
                  </p>
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
              {totalAmount === 0 || totalAmount === null
                  ?
                  <p>No Cart Items</p>
                  :
                  <p>₱{totalAmount}</p>
              }

            </div>
            <hr></hr>
            <div className="cart-total-details">
              <p>Transaction Fee</p>
              {totalAmount === 0 || totalAmount === null
                  ?
                  <p>No Cart Items</p>
                  :
                  <p>₱{tax}</p>
              }
            </div>
            <hr></hr>
            <div className="cart-total-details">
              <b>Total</b>
              {totalAmount === null || totalAmount === 0
                  ? <b>No Cart Items</b>
                  : <b>₱{tax + totalAmount}</b>
              }
            </div>
          </div>
          {/*()=>navigate(`/${appUsername}/order`)*/}
          <button onClick={payWithPaypal}>PROCEED TO CHECKOUT</button>
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

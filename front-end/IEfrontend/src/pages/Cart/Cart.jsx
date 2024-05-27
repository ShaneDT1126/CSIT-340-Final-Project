import React, {useContext, useEffect, useState} from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import CartItemService from "../../service/CartItemService.js";
import axios from "axios";
const Cart = ({appUsername}) => {
  // const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [cartItem, setCartItem] = useState([]);
  const [items, setItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems =  async () =>{
    const token = localStorage.getItem('token')
    try {
      const cartItemsResponse = await CartItemService.getUserCart(appUsername, token);
      const getTotalAmount = await CartItemService.getTotalAmount(appUsername, token);
      setCartItem(cartItemsResponse.data|| [])
      // setTotalAmount(getTotalAmount.data || 'N/A')
      console.log(cartItemsResponse.data)
    } catch (error){
      console.error("Error fetching data: ", error)
    }

  };

  const fetchItems = async () =>{
    const token = localStorage.getItem('token')

    try {
      const response = await axios.get(`http://localhost:8080/user/getCart/${appUsername}`,
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
      setItems(response.data.cartItems || []);
      setTotalAmount(totalAmount.data || 'No Items in Cart')
      console.log(response.data)
      console.log(totalAmount.data)
    }catch (error){
      console.log(error)
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
        {items.map((item, index) => {
          if (items[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={`http://localhost:8080/auth/getProductImage/${item.product.productId}`} alt={`${item.product.name}`} />
                  <p>{item.product.name}</p>
                  <p>{item.product.price}</p>
                  <p>{item.quantity}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr></hr>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${''}</p>
            </div>
            <hr></hr>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmount}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          {/*<div>*/}
          {/*  <p>If you have a promo code, Enter it here</p>*/}
          {/*  <div className="cart-promocode-input">*/}
          {/*    <input type="text" placeholder="promo code" />*/}
          {/*    <button>Submit</button>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Cart;

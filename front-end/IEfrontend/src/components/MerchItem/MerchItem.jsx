import React, { useState, useContext } from 'react'
import './MerchItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const MerchItem = ({id,name,price,description,image}) => {
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart} = useContext(StoreContext);
    return (
    <div className='merch-item'>
        <div className="merch-item-img-container">
            <img className='merch-item-image' src={image} alt=''/>
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                :<div className='food-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                </div>
            }
        </div>
        <div className='merch-item-info'>
            <div className="merch-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""/>
            </div>
            <p className="merch-item-desc">
            {description}
            </p>
            <p className="merch-item-price">
                ${price}
            </p>
        </div>
        
    </div>
  )
}

export default MerchItem

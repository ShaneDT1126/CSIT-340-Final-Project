import React, {useContext} from 'react'
import './MerchDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import MerchItem from '../MerchItem/MerchItem'

const MerchDisplay = ({category}) => {
    const {food_list}= useContext(StoreContext);
  return (
    <div className='merch-display' id='merch-display'>
      <h2>Top dishes near you</h2>
      <div className="merch-display-list">
        {food_list.map((item, index)=>{
          if(category==="All" || category === item.category) {
            return <MerchItem 
            key={index} 
            id={item._id} 
            name={item.name}  
            description={item.description}
            price={item.price}  
            image={item.image}/>
          }
        })}
      </div>
    </div>
  )
}

export default MerchDisplay

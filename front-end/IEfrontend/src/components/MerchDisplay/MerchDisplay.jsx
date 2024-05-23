import React, { useContext, useEffect, useState } from "react";
import "./MerchDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import MerchItem from "../MerchItem/MerchItem";
import {toast, Toaster} from "react-hot-toast"
import MerchItemAdd from "../MerchItemAdd/MerchItemAdd";

const MerchDisplay = ({ category, setShowItemAdd }) => {
  // const {food_list}= useContext(StoreContext);
    const [selectedItem, setSelectedItem] = useState(null);

  const [list,setList] = useState([]);
  const url = "http://localhost:8080/public";
  const deleteUrl = "http://localhost:8080/auth";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/getAllProducts`);
      setList(response.data.allProducts || []);
      console.log(response.data.allProducts);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  
  const handleAddClick = (item) => {
    setSelectedItem(item);
    setShowItemAdd(true);
  };

  return (
    <div className="merch-display" id="merch-display">
      <h2>Top merch near you</h2>
      <div className="merch-display-list">
        {/* {food_list.map((item, index)=>{
          if(category==="All" || category === item.category) {
            return <MerchItem 
            key={index} 
            id={item._id} 
            name={item.name}  
            description={item.description}
            price={item.price}  
            image={item.image}
            setShowItemAdd={setShowItemAdd}/>
          }
        })} */}
        {list.map((item, index) => {
          if(category==="All" || category === item.category) {
            return <>
            <MerchItem 
            key={index} 
            id={item?.productId || 'N/A'} 
            name={item?.name  || 'N/A'}  
            description={item?.description  || 'N/A'}
            price={item?.price  || 'N/A'}  
            image={item?.image  || 'N/A'}
            // setShowItemAdd={setShowItemAdd}
            // list={list}
            onAddClick={() => handleAddClick(item)}
            /> 
            <Toaster/>
            </>
            
          }})}
      </div>
      {selectedItem && <MerchItemAdd 
        setShowItemAdd={setShowItemAdd}
        item={selectedItem}
      />}
    </div>
  );
};

export default MerchDisplay;

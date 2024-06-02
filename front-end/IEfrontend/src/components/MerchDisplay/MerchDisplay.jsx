import React, { useContext, useEffect, useState } from "react";
import "./MerchDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import MerchItem from "../MerchItem/MerchItem";
import {toast, Toaster} from "react-hot-toast"
import MerchItemAdd from "../MerchItemAdd/MerchItemAdd";
import axios from "axios";
import CartItemService from "../../service/CartItemService.js";


const MerchDisplay = ({ category, setShowItemAdd, appUsername }) => {
  // const {food_list}= useContext(StoreContext);
    const [selectedItem, setSelectedItem] = useState(null);

  const [list,setList] = useState([]);
  const url = "http://localhost:8080/public";
  const deleteUrl = "http://localhost:8080/auth";
  const user = appUsername;

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/getAllProducts`);
      setList(response.data.allProducts || []);
      console.log(response.data);
      console.log(response.data.allProducts);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  
  const handleAddClick = async (item) => {
    // setSelectedItem(item);
    // setShowItemAdd(true);
    try {
      const token = localStorage.getItem('token');

      const response = await CartItemService.addToCart(appUsername,item.productId,1,token);
      if (response.statusCode === 200){
        console.log("added to cart successfully");
      }
    } catch (error){
      console.log("can't add to cart error: ",error)
    }
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
          if(category==="All" || category === item.category.name) {
            console.log(item?.productId)

            return <>
            <MerchItem
            key={index}
            id={item?.productId || 'N/A'}
            name={item?.name  || 'N/A'}
            description={item?.description  || 'N/A'}
            price={item?.price  || 'N/A'}
            //image={item?.productImages  || 'N/A'}
            // setShowItemAdd={setShowItemAdd}
            // list={list}
            onAddClick={() => handleAddClick(item)}
            appUsername={user}
            />

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

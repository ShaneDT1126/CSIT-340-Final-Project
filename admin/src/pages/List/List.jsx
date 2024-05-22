import { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast, Toaster} from "react-hot-toast"


const List = () => {
  const url = "http://localhost:8080/public";
  const deleteUrl = "http://localhost:8080/auth"
  const [list,setList] = useState([]);

  const fetchList = async () => {
      try {
          const response = await axios.get(`${url}/getAllProducts`);
          setList(response.data.allProducts || [])
          console.log(response.data.allProducts);

      } catch (error){
          toast.error("Error fetching products")
      }
  }

  const deleteProduct = async (productId) => {
      try {
          const confirmDelete = window.confirm('Are you sure you want to delete this product?');

          if (confirmDelete){
              const response = await axios.delete(`${deleteUrl}/delete/${productId}`);
              console.log(response.data);
              fetchList();
              toast.success('Success Deleting Product');
          }

      } catch (error){
          toast.error('Error deleting user', error);
      }
  }

   useEffect(()=> {
    fetchList();
   }, [])


  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div className="list-table">
          {list.length === 0 ? (
              <p>No Current Products</p>
          ) : (
              <>
                  <div className="list-table-format title">
                      <b>Product ID</b>
                      <b>Name</b>
                      <b>Category</b>
                      <b>Price</b>
                      <b>Action</b>
                  </div>
                  {list.map((item, index) => (
                      <div key={index} className='list-table-format'>
                          <p>{item?.productId || 'N/A'}</p>
                          <p>{item?.name || 'N/A'}</p>
                          <p>{item?.category?.name || 'N/A'}</p>
                          <p>{item?.price || 'N/A'}</p>
                          <button onClick={()=> deleteProduct(item.productId)}>Delete</button>
                          <Toaster/>
                      </div>
                  ))}
              </>
          )}
      </div>
    </div>
  )
}

export default List;

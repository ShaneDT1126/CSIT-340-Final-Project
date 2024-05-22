import {useEffect, useState} from 'react'
import './Orders'
import axios from "axios";
import {Toaster} from "react-hot-toast";
const Orders = () => {
  const url = "http://localhost:8080/auth";
  const [orderList,setOrderList] = useState([]);

  const fetchOrders = async () => {

    try {
      const response = await axios.get(`${url}/getAllOrders`);
      setOrderList(response.data.orders || [])
      console.log(response.data.orders)
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
        <div className="order add">  
          <h3>Orders Page</h3>
            <div className="order-list">
              {orderList.length === 0 ? (
                  <p>No current orders</p>
              ) : (
                  <>
                    <div className="list-table-format title">
                      <b>Order ID</b>
                      <b>Username</b>
                      <b>Order Date</b>
                      <b>Total Amount</b>
                      <b>Status</b>
                    </div>
                    {orderList.map((item, index) => (
                        <div key={index} className="list-table-format">
                          <p>{item?.orderId || 'N/A'}</p>
                          <p>{item?.ourUsers?.username || 'N/A'}</p>
                          <p>{item?.orderDate || 'N/A'}</p>
                          <p>{item?.totalAmount || 'N/A'}</p>
                          <button>Approve</button>
                          <Toaster/>
                        </div>
                    ))}
                  </>
              )}
            </div>
        </div>
  )
}

export default Orders

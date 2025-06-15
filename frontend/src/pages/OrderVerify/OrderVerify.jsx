import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './OrderVerify.css';

const Verify = () => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const success = queryParams.get('success') === 'true'; 
  const orderId = queryParams.get('orderId'); 
  const [order, setOrder] = useState(null); 

  useEffect(() => {
    const handleOrder = async () => {
      if (!orderId) return; 

      if (!success) {
        try {
          await axios.delete(`http://localhost:3000/order/${orderId}`);
        } catch (error) {
          console.error('Error deleting order:', error);
        }
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/order/${orderId}`);
        setOrder(response.data); 
      } catch (error) {
        console.error('Error fetching order details:', error); 
      }
    };

    handleOrder(); 
  }, [orderId, success]); 

  return (
    <div>
      {success ? (
        <div className='success-container'>
          <h1>Payment Successful</h1>
          {order && (
            <div className='container-fluid success-details'>
              <h2>Order Details</h2>
              <p>Order ID: {order._id}</p>
              <p>Name: {order.name}</p>
              <p>Location: {order.itemLocation}</p>
              <p>Ordered Food: {order.orderedFood.map((item, index) => 
                index === 0 ? item : `, ${item}`
              )}</p>
              {console.log(order.orderedFood)} 
              <p>SubTotal: ₹ {order.subTotal}</p>
              <Link to='/' className='btn btn-success'>Return to Homepage</Link>
            </div>
          )}
        </div>
      ) : (
        <div className='failure-container'>
          <h1>Payment Failed</h1>
          <p>Unfortunately, your payment could not be processed.</p>
          <Link to='/' className='btn btn-danger'>Return to Homepage</Link>
        </div>
      )}
    </div>
  );
};

export default Verify;
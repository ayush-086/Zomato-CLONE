import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './OrderVerify.css';

const Verify = () => {
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const success = queryParams.get('success') === 'true'; // Check payment success status
  const orderId = queryParams.get('orderId'); // Get order ID from query parameters
  const [order, setOrder] = useState(null); // State to hold order details

  useEffect(() => {
    const handleOrder = async () => {
      if (!orderId) return; // Exit if no order ID is present

      if (!success) {
        try {
          // Delete the order if payment failed
          await axios.delete(`http://localhost:3000/order/${orderId}`);
        } catch (error) {
          console.error('Error deleting order:', error); // Log any error encountered
        }
        return;
      }

      try {
        // Fetch order details if payment was successful
        const response = await axios.get(`http://localhost:3000/order/${orderId}`);
        setOrder(response.data); // Update state with fetched order data
      } catch (error) {
        console.error('Error fetching order details:', error); // Log any error encountered
      }
    };

    handleOrder(); // Call the function to handle order based on payment status
  }, [orderId, success]); // Re-run effect when orderId or success changes

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
                index === 0 ? item : `, ${item}` // Join ordered food items with commas
              )}</p>
              {console.log(order.orderedFood)} {/* Debugging ordered food */}
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
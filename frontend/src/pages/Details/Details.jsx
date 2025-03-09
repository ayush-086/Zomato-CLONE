import React, { useState, useRef, useEffect } from 'react'
import './Details.css'
import { Carousel } from 'react-responsive-carousel' 
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { foodItemsImg } from '../../assets/assets.js'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const [tabIndex, setTabIndex] = useState(0); // Manage the currently selected tab
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Control visibility of the order menu
  const [subTotal, setSubTotal] = useState(0); // Track the total cost of the order
  const [orderedFood, setOrderedFood] = useState([]); // Store items added to the order
  const location = useLocation();
  const { name, location: itemLocation, price, cuisine, image, email, phone, type, menu } = location.state || {};

  const placeOrderRef = useRef(null); // Reference for the order menu for dragging

  const [isDragging, setIsDragging] = useState(false); // Track drag state
  const [startY, setStartY] = useState(0); // Initial Y position for dragging
  const [scrollTop, setScrollTop] = useState(0); // Initial scroll position

  if (!location.state) {
    return <div>No data available</div>; // Display a message if no data is found
  }

  // Join array of cuisines into a single string
  const cuisines = cuisine.join(', ');

  // Add item to the order and update subtotal
  const add = (price, item) => {
    setSubTotal(prevSubTotal => prevSubTotal + price);
    setOrderedFood(prevOrderedFood => [...prevOrderedFood, item]);
  };

  // Handle mouse down event for dragging the menu
  const mouseDownHandler = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.pageY - placeOrderRef.current.offsetTop);
    setScrollTop(placeOrderRef.current.scrollTop);
  };

  // Handle mouse move event for dragging the menu
  const mouseMoveHandler = (e) => {
    if (!isDragging) return;
    const y = e.pageY;
    const delta = y - startY;
    placeOrderRef.current.scrollTop = scrollTop - delta;
  };

  // Handle mouse up event to stop dragging
  const mouseUpHandler = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Add event listener for mouse up to stop dragging when mouse is released
    const mouseUpListener = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', mouseUpListener);
    return () => {
      document.removeEventListener('mouseup', mouseUpListener);
    };
  }, []);

  // Handle order submission
  const orderSubmitHandler = async (e) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close the menu after submitting the order
    const userName = localStorage.getItem('userName'); // Get username from localStorage
    console.log(userName);
    
    if(userName === null){
      window.alert("Please login to place an order");
      return 0;
    }
    const orderData = {
      userName,
      name,
      itemLocation,
      orderedFood,
      subTotal
    }
    try {
      const response = await axios.post('http://localhost:3000/order', orderData); // Send order data to the server
      if (response.data.success) {
        const { session_url } = response.data; // Get redirect URL from response
        window.location.replace(session_url); // Redirect user to payment session
      } else {
        alert("Error"); // Show error alert if order fails
      }
    } catch (error) {
      console.error("There was an error submitting the order:", error); // Log error if request fails
    }
  }

  return (
    <div className='details-page'>
      {/* Order form that slides in and out */}
      <form onSubmit={orderSubmitHandler} className={`place-order-container ${isMenuOpen ? 'd-block' : 'd-none'}`} 
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      >
        <div className="place-order" 
          ref={placeOrderRef}
          onMouseDown={mouseDownHandler}
          onMouseLeave={mouseUpHandler}
        >
          <div className='menu-header d-flex justify-content-between align-items-center'>
            <h1 className='m-0'>Menu</h1>
            <button type='button' className='btn btn-close' onClick={() => setIsMenuOpen(false)} aria-label="Close menu"></button>
          </div>
          <h2 className='m-0'>{name}</h2>
          <div className='menu'>
            {menu.map((item, index) => (
              <div key={index} className='d-flex flex-column'>
                <div className='d-flex justify-content-between align-items-center'>
                  <ul>
                    <li><span className='text-danger'>{item.type}</span></li>
                    <p className='m-0'>{item.item}</p>
                    <p className='m-0'>Rs. {item.price}</p>
                    <p className='m-0'>{item.description}</p>
                  </ul>
                  <div className='d-flex flex-column gap-1'>
                    <button type='button' className='btn btn-outline-secondary' onClick={() => add(item.price, item.item)} aria-label={`Add ${item.item} to order`}>Add</button>
                  </div>
                </div>
              </div>
            ))}
            <div className='menu-footer d-flex justify-content-between align-items-center'>
              <h3 className='m-0'>Subtotal ₹ {subTotal}</h3>
              <button type='submit' className='btn btn-success'>Pay Now</button>
            </div>
          </div>
        </div>
      </form>

      {/* Image carousel */}
      <Carousel className='carousel container'  
        showThumbs={false} 
        showStatus={false} 
        autoPlay={true} 
        infiniteLoop={true} 
        stopOnHover={true} 
        interval={10000}
        emulateTouch={true}
      >
        {image.map((img, index) => (
          <div key={index}>
            <img src={foodItemsImg[img]} className='images' alt="Restaurant" />
          </div>
        ))}
      </Carousel>

      <div className='container'>
        <div className='text-center text-md-start'>
          <h1>{name}</h1>
        </div>
        <div className='text-center text-md-end'>
          <button id='place-order' onClick={() => setIsMenuOpen(true)}>Place Online Order</button>
        </div>
        {/* Tabs for overview and contact */}
        <Tabs className='tab-container' selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className='tab-list'>
            <Tab className={`tab ${tabIndex === 0 ? 'active' : ''}`}>Overview</Tab>
            <Tab className={`tab ${tabIndex === 1 ? 'active' : ''}`}>Contact</Tab>
          </TabList>
          <hr />
          <TabPanel>
            <h2>About this place</h2>
            <div>
              <h5>Cuisine:</h5>
              <p>{cuisines}</p>
            </div>
            <div>
              <h5>Average Cost</h5>
              <p>Rs. {price} for Two (approx)</p>
            </div>
          </TabPanel>

          <TabPanel>
            <h2>Contact</h2>
            <div>
              <h5>Phone Number:</h5>
              <p>{phone}</p>
            </div>
            <div>
              <h5>Email:</h5>
              <p>{email}</p>
            </div>
            <div>
              <h5>Address:</h5>
              <p>{itemLocation}</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default Details
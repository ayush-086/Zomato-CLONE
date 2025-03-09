import React from 'react';
import './FilteredItems.css'; // Import CSS styles for the component
import { foodItemsImg } from '../../assets/assets.js'; // Import images for food items
import { Link } from 'react-router-dom'; // Import Link component from React Router for navigation

const FilteredItems = ({ item }) => {
  return (
    // Create a link to the "/details" page with state containing item details
    <Link 
      to="/details"
      state={{
        name: item.name,
        location: item.location,
        price: item.price,
        cuisine: item.cuisine,
        image: item.image,
        email: item.email,
        phone: item.phone,
        type: item.type,
        menu: item.menu
      }}
    >
      <div className='filtered-items'>
        <div className='food-info'>
          {/* Display food image */}
          <img src={foodItemsImg[item.image[0]]} className='food-img' alt="" />
          <div>
            {/* Display food name, location, and city */}
            <p className='food-title'>{item.name}</p>
            <p>{item.location}</p>
            <p className='text-secondary'>{item.city}</p>
          </div>
        </div>
        <hr />
        <div>
          {/* Display a comma-separated list of cuisines */}
          <p>
            <span className='text-secondary'>Cuisines: </span>
            {
              item.cuisine.reduce((cuisines, element, index) => {
                // Join the cuisines array into a comma-separated string
                if (index === 0) {
                  return element; 
                }
                return cuisines + ', ' + element; 
              }, '')
            }
          </p>
          {/* Display cost for two */}
          <p>
            <span className='text-secondary'>COST For Two:</span> Rs. {item.price} for two (approx)
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FilteredItems;
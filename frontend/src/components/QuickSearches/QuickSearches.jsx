import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuickSearches.css'; // Import CSS styles for the QuickSearches component
import { assets } from '../../assets/assets.js'; // Import assets
import { Link } from 'react-router-dom'; // Import Link for routing

const QuickSearches = () => {
  const [foodList, setFoodList] = useState([]); // State to hold the list of food items

  // Function to fetch food items from the server
  const getItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getItems', {
        headers: {
          'Content-Type': 'application/json' // Specify content type for the request
        }
      });
      setFoodList(response.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching food items:', error); // Log any errors
    }
  };

  // Fetch food items on component mount
  useEffect(() => {
    getItems();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className='quick-searches container'>
      <h1 className='text-primary'>Quick Searches</h1>
      <p className='text-secondary'>Discover Restaurants by type of meal</p>
      <div className="row">
        {foodList.map((foodItem) => (
          <div className='col-4' key={foodItem._id}>
            {/* Link to the filter page with state containing the food item name */}
            <Link to={`/filter`}
              state={{
                name: foodItem.name
              }}
              className='card border-0' id='quick-search-container'>
              <div className='card-body body'>
                <img src={assets[foodItem.image]} className='card-img' alt={foodItem.name} />
                <div>
                  <h5 className='card-title title'>{foodItem.name}</h5>
                  <p className='card-text text'>{foodItem.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSearches;
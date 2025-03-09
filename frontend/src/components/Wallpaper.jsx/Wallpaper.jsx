import React, { useState, useEffect } from 'react';
import './Wallpaper.css'; // Import component-specific styles
import { assets, foodItemsImg } from '../../assets/assets'; // Import assets
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Wallpaper = () => {
  const [restaurants, setRestaurants] = useState([]); // State for all restaurants
  const [selectedRestaurant, setSelectedRestaurant] = useState('Select a location'); // State for selected location
  const [searchValue, setSearchValue] = useState(''); // State for search input value
  const [filteredRestaurant, setFilteredRestaurant] = useState([]); // State for filtered restaurant list

  // Fetch restaurants data from API on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getRestaurants', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setRestaurants(response.data); // Update restaurants state
      } catch (error) {
        console.error('Error fetching food items:', error); // Log error if fetch fails
      }
    };

    fetchRestaurants();
  }, []);

  // Handle location selection change
  const handleLocationChange = (event) => {
    setSelectedRestaurant(event.target.value); // Update selected location
    setSearchValue(''); // Clear search input
    setFilteredRestaurant([]); // Clear filtered restaurant list
  };

  // Handle search input changes
  const searchHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value); // Update search value
    const items = [];
    if (value.length >= 0 && selectedRestaurant !== 'Select a location') {
      const selectedRestaurantData = restaurants.find(
        (restaurant) => `${restaurant.name}, ${restaurant.city}` === selectedRestaurant
      );
      if (selectedRestaurantData) {
        selectedRestaurantData.restaurants.forEach((item) => {
          if (item.name.toLowerCase().includes(value.toLowerCase())) {
            items.push(item); // Add item to filtered list if it matches search
          }
        });
      }
      setFilteredRestaurant(items); // Update filtered restaurant list
    }
  };

  // Handle search input blur event
  const searchBlur = () => {
    setTimeout(() => {
      setFilteredRestaurant([]); // Clear filtered list after a delay
    }, 200);
  };

  return (
    <div className='wallpaper position-relative'>
      <img src={assets.headerBg} id='header-bg' alt="Background" />
      <div className='wallpaper-content container position-relative'>
        <img src={assets.logo} alt="Logo" />
        <h2>Find the Best Restaurants, Cafes, and Bars</h2>
        <div className='form-container'>
          <form>
            <select
              name="location"
              title='select your desired restaurant'
              value={selectedRestaurant}
              onChange={handleLocationChange}
            >
              <option value="Select a location" disabled>Select a location</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={`${restaurant.name}, ${restaurant.city}`}>
                  {restaurant.name}, {restaurant.city}
                </option>
              ))}
            </select>
          </form>
          <form className='position-relative'>
            <input
              type="search"
              id='search-restaurant'
              placeholder='Search for restaurant, cafe, or bar'
              value={searchValue}
              onChange={searchHandler}
              onBlur={searchBlur}
              onClick={searchHandler}
            />
            {filteredRestaurant.length > 0 && (
              <div className='search-results'>
                {filteredRestaurant.map((item) => (
                  <div key={item._id} className='search-item'>
                    <div>
                      <img src={foodItemsImg[item.image[0]]} alt={item.name} />
                      <span>{item.name}</span>
                    </div>
                    <div>
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
                        Order Now &gt;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;
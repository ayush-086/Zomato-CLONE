import React, { useState, useEffect } from 'react';
import './Filter.css';
import FilteredItemsPages from '../../components/FilteredItemsPages/FilteredItemsPages';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Filter = () => {
  const [restaurants, setRestaurants] = useState([]); 
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); 
  const [selectOptions, setSelectOptions] = useState([]); 
  const [showFilter, setShowFilter] = useState(false); 
  const [selectedLocation, setSelectedLocation] = useState(''); 
  const [selectedCuisines, setSelectedCuisines] = useState([]); 
  const [selectedCost, setSelectedCost] = useState('');
  const [sortOption, setSortOption] = useState(''); 
  const uniqueLocations = new Set(); 

  const location = useLocation();
  const { name } = location.state; 
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getRestaurants', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const filterRestaurant = () => {
      const items = [];
      restaurants.forEach((restaurant) => {
        restaurant.restaurants.forEach((item) => {
          item.type.forEach((type) => {
            if (type === name) {
              items.push(item);
            }
          });
        });
      });
      setSelectOptions(items); 
      setFilteredRestaurants(items); 
    };
    filterRestaurant();
  }, [restaurants, name]);

  const selectChangeHandler = (event) => {
    const selectedLocation = event.target.value;
    if (selectedLocation === "Select a location") {
      setSelectedLocation(selectedLocation)
      setFilteredRestaurants(selectOptions); 
    } else {
      const filteredItems = selectOptions.filter((item) => item.location === selectedLocation);
      setSelectedLocation(selectedLocation);
      setFilteredRestaurants(filteredItems); 
    }
  };

  const cuisineChangeHandler = (event) => {
    // Handle cuisine checkbox change
    const { checked } = event.target;
    const label = document.querySelector(`label[for=${event.target.id}]`).textContent;

    if (checked) {
      setSelectedCuisines(prev => [...prev, label]); 
    } else {
      setSelectedCuisines(prev => prev.filter(cuisine => cuisine !== label));
    }
  };

  const costChangeHandler = (event) => {
    const { id } = event.target;
    const label = document.querySelector(`label[for=${id}]`).textContent;

    setSelectedCost(label); 
  };

  const sortChangeHandler = (event) => {
    const { id } = event.target;
    setSortOption(id); 
  };

  const resetHandler = () => {
    setSelectedLocation('');
    setSelectedCuisines([]);
    setSelectedCost('');
    setSortOption('');
  
    document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('input[type=radio]').forEach(radio => radio.checked = false);
  
    setFilteredRestaurants(selectOptions); 
    setShowFilter(false);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setShowFilter(false); 
    }
  };

  useEffect(() => {
    let filteredItems = [...selectOptions]; 
    if (selectedLocation && selectedLocation !== "Select a location") {
      filteredItems = filteredItems.filter(item => item.location === selectedLocation);
    }
    if (selectedCuisines.length > 0) {
      filteredItems = filteredItems.filter(item =>
        item.cuisine.some(cuisine => selectedCuisines.includes(cuisine))
      );
    }
  
    // Apply cost filter
    if (selectedCost) {
      filteredItems = filteredItems.filter(item => {
        switch (selectedCost) {
          case 'Less than Rs.500':
            return item.price < 500;
          case 'Rs.500 to Rs.1000':
            return item.price >= 500 && item.price <= 1000;
          case 'Rs.1000 to Rs.1500':
            return item.price > 1000 && item.price <= 1500;
          case 'Rs.1500 to Rs.2000':
            return item.price > 1500 && item.price <= 2000;
          case 'More than Rs.2000':
            return item.price > 2000;
          default:
            console.warn('Unknown cost filter:', selectedCost);
            return true; // Default behavior
        }
      });
    }
  
    // Apply sorting
    if (sortOption === 'sort-1') {
      filteredItems.sort((a, b) => a.price - b.price); 
    } else if (sortOption === 'sort-2') {
      filteredItems.sort((a, b) => b.price - a.price); 
    }
  
    

    setFilteredRestaurants(filteredItems); 
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedLocation, selectedCuisines, selectedCost, selectOptions, sortOption]);

  return (
    <div className='filter'>
      <div className='container'>
        <h1>Breakfast places in India</h1>
        <button className={`btn btn-secondary border-1 mb-2 d-md-none filter-button ${showFilter ? 'd-none' : 'd-block'} `} onClick={()=>setShowFilter(!showFilter)}>Filter</button>
        <div className='filter-page'>
          <div className={`filter-section d-md-flex flex-column ${showFilter ? 'd-flex w-100' : 'd-none'}`}>
            <h3>Filters</h3>
            <form onSubmit={(e)=>e.preventDefault()}>
              <label htmlFor="location">Select Location</label>
              <select name="location" id="location" onChange={selectChangeHandler} defaultValue={"Select a location"}>
                <option value="Select a location">Select a Location</option>
                {selectOptions.map((item) => {
                  if (!uniqueLocations.has(item.location)) {
                    uniqueLocations.add(item.location);
                    return <option key={item._id} value={item.location}>{item.location}</option>;
                  }
                  return ""; 
                })}
              </select>
              <p>Cuisine</p>
              <div onChange={cuisineChangeHandler}>
                <input type="checkbox" name='cuisine' id='cuisine-1' />
                <label htmlFor="cuisine-1">North Indian</label><br />              
                <input type="checkbox" name='cuisine' id='cuisine-2' />
                <label htmlFor="cuisine-2">South Indian</label><br />
                <input type="checkbox" name='cuisine' id='cuisine-3' />
                <label htmlFor="cuisine-3">Chinese</label><br />
                <input type="checkbox" name='cuisine' id='cuisine-4' />
                <label htmlFor="cuisine-4">Fast Food</label><br />
                <input type="checkbox" name='cuisine' id='cuisine-5' />
                <label htmlFor="cuisine-5">Street Food</label><br />
              </div>
              <p>Cost For Two</p>
              <div onChange={costChangeHandler}>
                <input type="radio" name='cost' id='cost-1' />
                <label htmlFor="cost-1">Less than Rs.500</label><br />
                <input type="radio" name='cost' id='cost-2' />
                <label htmlFor="cost-2">Rs.500 to Rs.1000</label><br />
                <input type="radio" name='cost' id='cost-3' />
                <label htmlFor="cost-3">Rs.1000 to Rs.1500</label><br />
                <input type="radio" name='cost' id='cost-4' />
                <label htmlFor="cost-4">Rs.1500 to Rs.2000</label><br />
                <input type="radio" name='cost' id='cost-5' />
                <label htmlFor="cost-5">More than Rs.2000</label><br />
              </div>
              <p>Sort</p>
              <div onChange={sortChangeHandler}>
                <input type="radio" name='sort' id='sort-1' />
                <label htmlFor="sort-1">Price low to high</label><br />
                <input type="radio" name='sort' id='sort-2' />
                <label htmlFor="sort-2">Price high to low</label>
              </div>
              <button className='btn btn-secondary d-md-none d-block' onClick={()=> setShowFilter(false)}>Filter</button>
              <button className='btn btn-secondary' onClick={resetHandler}>Reset</button>
            </form>
          </div>
          <div className={`show-filter-result ${(showFilter && window.innerWidth < 768) ? "d-none": "d-flex"}`}>
            <FilteredItemsPages itemsPerPage={itemsPerPage} items={filteredRestaurants} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Filter
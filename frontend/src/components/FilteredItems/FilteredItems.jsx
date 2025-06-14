import React from 'react';
import './FilteredItems.css'; 
import { foodItemsImg } from '../../assets/assets.js'; 
import { Link } from 'react-router-dom';

const FilteredItems = ({ item }) => {
  return (
    
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
          
          <img src={foodItemsImg[item.image[0]]} className='food-img' alt="" />
          <div>
            
            <p className='food-title'>{item.name}</p>
            <p>{item.location}</p>
            <p className='text-secondary'>{item.city}</p>
          </div>
        </div>
        <hr />
        <div>
          
          <p>
            <span className='text-secondary'>Cuisines: </span>
            {
              item.cuisine.reduce((cuisines, element, index) => {
               
                if (index === 0) {
                  return element; 
                }
                return cuisines + ', ' + element; 
              }, '')
            }
          </p>
          
          <p>
            <span className='text-secondary'>COST For Two:</span> Rs. {item.price} for two (approx)
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FilteredItems;
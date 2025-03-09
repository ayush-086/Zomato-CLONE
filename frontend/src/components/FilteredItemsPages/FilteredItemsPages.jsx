import React, { useState } from 'react';
import FilteredItems from '../FilteredItems/FilteredItems'; // Import the FilteredItems component
import './FilteredItemsPages.css'; // Import CSS styles for the component

const FilteredItemsPages = ({ items, itemsPerPage }) => {
  // State to manage the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indices for slicing the items array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem); // Get items for the current page

  // Calculate total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Handler for moving to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler for moving to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler for selecting a specific page
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination buttons
  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        // Show buttons for the first, last, and surrounding pages
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            pageButtons.push(
                <button
                    key={i}
                    className={`btn btn-danger ${currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            // Show ellipsis for pages not shown
            pageButtons.push(
                <span key={`ellipsis-${i}`} className="btn btn-danger">
                    ...
                </span>
            );
        }
    }
    return pageButtons;
  };

  return (
    <div>
      {/* Display filtered items for the current page */}
      <div className='show-filter-result'>
        {currentItems.map((item) => (
          <FilteredItems key={item._id} item={item} />
        ))}
      </div>
      {/* Pagination controls */}
      <div className={`pages m-auto d-flex align-items-center justify-content-between mt-3 ${(items.length < 5 ? 'd-none' : 'd-flex')}`}>
        <button 
          className='prev-page btn btn-primary me-1' 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <div className='d-flex gap-1'>
            {renderPageButtons()} {/* Render pagination buttons */}
        </div>
        <button 
          className='next-page btn btn-primary ms-1' 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default FilteredItemsPages;
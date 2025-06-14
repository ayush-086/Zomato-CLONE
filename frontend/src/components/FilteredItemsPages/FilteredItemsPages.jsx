import React, { useState } from 'react';
import FilteredItems from '../FilteredItems/FilteredItems'; 
import './FilteredItemsPages.css'; 
const FilteredItemsPages = ({ items, itemsPerPage }) => {
  
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem); 

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
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
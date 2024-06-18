import React from 'react';
import PropTypes from 'prop-types';
import { FrontArrow, BackArrow } from '@/components/common/form';
import ReactPaginate from 'react-paginate';
import "./pagination.css";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const handlePageChange = ({ selected }) => {
      onPageChange(selected);
  };
  return (
    <div className="pagination">
      <FrontArrow
        onClick={handlePrevious}
        disabled={currentPage === 1}
      ></FrontArrow>

      <span>
        {' '}
        Page {currentPage} of {totalPages}{' '}
      </span>
      
      <BackArrow onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </BackArrow>
    </div>
    
    // new pagination commented as the its not completed fully yet.

    // <div>
    //    <ReactPaginate
    //     pageCount={totalPages}
    //     onPageChange={handlePageChange}
    //     forcePage={currentPage}
    //     containerClassName="pagination"
    //     activeClassName="active"
    //   />
    // </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

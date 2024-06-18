import React from 'react';

const AddFieldButton = ({ onClick }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <button
          type="button"
          className="btn ls-3 bg-success text-white ml-4"
          onClick={onClick}
        >
               <i className="feather-arrow-right"></i>

        </button>
      </div>
    </div>
  );
};

export default AddFieldButton;

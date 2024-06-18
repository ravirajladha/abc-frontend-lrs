import React from 'react';

const AddFieldButton = ({ onClick }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <button
          type="button"
          className="btn ls-3 bg-success text-white mr-4"
          onClick={onClick}
        >
       <i className="feather-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default AddFieldButton;

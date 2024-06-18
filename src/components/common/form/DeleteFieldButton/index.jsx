import React from 'react';

const DeleteFieldButton = ({ onClick }) => {
  return (
    <div className="col-lg-1">
       <label className="mont-font fw-600 font-xsss"> </label><br />
        <button
          type="button"
          className="btn btn-danger mt-2 ls-3"
          onClick={onClick}
          style={{
            backgroundColor: "red",
            color: "white",
          }}
        >
          <i className="feather-minus"></i>
        </button>
    </div>
  );
};

export default DeleteFieldButton;

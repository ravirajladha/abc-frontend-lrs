import React from 'react';

function Image_1({ inputFields, handleImageChange }) {
  return (
    <>
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Image</label>
          <input
            type="file"
            className="form-control-file border-size-md p-2 rounded-sm"
            name="image"
            onChange={(e) => handleImageChange(e, 'image')}
            accept="image/*"
            value={inputFields.image}
            required
          />
        </div>
      </div>
    </>
  );
}

export default Image_1;

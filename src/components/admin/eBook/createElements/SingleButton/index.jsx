import React from 'react';

const SingleButton = ({ inputFields, handleInputChange }) => (

  <div className="col-lg-4 mb-3">
    <div className="form-group">
      <label className="mont-font fw-600 font-xsss">Button Type</label>
      <select
        className="form-control"
        name="single_button_type"
        id="single_button_type"
        onChange={(e) => handleInputChange(e, 'single_button_type')}
        value={inputFields.single_button_type}
      >
        <option value="" disabled readOnly>
          --select--
        </option>
        <option value="1">Practice</option>
        <option value="2">Click To View Output</option>
      </select>
    </div>
  </div>
);

export default SingleButton;

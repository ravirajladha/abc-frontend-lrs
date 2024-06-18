import React from 'react';

const Heading = ({ inputFields, handleInputChange }) => (
  <>
    {/* Heading */}
    <div className="col-lg-4 mb-3">
      <div className="form-group">
        <label className="mont-font fw-600 font-xsss">Heading</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Heading"
          name="heading"
          value={inputFields.heading}
          onInput={(e) => handleInputChange(e, 'heading')}
          required
        />
      </div>
    </div>
    {/* Heading Type */}
    <div className="col-lg-4 mb-3">
      <div className="form-group">
        <label className="mont-font fw-600 font-xsss">Heading Type</label>
        <select
          className="form-control"
          name="heading_type"
          id="heading_type"
          value={inputFields.heading_type}
          onChange={(e) => handleInputChange(e, 'heading_type')}
          required
        >
          <option value="" >
            --select--
          </option>
          <option value="1">Type-1</option>
          <option value="2">Type 2</option>
        </select>
      </div>
    </div>
  </>
);

export default Heading;

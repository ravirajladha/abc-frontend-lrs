import React from 'react'

const Example = ({ inputFields, handleInputChange }) => (
    <div className="col-lg-12 mb-3">
      <div className="form-group">
        <label className="mont-font fw-600 font-xsss">Content</label>
        <textarea
          name="paragraph"
          className="form-control mb-0 p-3 h100 bg-greylight lh-16"
          rows="5"
          placeholder="Enter Content..."
          spellCheck="false"
          id="abc_editor"
          value={inputFields.paragraph}
          onChange={(e) => handleInputChange(e, "paragraph")}
        />
      </div>
    </div>
  );

export default Example

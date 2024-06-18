import React from 'react';

function Gif({ inputFields, handleImageChange }) {
  return (
    <>
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Gif File</label>
          <input
            type="file"
            className="form-control-file border-size-md p-2 rounded-sm"
            name="gif_file"
            onChange={(e) => handleImageChange(e, 'gif_file')}
            accept=".gif"
            required
          />
        </div>
      </div>
    </>
  );
}

export default Gif;

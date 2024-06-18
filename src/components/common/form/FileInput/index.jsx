import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function FileInput({ fileTypes, onSelectFile, selectedFile, clearSelectedFile }) {
  const [selectedVideo, setSelectedVideo] = useState(selectedFile);
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    setSelectedVideo(file);
    onSelectFile(file);
  };

  const clearFile = () => {
    setSelectedVideo(null);
    clearSelectedFile();
  };

  return (
    <div className="form-group">
      <label htmlFor="fileInput" className="mont-font fw-600 font-xsss">
        {fileTypes === 'video' ? 'Content Video' : 'Image'}
      </label>
      <input
        type="file"
        id="fileInput"
        accept={fileTypes === 'video' ? 'video/*' : 'image/*'}
        className="input-file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="rounded-lg text-center bg-white btn-tertiary js-labelFile py-1 w-100 border-dashed"
      >
        <i className={`ti-cloud-down small-icon mr-3`}></i>
        <span
          className="js-fileName cursor-pointer"
          onClick={clearFile}
        >
          {selectedVideo
            ? `Selected ${fileTypes === 'video' ? 'Video' : 'Image'}: ${selectedVideo.name}`
            : `Click to select ${fileTypes === 'video' ? 'video' : 'image'}`}
        </span>
      </label>
    </div>
  );
}

FileInput.propTypes = {
  fileTypes: PropTypes.oneOf(['video', 'image']).isRequired,
  onSelectFile: PropTypes.func.isRequired,
  selectedFile: PropTypes.object,
  clearSelectedFile: PropTypes.func.isRequired,
};

export default FileInput;

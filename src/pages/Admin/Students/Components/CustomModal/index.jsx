import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomModal = ({
  isOpen,
  onClose,
  handleSubmit,
  handleFileChange,
  studentId,
  createdBy,
}) => {
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const localHandleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    handleFileChange(files);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    await handleSubmit(null, images, studentId, createdBy); // Pass all necessary data back to parent
    setIsSubmitting(false);
    onClose(); // Close modal after submit
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <h2 className="fw-700 text-grey-900">Upload Images for Student </h2>
        <input
          type="file"
          multiple
          onChange={localHandleFileChange}
          style={styles.fileInput}
        />
        <button
          onClick={submitForm}
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  studentId: PropTypes.number.isRequired,
  createdBy: PropTypes.number.isRequired,
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1040,
  },
  modal: {
    position: 'relative',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  heading: {
    margin: '20px 0',
  },
  fileInput: {
    display: 'block',
    margin: '20px auto',
    backgroundColor: '#FFBF78',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderColor: 'black',
    // backgroundColor: #007bff
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#A1DD70',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CustomModal;

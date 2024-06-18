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


  const baseUrl = import.meta.env.VITE_BASE_URL;



  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <h2 className="fw-700 text-grey-900 mt-4">{' '} </h2>
        <div className="col-md-12 mb-4" key={studentId.id}>
          <div className="card">
            <div className="card-body">
              <div className="mb-4 d-block w-100 rounded-lg border-0 text-center">
                <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden">
                  <img
                    src={
                      studentId?.image_path
                        ? baseUrl + studentId?.image_path
                        : DefaultProfileImage
                    }
                    alt="avatar"
                    className="w-100 mt-2"
                  />
                </figure>
                <h4 className="fw-700 font-xs my-3">Quote: {studentId?.quote_text}</h4>
                {/* <div className="clearfix"></div>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                  {student?.class_name}
                </span>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-primary d-inline-block text-primary mb-1 mr-1">
                  Section {student?.section_name}
                </span> */}
              </div>
              {/* <div className="d-flex justify-content-between">
                <Link
                  onClick={() => toggleModal(student)}
                  className="btn btn-outline-success btn-icon btn-sm mr-2"
                >
                  Add Photo
                </Link>
                <Link
                  to={`${student.auth_id}/show`}
                  className="btn btn-outline-warning btn-icon btn-sm"
                >
                  View Photo
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  // studentId: PropTypes.number.isRequired,
  // createdBy: PropTypes.number.isRequired,
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
    backgroundColor: '#007bff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderColor: 'black',
    // backgroundColor: #007bff
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CustomModal;

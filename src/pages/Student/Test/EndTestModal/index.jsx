import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const EndTestModal = ({
  isOpen,
  onClose,
  handleEndTestConfirmation,
  handleAnotherAction,
  studentId,
}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
              <div className="col-md-12 mb-4" key={studentId.id}>
                <div className="card">
                  <div className="card-body">
                    <div className="mb-4 d-block w-100 rounded-lg border-0 text-center">
                      {/* <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden"> */}
                        {/* <img
                          src={
                            studentId?.image_path
                              ? baseUrl + studentId?.image_path
                              : DefaultProfileImage
                          }
                          alt="avatar"
                          className="w-100 mt-2"
                        /> */}
                      {/* </figure> */}
                      {/* <h4 className="fw-700 font-xs my-3">Quote: {studentId?.quote_text}</h4> */}
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="btn-danger" onClick={handleEndTestConfirmation}>
                Yes, end test
              </Button>
              <Button variant="btn-success" onClick={onClose}>
                No, continue test
              </Button>
              <Button variant="btn-primary" onClick={handleAnotherAction} className="mt-4">
                Another action
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

EndTestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleEndTestConfirmation: PropTypes.func.isRequired,
  handleAnotherAction: PropTypes.func.isRequired,
  studentId: PropTypes.object.isRequired,
};

export default EndTestModal;

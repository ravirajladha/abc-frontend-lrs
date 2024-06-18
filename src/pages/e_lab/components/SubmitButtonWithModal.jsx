import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Assuming you are using react-bootstrap

const SubmitButtonWithModal = ({ handleSubmitCode, allTestCasesPassed }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    // Show the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setShowModal(false);
  };

  const handleConfirmSubmission = () => {
    // Call the submit handler passed from the parent component
    handleSubmitCode();

    // Close the modal
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleShowModal}
        disabled={!allTestCasesPassed}
        title={
          !allTestCasesPassed
            ? 'All test cases must pass before submitting code.'
            : 'Click to submit code.'
        }
        className={`mt-1 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 transition duration-200 flex-shrink-0 ${
          allTestCasesPassed
            ? 'bg-green-100 hover:bg-green-200 text-black'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Submit Code
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit the code? You will be redirected to another page upon submission.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="px-2 py-1 mt-2 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-warning"  onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary"  className="px-2 py-1 mt-2 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-primary" onClick={handleConfirmSubmission}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubmitButtonWithModal;

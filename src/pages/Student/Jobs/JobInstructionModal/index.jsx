import React from 'react';

const JobInstructionsModal = ({ showModal, handleCloseModal, currentJob, handleStartTestFromModal }) => {
  return (
    <div
      className={`modal ${showModal ? 'show' : ''}`}
      onClick={handleCloseModal}
    >
      <div
        className="modal-content-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">Job Instructions</h3>{' '}
          <span className="modal-title text-sm mt-0 ml-4">
            (Read Carefully before starting the test)
          </span>
          <button
            type="button"
            className="close"
            onClick={handleCloseModal}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {currentJob?.instruction && (
            <>
              <h5>Job Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentJob.instruction,
                }}
                style={{ listStyleType: 'disc', paddingLeft: '20px' }}
              />
            </>
          )}

          {currentJob?.test_instruction && (
            <>
              <h5>Test Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentJob.test_instruction,
                }}
                style={{ listStyleType: 'disc', paddingLeft: '20px' }}
              />
            </>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn text-white bg-success"
            onClick={() =>
              currentJob && handleStartTestFromModal(currentJob.id, currentJob.test_id)
            }
          >
            {currentJob?.test_id ? 'Start Test' : 'Apply for Job'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobInstructionsModal;

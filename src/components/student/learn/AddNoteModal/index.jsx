import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { formatVideoTimestamp } from '@/utils/helpers';

const AddNoteModal = ({
  show,
  handleClose,
  noteTimestamp,
  newNote,
  handleNoteChange,
  handleSaveNote,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeLabel="Close" closeVariant="white" closeButton={true}>
        <Modal.Title className="mt-1">Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="bg-dark fw-500 text-white font-xsss p-1 lh-32 w150 text-center d-inline-block rounded mb-3"
            id="time"
          >
           at {formatVideoTimestamp(noteTimestamp)}
          </div>
        </div>
        <div className="form-group icon-input mb-3">
          <i className="font-sm ti-file text-grey-500 pr-0"></i>
          <input
            type="text"
            name="note"
            className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
            placeholder="Add a note"
            value={newNote}
            onChange={handleNoteChange}
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="form-group mb-1">
          <button
            type="submit"
            className="btn text-white bg-current px-3"
            onClick={handleSaveNote}
          >
            <i className="feather feather-save font-xsss"></i> Save
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

AddNoteModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  noteTimestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  newNote: PropTypes.string,
  handleNoteChange: PropTypes.func,
  handleSaveNote: PropTypes.func,
};

export default AddNoteModal;

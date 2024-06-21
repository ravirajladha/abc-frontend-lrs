import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ContentDisplayModal = ({ show, handleClose, title, content }) => {
  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title className="mt-1">
        <h4 className="fw-600 font-xs mt-1 mb-0">{title}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0 overflow-auto" style={{ maxHeight: '70vh' }}>{content}</Modal.Body>
    </Modal>
  );
};

ContentDisplayModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default ContentDisplayModal;

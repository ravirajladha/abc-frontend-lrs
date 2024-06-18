import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../../EditDeleteButton';

function Image_2_1({
  element,
  ebookId,
  moduleId,
  enableEdit,
  onDelete,
}) {
  const sectionId = element.ebook_section_id;
  const elementId = element.id;

  const modalHeader1 = {
    backgroundImage: 'linear-gradient(to right, #4d9fd3, #737aba, #8c63aa)',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const modalHeader2 = {
    backgroundImage: 'linear-gradient(to right, #8c63aa, #ac2f84, #df127a)',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const closeModal1 = () => setModal1Open(false);
  const closeModal2 = () => setModal2Open(false);
  return (
    <>
     {enableEdit && (
        <EditDeleteButtons
          ebookId={ebookId}
          moduleId={moduleId}
          sectionId={sectionId}
          elementId={elementId}
          onDelete={onDelete}
        />
      )}

      <div className="img-preview-2_1">
        <img
          src="/assets/images/ebook/2.1.png"
          alt="preview"
          className="introduction-img"
          width={'100%'}
        />
        <div className="box1" onClick={() => setModal1Open(true)}>
          <p className="p1">{element.image_text_1}</p>
        </div>

        <div className="box2" onClick={() => setModal2Open(true)}>
          <p className="p2">{element.image_text_2}</p>
        </div>

        {/* Modal 2 Option-1 */}
        <Modal show={modal1Open} onHide={closeModal1}>
          <Modal.Header closeButton style={modalHeader1}>
            <Modal.Title>{element.image_text_1}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_1}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Modal 2 Option-2 */}
        <Modal show={modal2Open} onHide={closeModal2}>
          <Modal.Header closeButton style={modalHeader2}>
            <Modal.Title>{element.image_text_2}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_2}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

Image_2_1.propTypes = {
  element: PropTypes.any,
  ebookId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default Image_2_1;

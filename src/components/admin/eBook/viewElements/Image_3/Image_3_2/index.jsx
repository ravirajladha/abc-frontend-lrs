import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../../EditDeleteButton';

function Image_3_2({
  element,
  ebookId,
  moduleId,
  enableEdit,
  onDelete,
}) {
  const sectionId = element.ebook_section_id;
  const elementId = element.id;

  const modalHeader1 = {
    backgroundColor: '#f26667',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const modalHeader2 = {
    backgroundColor: '#faa945',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const modalHeader3 = {
    backgroundColor: '#185b86',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  const closeModal1 = () => setModal1Open(false);
  const closeModal2 = () => setModal2Open(false);
  const closeModal3 = () => setModal3Open(false);
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

      <div className="img-preview-3_2">
        <img
          src="/assets/images/ebook/3.2.png"
          alt="preview"
          className="introduction-img"
          width={'100%'}
        />

        <div className="box0">
          <p className="p0">{element.image_subheading_1}</p>
        </div>

        <div className="box0_1">
          <p className="p0_1">{element.image_heading_1}</p>
        </div>

        <div className="box1" onClick={() => setModal1Open(true)}>
          <p className="p1">{element.image_subtext_1}</p>
        </div>
        <div className="box1_1" onClick={() => setModal1Open(true)}>
          <p className="p1_1">{element.image_text_1}</p>
        </div>

        <div className="box2" onClick={() => setModal2Open(true)}>
          <p className="p2">{element.image_subtext_2}</p>
        </div>
        <div className="box2_1" onClick={() => setModal2Open(true)}>
          <p className="p2_1">{element.image_text_2}</p>
        </div>

        <div className="box3" onClick={() => setModal3Open(true)}>
          <p className="p3">{element.image_subtext_3}</p>
        </div>
        <div className="box3_1" onClick={() => setModal3Open(true)}>
          <p className="p3_1">{element.image_text_3}</p>
        </div>

        {/* Modal 3 Option-1-1 */}
        <Modal show={modal1Open} onHide={closeModal1}>
          <Modal.Header closeButton style={modalHeader1}>
            <Modal.Title>{element.image_text_1}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_1}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Modal 3 Option-1-2 */}
        <Modal show={modal2Open} onHide={closeModal2}>
          <Modal.Header closeButton style={modalHeader2}>
            <Modal.Title>{element.image_text_2}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_2}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Modal 3 Option-1-3 */}
        <Modal show={modal3Open} onHide={closeModal3}>
          <Modal.Header closeButton style={modalHeader3}>
            <Modal.Title>{element.image_text_3}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_3}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

Image_3_2.propTypes = {
  element: PropTypes.any,
  ebookId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default Image_3_2;

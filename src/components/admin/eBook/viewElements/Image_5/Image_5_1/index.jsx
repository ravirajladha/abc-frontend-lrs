import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../../EditDeleteButton';

function Image_5_1({ element, ebookId, moduleId, enableEdit, onDelete }) {
  const sectionId = element.ebook_section_id;
  const elementId = element.id;

  const modalHeader1 = {
    backgroundColor: '#ef5225',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const modalHeader2 = {
    backgroundColor: '#e92f91',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const modalHeader3 = {
    backgroundColor: '#743e96',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const modalHeader4 = {
    backgroundColor: '#3c54a4',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const modalHeader5 = {
    backgroundColor: '#77ccd6',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff',
  };
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);
  const [modal5Open, setModal5Open] = useState(false);

  const closeModal1 = () => setModal1Open(false);
  const closeModal2 = () => setModal2Open(false);
  const closeModal3 = () => setModal3Open(false);
  const closeModal4 = () => setModal4Open(false);
  const closeModal5 = () => setModal5Open(false);
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
      <div className="img-preview-5_1">
        <img
          src="/assets/images/ebook/5.1.png"
          alt="preview"
          className="introduction-img"
          width={'100%'}
        />

        <div className="box0">
          <p className="p0">{element.image_heading_1}</p>
        </div>

        <div className="box1" onClick={() => setModal1Open(true)}>
          <p className="p1">{element.image_text_1}</p>
        </div>

        <div className="box2" onClick={() => setModal2Open(true)}>
          <p className="p2">{element.image_text_2}</p>
        </div>

        <div className="box3" onClick={() => setModal3Open(true)}>
          <p className="p3">{element.image_text_3}</p>
        </div>

        <div className="box4" onClick={() => setModal4Open(true)}>
          <p className="p4">{element.image_text_4}</p>
        </div>

        <div className="box5" onClick={() => setModal5Open(true)}>
          <p className="p5">{element.image_text_5}</p>
        </div>

        {/* Modal 5_1_1 */}
        <Modal show={modal1Open} onHide={closeModal1} centered>
          <Modal.Header closeButton style={modalHeader1}>
            <Modal.Title>{element.image_text_1}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_1}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Modal 5_1_2 */}
        <Modal show={modal2Open} onHide={closeModal2} centered>
          <Modal.Header closeButton style={modalHeader2}>
            <Modal.Title>{element.image_text_2}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_2}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Modal 5_1_3 */}
        <Modal show={modal3Open} onHide={closeModal3} centered>
          <Modal.Header closeButton style={modalHeader3}>
            <Modal.Title>{element.image_text_3}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_3}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Modal 5_1_4 */}
        <Modal show={modal4Open} onHide={closeModal4} centered>
          <Modal.Header closeButton style={modalHeader4}>
            <Modal.Title>{element.image_text_4}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_4}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        {/* Modal 5_1_5 */}
        <Modal show={modal5Open} onHide={closeModal5} centered>
          <Modal.Header closeButton style={modalHeader5}>
            <Modal.Title>{element.image_text_5}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{element.image_desc_5}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

Image_5_1.propTypes = {
  element: PropTypes.any,
  ebookId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default Image_5_1;

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function Paragraph({
  element,
  ebookId,
  moduleId,
  enableEdit,
  onDelete,
}) {
  const sectionId = element.ebook_section_id;
  const elementId = element.id;
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
      <pre className="custom-pre">{element.paragraph}</pre>{' '}
      <div className="spacer">&nbsp;</div>
    </>
  );
}

Paragraph.propTypes = {
  element: PropTypes.any,
  ebookId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default Paragraph;

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function Example({ element, ebookId, moduleId, enableEdit, onDelete }) {
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
      <div class="doc-code">
        <pre>
          <code id="font-link" class="language-markup">
            {element.paragraph}
          </code>
        </pre>
      </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

Example.propTypes = {
  element: PropTypes.any,
  ebookId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default Example;

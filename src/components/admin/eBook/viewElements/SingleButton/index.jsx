import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function SingleButton({
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
      <div>
            {element.single_button_type === 1 && (
                <div className="text-center">
                    <a href="#x" className="btn btn-primary pill mt-2">
                        PRACTICE
                    </a>
                </div>
            )}

            {element.single_button_type === 2 && (
                <div className="text-center">
                    <a href="#x" className="btn btn-primary pill mt-2">
                        CLICK TO VIEW OUTPUT
                    </a>
                </div>
            )}

            <div className="spacer">&nbsp;</div>
        </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

SingleButton.propTypes = {
  element: PropTypes.any,
  ebookId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default SingleButton;

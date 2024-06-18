import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import listStyles from './list.module.css';

function Points({
  element,
  caseStudyId,
  moduleId,
  sectionId,
  elementId,
  enableEdit,
  onDelete,
}) {
  return (
    <>
      <ul
        className={`${listStyles['list-icon']}
        ${listStyles['list-success']}
        ${listStyles[`list-${element.list_type}`]}
        mb-25`}
      >
        {element.list_points.split('#@#').map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      {enableEdit && (
        <>
          <Link
            to={`/admin/case-studies/${caseStudyId}/modules/${moduleId}/sections/${sectionId}/elements/${elementId}/edit`}
            className="btn btn-outline-warning btn-icon btn-sm mr-2 position-absolute"
            style={{
              top: '20px',
              right: '40px',
            }}
          >
            <i className="feather-edit"></i>
          </Link>
          <button
            className="btn btn-outline-danger btn-icon btn-sm position-absolute"
            style={{ top: '20px', right: '5px' }}
            onClick={() => onDelete && onDelete(elementId)}
          >
            <i className="feather-trash"></i>
          </button>
        </>
      )}
      <div className="spacer">&nbsp;</div>
    </>
  );
}

Points.propTypes = {
  element: PropTypes.any,
  caseStudyId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default Points;

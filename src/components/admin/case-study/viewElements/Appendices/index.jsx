import React from 'react';
import { Link } from 'react-router-dom';

function Appendices({
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
      {element.appendices_heading.split('#@#').map((heading, index) => (
        <React.Fragment key={index}>
          <h6 style={{ fontWeight: '600' }}>
            {heading}:{' '}
            <span style={{ fontWeight: '400' }}>
              {element.appendices_sub_heading.split('#@#')[index]}
            </span>
          </h6>
          <p className="pt-2 ms-4" style={{ fontSize: '18px' }}>
            {element.appendices_desc.split('#@#')[index]}
          </p>
        </React.Fragment>
      ))}
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
            style={{ top: '20px', right: '5px'}}
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

export default Appendices;

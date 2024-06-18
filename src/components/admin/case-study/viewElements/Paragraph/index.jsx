import React from 'react';
import { Link } from 'react-router-dom';

function Paragraph({
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
      <pre className="custom-pre">{element.paragraph}</pre>{' '}
      {enableEdit && (
        <>
          <Link
            to={`/admin/case-studies/${caseStudyId}/modules/${moduleId}/sections/${sectionId}/elements/${elementId}/edit`}
            className="btn btn-outline-warning btn-icon btn-sm mr-2 position-absolute"
            style={{
              top: '20px',
              right: '40px',
              // height: '40px',
              // width: '40px',
            }}
          >
            <i className="feather-edit" 
            // style={{ lineHeight: '40px' }}
            ></i>
          </Link>
          <button
            className="btn btn-outline-danger btn-icon btn-sm position-absolute"
            style={{ top: '20px', right: '5px',
            //  height: '40px', width: '40px'
             }}
            onClick={() => onDelete && onDelete(elementId)}
          >
            <i className="feather-trash" 
            // style={{ lineHeight: '40px' }}
            ></i>
          </button>
        </>
      )}
      <div className="spacer">&nbsp;</div>
    </>
  );
}

export default Paragraph;

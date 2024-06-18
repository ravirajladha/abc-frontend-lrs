
import React from 'react';
import { Link } from 'react-router-dom';

function Paragraph({ element, projectReportId, moduleId, sectionId, elementId,enableEdit,onDelete,}) {
  return (
    <>
      <pre className="custom-pre">{element.paragraph}</pre>{' '}

    {enableEdit && (
        <>
          <Link
            to={`/admin/project-reports/${projectReportId}/modules/${moduleId}/sections/${sectionId}/elements/${elementId}/edit`}
            className="btn btn-outline-warning btn-icon btn-sm mr-2 position-absolute"
            style={{ top: '20px',right: '40px' }}
          >
            <i className="feather-edit"></i>
          </Link>
          <button
            className="btn btn-outline-danger btn-icon btn-sm position-absolute"
            style={{ top: '20px',right: '5px' }}
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

export default Paragraph;


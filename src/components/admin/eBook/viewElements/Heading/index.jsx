import React from 'react';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function Heading({
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


      <div className="d-flex justify-content-center align-items-center">
        <h6
          id={`${element.heading}-link`}
          className={`p-20 doc-sub-title rounded-xs ${
            element.heading_type === 1 ? 'bg-grey' : 'bg-danger'
          }`}
        >
          {element.heading}
        </h6>
      </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

export default Heading;

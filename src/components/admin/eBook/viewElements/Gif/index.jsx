import React from 'react';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function Gif({
  element,
  ebookId,
  moduleId,
  enableEdit,
  onDelete,
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
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
      <div className="doc-info text-center">
        <img
          src={baseUrl + element.image}
          className="img-fluid"
          alt="Responsive image"
          style={{ width: '40%', height: 'auto' }}
        />
      </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

export default Gif;

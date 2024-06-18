// EditDeleteButtons.js

import React from 'react';
import { Link } from 'react-router-dom';

function EditDeleteButtons({ ebookId, moduleId, sectionId, elementId, onDelete }) {
  return (
    <>
      <Link
        to={`/admin/ebooks/${ebookId}/modules/${moduleId}/sections/${sectionId}/elements/${elementId}/edit`}
        className="btn btn-outline-warning btn-icon btn-sm mr-2 position-absolute"
        style={{ right: '40px' }}
      >
        <i className="feather-edit"></i>
      </Link>
      <button
        className="btn btn-outline-danger btn-icon btn-sm position-absolute"
        style={{ right: '0' }}
        onClick={() => onDelete && onDelete(elementId)}
      >
        <i className="feather-trash"></i>
      </button>
    </>
  );
}

export default EditDeleteButtons;

import React from 'react';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

import listStyles from './list.module.css';

function Points({ element, ebookId, moduleId, enableEdit, onDelete }) {
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
        <h6 id="lists-link" className="pt-50 doc-sub-title">
          {element.list_heading}{' '}
          <a href="#lists-link">
            <i className="fas fa-hashtag"></i>
          </a>
        </h6>
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
      </div>

      <div className="spacer">&nbsp;</div>
    </>
  );
}

export default Points;

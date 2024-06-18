import React from 'react';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function TextBox({ element, ebookId, moduleId, enableEdit, onDelete }) {
  const sectionId = element.ebook_section_id;
  const elementId = element.id;
  const buttonTexts = element.button_text.split('#@#');
  const columnCount = buttonTexts.length;
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
      <div className="doc-info">
        <div className="row text-center justify-content-center">
          {columnCount === 1 ? (
            <div className="col-lg-2">
              <div
                className="bg-grey mb-2 rounded d-flex align-items-center justify-content-center"
                style={{ width: '100%', height: '100px' }}
              >
                {buttonTexts[0]}
              </div>
            </div>
          ) : (
            buttonTexts.map((item, count) => (
              <div key={count} className="col-lg-2">
                <div
                  className="bg-grey mb-2 rounded d-flex align-items-center justify-content-center"
                  style={{ width: '100%', height: '100px' }}
                >
                  {item}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="spacer">&nbsp;</div>
    </>
  );
}

export default TextBox;

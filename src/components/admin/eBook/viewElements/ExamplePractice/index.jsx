import React from 'react';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function ExamplePractice({ element, ebookId, moduleId, enableEdit, onDelete }) {
  const sectionId = element.ebook_section_id;
  const elementId = element.id;

  const exampleText = element.example_text.split('#@#');
  const exampleDescriptions = element.example_description.split('#@#');
  const practiceDescriptions = element.practice_description.split('#@#');
  const columnCount = exampleText.length;
  const columnSize = 12 / columnCount;
  console.log(practiceDescriptions);
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
        <div className="row text-center">
          {columnCount === 1 ? (
            <>
              <div className="col-lg-6">
                <a href="#x" className="btn btn-primary pill">
                  PROGRAMMING EXAMPLE
                </a>
              </div>
              <div className="col-lg-6">
                <a href="#x" className="btn btn-primary pill mt-2">
                  PRACTICE
                </a>
              </div>
            </>
          ) : (
            <>
              {exampleText.map((item, index) => (
                <div key={index} className={`col-lg-${columnSize}`}>
                  <a href="#x" className="btn btn-primary pill">
                    <p>{item}</p>PROGRAMMING EXAMPLE
                  </a>
                  <a
                    href="#x"
                    className="btn btn-primary pill mt-2"
                  >
                    PRACTICE
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="spacer">&nbsp;</div>
    </>
  );
}

export default ExamplePractice;

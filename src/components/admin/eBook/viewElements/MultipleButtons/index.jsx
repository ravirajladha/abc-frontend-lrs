import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditDeleteButtons from '../EditDeleteButton';

function MultipleButtons({ element, ebookId, moduleId, enableEdit, onDelete }) {
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
            <div className="col-lg-6">
              <div
                style={{
                  backgroundImage: "url('/assets/images/ebook/BOTTON.jpg')",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  height: '4em',
                  width: '100%',
                  borderLeft: '0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {buttonTexts[0]}
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-evenly">
                {buttonTexts
                  .slice(0, Math.ceil(columnCount / 2))
                  .map((item, key) => (
                    <div key={key} className="fliper">
                      {item}
                    </div>
                  ))}
              </div>
              <div className="d-flex justify-content-evenly mt-2">
                {buttonTexts
                  .slice(Math.ceil(columnCount / 2))
                  .map((item, key) => (
                    <div
                      key={key}
                      style={{
                        background:
                          "url('/assets/images/ebook/BOTTON.jpg') no-repeat center center",
                        backgroundSize: 'contain',
                        height: '4em',
                        width: '100%',
                        borderLeft: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0px 10px',
                      }}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="spacer">&nbsp;</div>
    </>
  );
}

MultipleButtons.propTypes = {
  element: PropTypes.any,
  ebookId: PropTypes.any,
  moduleId: PropTypes.any,
  sectionId: PropTypes.any,
  elementId: PropTypes.any,
  enableEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default MultipleButtons;

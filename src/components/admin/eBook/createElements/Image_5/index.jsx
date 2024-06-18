// ImageSection.js
import React from 'react';

const Image_5 = ({
  selectedValue,
  inputFields,
  handleInputChange,
  handleImageTypeChange,
}) => {
  const imageLink =
    selectedValue === 'image_5_1'
      ? '/assets/images/ebook/5.1.png'
      : '/assets/images/ebook/5.2.png';

  const arrayLength = 5;
  const fields = Array.from({ length: arrayLength }, (_, index) => index); // Create an array with 3 elements

  const generateInputFields = (prefix, imageLink = null) => (
    <>
      <div className="col-lg-4 mb-3">
        {imageLink && (
          <a
            onClick={() =>
              window.open(imageLink, '_blank', 'width=800,height=600')
            }
          >
            <img
              src={imageLink}
              alt={`photo_${prefix.toLowerCase()}`}
              style={{ height: '100px', maxWidth: '100%' }}
            />
          </a>
        )}
      </div>
      <div className="col-lg-4 mb-3"></div>
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Heading</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Heading"
            name="image_heading_1"
            value={inputFields.image_heading_1}
            onChange={(e) => handleInputChange(e, 'image_heading_1')}
          />
        </div>
      </div>
      {prefix === 'image_5_2' && (
        <>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Sub Heading(Smaller)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Heading"
                name="image_subheading_1"
                value={inputFields.image_subheading_1}
                onChange={(e) => handleInputChange(e, 'image_subheading_1')}
              />
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Sub Heading 2
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Heading"
                name="image_subheading_2"
                value={inputFields.image_subheading_2}
                onChange={(e) => handleInputChange(e, 'image_subheading_2')}
              />
            </div>
          </div>
        </>
      )}

      <div className={prefix === 'image_5_1' ? 'col-lg-8 mb-3' : ''}></div>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">{`Text-${
                index + 1
              }`}</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Text"
                name={`image_text_${index + 1}`}
                value={inputFields[`image_text_${index + 1}`]}
                onChange={(e) =>
                  handleInputChange(e, `image_text_${index + 1}`)
                }
              />
            </div>
          </div>
          <div className="col-lg-8 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Description</label>
              <textarea
                className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                rows="5"
                placeholder="Enter Description..."
                spellCheck="false"
                name={`image_desc_${index + 1}`}
                value={inputFields[`image_desc_${index + 1}`]}
                onChange={(e) =>
                  handleInputChange(e, `image_desc_${index + 1}`)
                }
              ></textarea>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
  const renderImageTypeFields = () => {
    switch (selectedValue) {
      case 'image_5_1':
        return generateInputFields('image_5_1', imageLink);
      case 'image_5_2':
        return generateInputFields('image_5_2', imageLink);
      default:
        return null;
    }
  };
  return (
    <>
      <div className="col-lg-4 mb-3"></div>
      <div className="col-lg-4 mb-3"></div>
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Image Type</label>
          <select
            className="form-control"
            name="image_type"
            id="image_type_5"
            onChange={(e) => handleImageTypeChange(e, 'image_type')}
            value={selectedValue}
          >
            <option value="" disabled>
              --select--
            </option>
            <option value="image_5_1">Type-1</option>
            <option value="image_5_2">Type-2</option>
          </select>
        </div>
      </div>
      {renderImageTypeFields()}
    </>
  );
};

export default Image_5;

// ImageSection.js
import React from 'react';

const Image_2 = ({
  selectedValue,
  inputFields,
  handleInputChange,
  handleImageTypeChange,
}) => {
  const imageLink =
    selectedValue === 'image_2_1'
      ? '/assets/images/ebook/2.1.png'
      : selectedValue === 'image_2_2'
      ? '/assets/images/ebook/2.2.png'
      : '/assets/images/ebook/2.3.png';


  const generateInputFields = (prefix, imageLink = null) => (
    <>
      {prefix === 'image_2_3' && (
        <div className="col-lg-4 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Heading</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Heading"
              name="image_heading_1"
              id="image_heading_1"
              value={inputFields.image_heading_1}
              onChange={(e) => handleInputChange(e, 'image_heading_1')}
            />
          </div>
        </div>
      )}
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
      {(prefix === 'image_2_1' || prefix === 'image_2_2' || prefix === 'image_2_4')  && <div className="col-lg-4 mb-3"></div>}
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Text-1</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Text"
            name="image_text_1"
            value={inputFields.image_text_1}
            onChange={(e) => handleInputChange(e, 'image_text_1')}
          />
        </div>
      </div>
      <div className="col-lg-8 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Description</label>
          <textarea
            name="image_desc_1"
            className="form-control mb-0 p-3 h100 bg-greylight lh-16"
            rows="5"
            placeholder="Enter Description..."
            spellCheck="false"
            value={inputFields.image_desc_1}
            onChange={(e) => handleInputChange(e, 'image_desc_1')}
          ></textarea>
        </div>
      </div>
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Text-2</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Text"
            name="image_text_2"
            value={inputFields.image_text_2}
            onChange={(e) => handleInputChange(e, 'image_text_2')}
          />
        </div>
      </div>
      <div className="col-lg-8 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Description</label>
          <textarea
            name="image_desc_2"
            className="form-control mb-0 p-3 h100 bg-greylight lh-16"
            rows="5"
            placeholder="Enter Description..."
            spellCheck="false"
            value={inputFields.image_desc_2}
            onChange={(e) => handleInputChange(e, 'image_desc_2')}
          ></textarea>
        </div>
      </div>
    </>
  );
  const renderImageTypeFields = () => {
    switch (selectedValue) {
      case 'image_2_1':
        return generateInputFields('image_2_1', imageLink);
      case 'image_2_2':
        return generateInputFields('image_2_2', imageLink);
      case 'image_2_3':
        return generateInputFields('image_2_3', imageLink);
      case 'image_2_4':
        return generateInputFields('image_2_4', imageLink);
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
            id="image_type_2"
            onChange={(e) => handleImageTypeChange(e, 'image_type')}
            value={selectedValue}
          >
            <option value="" disabled>
              --select--
            </option>
            <option value="image_2_1">Type-1</option>
            <option value="image_2_2">Type-2</option>
            <option value="image_2_3">Type-3</option>
            <option value="image_2_4">Type-4</option>
          </select>
        </div>
      </div>
      {renderImageTypeFields()}
    </>
  );
};

export default Image_2;

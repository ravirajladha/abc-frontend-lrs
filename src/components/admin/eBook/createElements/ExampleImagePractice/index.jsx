import { AddFieldButton, DeleteFieldButton } from '@/components/common/form';
import React, { Fragment, useState } from 'react';

const ExampleImagePractice = ({
  handleImageChange,
  handleInputArrayChange,
}) => {
  const [inputArray, setInputArray] = useState(['']);

  const deleteSection = (index) => {
    const updatedInputArray = [...inputArray];
    updatedInputArray.splice(index, 1);
    setInputArray(updatedInputArray);
  };
  const addSection = () => {
    setInputArray([...inputArray, '']);
  };
  return (
    <>
      <div className="col-lg-12">
        <div className="row">
          {inputArray.map((title, index) => (
            <Fragment key={index}>
              <div className="col-lg-3 mb-2">
                <label className="mont-font fw-600 font-xsss">
                Text on the image
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter data"
                  required
                  name="example_image_text"
                  onChange={(e) =>
                    handleInputArrayChange(e, 'example_image_text', index)
                  }
                />
              </div>
              <div className="col-lg-4 mb-2">
                <label className="mont-font fw-600 font-xsss">
                Description for programming example
                </label>
                <textarea
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  name="example_description"
                  onChange={(e) =>
                    handleInputArrayChange(e, 'example_description', index)
                  }
                />
              </div>
              <div className="col-lg-4 mb-2">
                <label className="mont-font fw-600 font-xsss">
                Description for practice
                </label>
                <textarea
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  name="practice_description"
                  onChange={(e) =>
                    handleInputArrayChange(e, 'practice_description', index)
                  }
                />
              </div>
              <DeleteFieldButton onClick={() => deleteSection(index)} />
            </Fragment>
          ))}
        </div>
        <AddFieldButton onClick={addSection} />
      </div>
    </>
  );
};

export default ExampleImagePractice;

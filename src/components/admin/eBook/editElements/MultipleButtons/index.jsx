import { AddFieldButton, DeleteFieldButton } from '@/components/common/form';
import React, { Fragment, useState, useEffect } from 'react';

const MultipleButtons = ({
  inputFields,
  handleInputChange,
  handleInputArrayChange,
}) => {
  const [inputArray, setInputArray] = useState(inputFields.button_text || ['']);

  useEffect(() => {
    setInputArray(inputFields.button_text || ['']);
  }, [inputFields.button_text]);

  const deleteSection = (index) => {
    const updatedInputArray = inputArray.filter((_, i) => i !== index);
    setInputArray(updatedInputArray);
    handleInputArrayChange(updatedInputArray, 'button_text', index);
  };
  const addSection = () => {
    setInputArray([...inputArray, '']);
  };
  console.log(inputArray);
  return (
    <>
      <div className="col-lg-12">
        <div className="row">
          {inputArray.map((title, index) => (
            <Fragment key={index}>
              <div className="col-lg-6 mb-2">
                <label className="mont-font fw-600 font-xsss">Content for button</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter Points"
                  required
                  onChange={(e) =>
                    handleInputArrayChange(e.target.value, 'button_text', index)
                  }
                  value={inputFields.button_text[index]}
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

export default MultipleButtons;

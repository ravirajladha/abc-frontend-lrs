import { AddFieldButton, DeleteFieldButton } from '@/components/common/form';
import React, { Fragment, useState } from 'react';

const TextBox = ({ handleInputChange, handleInputArrayChange }) => {
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
              <div className="col-lg-6 mb-2">
                <label className="mont-font fw-600 font-xsss">Content for Text Box</label>
                <input
                  type="text"
                  className="form-control"
                  name="button_text"
                  placeholder="Enter Data"
                  required
                  onChange={(e) =>
                    handleInputArrayChange(e, 'button_text', index)
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

export default TextBox;

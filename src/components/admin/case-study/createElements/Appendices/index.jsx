import { AddFieldButton, DeleteFieldButton } from '@/components/common/form';
import React, { Fragment, useState } from 'react';

const Appendices = ({ handleInputChange, handleInputArrayChange }) => {
  const [inputArray, setInputArray] = useState(['']);

  const handleCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    const newArray = Array.from({ length: count }, (_, index) => index);
    setInputArray(newArray);
  };

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
              <div className="col-lg-3 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    onChange={(e) =>
                      handleInputArrayChange(e, 'appendices_heading', index)
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Sub Heading"
                    onChange={(e) =>
                      handleInputArrayChange(e, 'appendices_sub_heading', index)
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Description"
                    onChange={(e) =>
                      handleInputArrayChange(e, 'appendices_desc', index)
                    }
                    required
                  />
                </div>
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

export default Appendices;

import { AddFieldButton, DeleteFieldButton } from '@/components/common/form';
import React, { Fragment, useState, useEffect } from 'react';

const Point = ({
  inputFields,
  handleInputChange,
  handleInputArrayChange,
}) => {
  const [inputArray, setInputArray] = useState(inputFields.list_points || ['']);

  useEffect(() => {
    setInputArray(inputFields.list_points || ['']);
  }, [inputFields.list_points]);

  const deleteSection = (index) => {
    const updatedInputArray = inputArray.filter((_, i) => i !== index);
    setInputArray(updatedInputArray);
    handleInputArrayChange(updatedInputArray, 'list_points', index);
  };
  const addSection = () => {
    setInputArray([...inputArray, '']);
  };
  console.log(inputArray);
  return (
    <>
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">List Type</label>
          <select
            className="form-control"
            name="list_type"
            id="list_type"
            onChange={(e) => handleInputChange(e, 'list_type')}
            value={inputFields.list_type}
          >
            <option value="" disabled readOnly>
              --select--
            </option>
            <option value="bullet">Bullet</option>
            <option value="check">Check</option>
            <option value="arrow">Arrow</option>
            <option value="star">Star</option>
            <option value="square">Square</option>
          </select>
        </div>
      </div>
      <div className="col-lg-4 mb-3">
        <div className="form-group">
          <label className="mont-font fw-600 font-xsss">Heading</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Heading"
            name="list_heading"
            onInput={(e) => handleInputChange(e, 'list_heading')}
            value={inputFields.list_heading}
          />
        </div>
      </div>
      <div className="col-lg-12">
        <div className="row">
          {inputArray.map((title, index) => (
            <Fragment key={index}>
              <div className="col-lg-6 mb-2">
                <label className="mont-font fw-600 font-xsss">Points</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter Points"
                  required
                  onChange={(e) =>
                    handleInputArrayChange(e.target.value, 'list_points', index)
                  }
                  value={inputFields.list_points[index]}
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

export default Point;

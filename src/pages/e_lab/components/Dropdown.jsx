import React from 'react';
import Select from 'react-select';
import { customStyles } from "../constants/customStyles";

const Dropdown = ({ options, placeholder, selected, handleOptionClick }) => {
      // Convert the string options to an array of objects for react-select
  const selectOptions = options.map(option => ({
    label: option,
    value: option,
  }));
  // Create a value object for the currently selected option
  const selectedValue = selectOptions.find(option => option.value === selected);

  // Create an onChange handler that calls handleOptionClick with the new value
  const handleChange = (option) => {
    handleOptionClick(option.value);
  };



  return (
    <Select
      placeholder={placeholder}
      options={selectOptions}
      value={selectedValue}
      styles={customStyles}
      onChange={handleChange}
      className="z-40 text-label-2 mb-1"
      classNamePrefix="react-select" // You can add a prefix to all internal classes
    />
  );
};

export default Dropdown;

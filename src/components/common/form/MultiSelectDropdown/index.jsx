import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '50px',
    borderRadius: '4px',
    borderColor: '#eee',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#ff9500',
    },
    border: '2px #eee solid',
  }),
};

const MultiSelectDropdown = ({ options, isMulti, value, onChange, name }) => {
  const mappedOptions = options.map((option) => ({
    value: option.id, // Use 'id' as value
    label: option.name, // Use 'name' as label
  }));
  const handleChange = (selectedOption) => {
    // Pass selected option(s) and the name of the field back to the parent
    onChange(selectedOption, name);
  };
  return (
    <Select
      classNamePrefix="react-select"
      options={mappedOptions}
      isMulti={isMulti}
      styles={customStyles}
      onChange={handleChange}
      value={
        isMulti
          ? mappedOptions.filter((option) => value?.includes(option.value)) // For multi-select
          : mappedOptions.find((option) => option.value === value) // For single-select
      }
    />
  );
};

export default MultiSelectDropdown;

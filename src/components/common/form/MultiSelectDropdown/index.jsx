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
    border:'2px #eee solid'
  }),

};

const MultiSelectDropdown = ({ options }) => {
  return <Select classNamePrefix="react-select" options={options} isMulti={true} styles={customStyles} />;
};

export default MultiSelectDropdown;

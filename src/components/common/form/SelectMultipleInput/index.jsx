import PropTypes from 'prop-types';

const SelectMultipleInput = ({
  className = '',
  options = [],
  label = 'label',
  value = [],
  onChange,
  placeholder = 'Select an option',
  fallbackPlaceholder = '',
  required = false,
}) => {
  console.log("multipklevalues", value);
  const scalarValue = Array.isArray(value) ? value[0] || '' : value;
  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    onChange({ target: { value: selectedOptions } });
  };
  return (
    <select
      className={`form-control ${className}`}
      value={value}
      onChange={handleChange}
      required={required}
      multiple 
      disabled={options.length === 0}
    >
      {options.length === 0 ? (
        <option key="noData" disabled value="">
          {fallbackPlaceholder || 'No data found'}
        </option>
      ) : (
        <option key="placeholder" disabled value="">
          {placeholder || 'Select an option'}
        </option>
      )}

      {options.map(({ id, [label]: optionLabel }, index) => (
        <option key={`option-${index}`} value={id}>
          {optionLabel}
        </option>
      ))}
    </select>
  );
};

SelectMultipleInput.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.array,  // Ensure value is expected to be an array
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  fallbackPlaceholder: PropTypes.string,
  required: PropTypes.bool,
};


export default SelectMultipleInput;

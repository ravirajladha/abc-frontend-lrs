import PropTypes from 'prop-types';
//the valuekey parameter has been added, so that few places auth_id was used, but by default the selectinput supports the id attribute
const SelectInput = ({
  className = '',
  options = [],
  label = 'label',
  value = '',
  name = '',
  onChange,
  placeholder = 'Select an option',
  fallbackPlaceholder = '',
  required = false,
  valueKey="id",
}) => {
  const scalarValue = Array.isArray(value) ? value[0] || '' : value;
  return (
    <select
      className={`form-control ${className}`}
      name={name}
      value={scalarValue}
      onChange={onChange}
      required={required}
      multiple={Array.isArray(value) && value.length > 1}
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

{options.map((option, index) => (
        <option key={`option-${index}`} value={option[valueKey]}>
          {option[label]}
        </option>
      ))}
    </select>
  );
};

SelectInput.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  fallbackPlaceholder: PropTypes.string,
  required: PropTypes.bool,
};

export default SelectInput;

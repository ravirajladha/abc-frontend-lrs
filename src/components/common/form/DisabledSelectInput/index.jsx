import PropTypes from 'prop-types';

const DisabledSelectInput = ({
  className = '',
  options = [],
  label = 'label',
  value = '',
  onChange,
  placeholder = 'Select an option',
  fallbackPlaceholder = '',
  required = false,
  valueKey = 'id',
}) => {
  const scalarValue = Array.isArray(value) ? value[0] || '' : value;
  return (
    <select
      className={`form-control ${className}`}
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
        <option
          key={`option-${index}`}
          value={option[valueKey]}
          disabled={option.isDisabled}
        >
          {option[label]}
          {option.isDisabled ? ' (Test already assigned)' : ''}
        </option>
      ))}
    </select>
  );
};

DisabledSelectInput.propTypes = {
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
  valueKey: PropTypes.string,
};

export default DisabledSelectInput;

import PropTypes from 'prop-types';

const ContentSelectFilter = ({
  className = '',
  options = [],
  label = 'label',
  value = '',
  onChange,
  defaultText,
  placeholder = 'Select an option',
  fallbackPlaceholder = 'No data found',
  isRequired = false,
}) => {
  return (
    <select
      className={className}
      value={value || ''}
      onChange={onChange}
      required={isRequired}
      multiple={false}
      disabled={options.length === 0}
    >
      {defaultText && options.length !== 0 ? (
        <option key="default" value="" defaultValue>
          {defaultText}
        </option>
      ) : (
        <option key="placeholder" disabled value="">
          {options.length === 0 ? fallbackPlaceholder : placeholder}
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

ContentSelectFilter.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  defaultText: PropTypes.string,
  placeholder: PropTypes.string,
  fallbackPlaceholder: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default ContentSelectFilter;

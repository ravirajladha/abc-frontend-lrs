import PropTypes from 'prop-types';

function ContentFallback({
  message,
  alertDanger = false,
  alertWarning = false,
  alertSimple = false,
  hasMargin = false,
  hasSmallMargin = false,
}) {
  return (
    <div className="row">
      <div
        className={`text-center col-12 ${hasMargin ? 'my-5' : ''}  ${
          hasSmallMargin ? 'my-3' : ''
        }`}
      >
        <div
          className={`alert ${alertDanger ? 'alert-danger' : ''} ${
            alertWarning ? 'alert-warning' : ''
          } ${alertSimple ? 'text-grey-500' : ''}`}
          role="alert"
        >
          {message ?? ' There are no content available at the moment'}
        </div>
      </div>
    </div>
  );
}

ContentFallback.propTypes = {
  message: PropTypes.string,
  hasMargin: PropTypes.bool,
  hasSmallMargin: PropTypes.bool,
  alertDanger: PropTypes.bool,
  alertWarning: PropTypes.bool,
  alertSimple: PropTypes.bool,
};

export default ContentFallback;

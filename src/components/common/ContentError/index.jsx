import PropTypes from 'prop-types';

import ErrorImage from '@/assets/images/default/page-error.svg';

function ContentError({ message }) {
  return (
    <div className="text-center mt-5 col-12">
      <div className="alert" role="alert">
        <img
          src={ErrorImage}
          alt="Error"
          width={`100px`}
          className="error-icon my-4"
        />
        <h4 className="alert-heading fw-500">An error occurred!</h4>
        <p className="mb-0 mt-2">{message ?? 'Error occurred.'}</p>
      </div>
    </div>
  );
}

ContentError.propTypes = {
  message: PropTypes.string,
};

export default ContentError;

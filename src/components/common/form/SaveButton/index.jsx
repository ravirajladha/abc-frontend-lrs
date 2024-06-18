import PropTypes from 'prop-types';
import {Spinner} from 'react-bootstrap'; 

const SaveButton = ({ isSubmitting }) => {
  return (
    <div className="col-lg-12">
      <button
        type="submit"
        className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w100 rounded-lg d-inline-block ls-3"
        disabled={isSubmitting} 
      >
        {isSubmitting ? (
          <Spinner
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="mr-2"
          />
        ) : (
          <>
            <i className="feather-save mr-2"></i> Save
          </>
        )}
      </button>
    </div>
  );
};

SaveButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

export default SaveButton;

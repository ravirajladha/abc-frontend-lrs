import PropTypes from 'prop-types';

function ContentFormWrapper({ children, formTitle }) {
  return (
    <div className="row mb-2">
      <div className="col-lg-12">
        <div className="card border-0 px-2 py-2 rounded-lg shadow-xs">
          <div className="card-body d-block">
            <div className="font-xss text-grey-800 mb-4 mt-0 fw-700 text-capitalize">
              {formTitle}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
ContentFormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  formTitle: PropTypes.string,
};

export default ContentFormWrapper;

import PropTypes from 'prop-types';

function ContentCardWrapper({ children }) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card w-100 border-0 bg-white shadow-md p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

ContentCardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentCardWrapper;

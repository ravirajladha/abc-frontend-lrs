import { USER_TYPES } from '@/utils/constants';
import { getUserDataFromLocalStorage } from '@/utils/services';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ContentItemCard({ data, buttons, handleDelete, handleEdit }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const user = JSON.parse(getUserDataFromLocalStorage());
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mt-2">
      <div className="card mb-4 d-block w-100 h-100 shadow-md rounded-lg px-2 pt-5 border-0 text-center">
        {handleEdit && (
          <Link
            to={handleEdit(data)}
            className="position-absolute right-0 mr-5 top-0 mt-4 p-0"
          >
            <i className="feather-edit text-grey-500 font-xs"></i>
          </Link>
        )}
        {handleDelete && (
          <button
            onClick={() => handleDelete(data.id)}
            className="btn btn-icon border-2 ls-3 position-absolute right-0 p-0 mr-3 top-0 mt-4"
          >
            <i className="feather-trash text-danger font-xs"></i>
          </button>
        )}

        {data?.image && (
          <Link
            to=""
            className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto overflow-hidden"
          >
            {data.image && (
              <img
                src={baseUrl + data.image}
                alt="icon"
                className="p-1 w-100 object-fit-cover"
              />
            )}
          </Link>
        )}
        <h4 className="fw-700 font-xs my-2">{data.name}</h4>
        {data?.subject_type && data.subject_type == 3 && (
          <h4 className="fw-500 font-xss">{data.super_subject_name}</h4>
        )}
        {data?.class_name && (
          <h4 className="fw-500 font-xss">{data.class_name}</h4>
        )}
        <div className="clearfix"></div>
        {user && user.type === USER_TYPES.STUDENT && (
          //only for student- for now its dummy
          <>
            <div className="progress mt-3 h10">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuemin="0"
                style={{ width: `70%` }}
              ></div>
            </div>
            <div className="d-flex justify-content-between">
            <h4 className="fw-500 font-xssss mt-2">Start date: 16-07-2024</h4>
            <h4 className="fw-500 font-xssss mt-2">Validity: 45 days</h4>
            </div>
          </>
        )}

        {buttons && buttons.length > 0 && (
          <div className="mb-2">
            {buttons.map((button, index) => (
              <Link
                key={index}
                to={button.action(data)}
                className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 ${button.style}`}
              >
                {button.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ContentItemCard.propTypes = {
  data: PropTypes.object.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      style: PropTypes.string,
    })
  ),
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};

export default ContentItemCard;

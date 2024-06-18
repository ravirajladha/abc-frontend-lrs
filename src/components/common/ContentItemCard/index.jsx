import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ContentItemCard({
  data,
  buttons,
  handleDelete,
  handleEdit,
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

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
            to="/"
            className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto overflow-hidden"
          >
            {data.image && (
              <img
                src={baseUrl + data.image}
                alt="icon"
                className="p-1 w-100 object-fit-cover fixed-avatar"
              />
            )}
          </Link>
        )}
        <h4 className="fw-700 font-xs my-2">{data.name}</h4>
        <div className="clearfix"></div>

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

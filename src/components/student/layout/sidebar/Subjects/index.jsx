import { ContentLoader } from '@/components/common';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function Subjects({ subjects, loading }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="card theme-light-bg overflow-hidden rounded-xxl border-0 mb-3">
      <div className="card-body d-flex justify-content-between align-items-end pl-4 pr-4 pt-4 pb-3">
        <h4 className="fw-700 font-xss">My Courses</h4>
      </div>
      {loading ? (
        <div className="text-center col-12">
          <ContentLoader />
        </div>
      ) : subjects !== null && subjects.length > 0 ? (
        <>
          {subjects.map((value, index) => (
            <div
              className="card-body pl-4 pr-4 pt-0 pb-3 border-0 w-100 d-block"
              key={index}
            >
              <div className="row">
                <div className="col-3 p-0">
                  <div className="btn-round-lg rounded-lg bg-lightblue ml-3 img-fluid">
                    <img
                      src={baseUrl + value.image}
                      alt="icon"
                      className="p-1 w-100 font-xsssss "
                    />
                  </div>
                </div>
                <div className="col-9 d-flex align-items-center  pr-3">
                  <h4 className="font-xss d-block fw-700 mt-2">
                    {value.name}
                    {/* <span className="float-right mt-1 mb-2 font-xssss text-grey-500">
                  {value.per}%
                </span> */}
                    <Link
                      to={`/student/courses/${value.id}/learn`}
                      className="position-absolute right-0 mr-3"
                    >
                      <i className="ti-arrow-circle-right text-grey-500 font-xs"></i>
                    </Link>
                  </h4>
                  {/* <div className="progress mt-2 h5 w-100">
                <div
                  className={`progress-bar ${value.status}`}
                  role="progressbar"
                  style={{ width: `${value.per}%` }}
                ></div>
              </div> */}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center mt-5 col-12">
          <div className="alert" role="alert">
            There are no courses available at the moment.
          </div>
        </div>
      )}
    </div>
  );
}

Subjects.propTypes = {
  subjects: PropTypes.array.isRequired,
};

export default Subjects;

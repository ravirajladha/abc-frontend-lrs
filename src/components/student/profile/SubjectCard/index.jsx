import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SubjectCard({ subjects }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      <div className="card-header p-4 w-100 border-0 d-flex rounded-lg  bg-current">
        <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
          My Courses
        </h4>
      </div>
      {subjects && subjects.length > 0 ? (
        <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
          <div className="row">
            {subjects?.map((subject) => (
              <Link
                to={'/student/subjects/' + subject.id + '/learn'}
                key={subject.id}
                className="col-3 border-0"
              >
                <div className="card p-2 w-100 h-100 rounded-lg border-0 text-center d-flex justify-content-center align-items-center">
                  <div className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto img-fluid h100 w100">
                    <img
                      src={baseUrl + subject.image}
                      alt="icon"
                      className="p-1 p-1 w-100 h100 w100 object-fit-cover font-xsssss "
                    />
                  </div>
                  <h4 className="fw-700 font-xs mt-3 lh-32 text-capitalize">
                    {subject.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
       ) : (
        <div className="text-center p-4">
          <h4 className="fw-700 font-xs">No courses available</h4>
        </div>
      )}
    </div>
  );
}

SubjectCard.propTypes = {
  subjects: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SubjectCard;

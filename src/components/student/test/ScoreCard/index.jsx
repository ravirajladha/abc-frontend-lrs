import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Spinner } from 'react-bootstrap';

function ScoreCard({ result, submitting, is_job }) {
  return (
    <div className="row">
      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
        <div className="card mb-4 h500 d-block w-100 shadow-xss rounded-lg p-5 border-0 text-left question-div">
          <div
            className="card-body text-center p-3 bg-no-repeat bg-image-topcenter"
            id="question4"
          >
            <p className="font-xss fw-600 lh-30 text-grey-500 mb-0 p-2 py-4">
              Your test is completed.
            </p>
            <img
              src="/assets/images/star.png"
              width="100"
              alt="icon"
              className="d-inline-block"
            />
            {submitting ? (
              <div className="mt-5 pt-5">
                <Spinner
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                  className="mr-2 text-current border-1 mb-1"
                />
                <p className="font-xsss fw-600 lh-30 text-grey-500 mb-0 py-4">
                  Please stay tight, your score is loading.
                </p>
              </div>
            ) : (
              <>
                <h3 className="fw-700 mt-5 text-grey-900 font-xxl">
                  Your score: <span>{result?.score}</span>
                </h3>
                <Link
                  to={is_job ? "/student/jobs" : "/student/courses"}
                  className="py-2 px-3 text-uppercase mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xssss ls-3 bg-current"
                >
                  Go To {is_job ? "Jobs" : "Courses"}
                </Link>{' '}
                {' '}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ScoreCard.propTypes = {
  submitting: PropTypes.bool,
  result: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default ScoreCard;

import PropTypes from 'prop-types';
import { formatDateTime } from '@/utils/helpers';

function CourseScore({ results }) {
  console.log(results);
  return (
    <div className="card d-block border-0 rounded-lg overflow-auto p-4 shadow-xss mt-4 h300 scroll-bar">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">Assessment Scores</h2>
      <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2"></p>
      <div className="theme-dark-bg rounded-sm p-1 mt-3 mb-4">
        {results && results.length > 0 ? (
          <>
            {results.map((result, index) => (
              <div key={index} className="row mt-1 py-1 border-bottom">
                <div className="col-2 pr-1 mt-0 my-auto">
                  <img
                    src="/assets/images/star.png"
                    alt="star"
                    className="w10 float-left"
                  />
                  <h4 className="font-xsss fw-600 text-grey-600 ml-1 float-left d-inline">
                    {Math.floor(result?.score) + '/' + result?.total_score}
                  </h4>
                </div>
                <div className="col-3 pl-0 pr-2">
                  <p className='font-xssss text-grey-800 fw-600'>
                    {result?.is_passed == 0 ? 'Failed' : 'Passed'}
                  </p>
                  <div className="bar-container">
                    <div
                      className={`bar-percentage ${result?.is_passed == 0 ? 'bg-danger' : 'bg-success'}`}
                      style={{ width: `${Math.round(result?.percentage)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="col-2 pl-0 my-auto">
                  <h4 className="font-xssss fw-600 text-grey-800">
                    {Math.round(result?.percentage)+ '%'}
                  </h4>
                </div>
                <div className="col-5 pl-0 my-auto">
                  <h4 className="font-xssss fw-600 text-grey-800">
                    {formatDateTime(result?.created_at)}
                  </h4>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

CourseScore.propTypes = {
  results: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default CourseScore;

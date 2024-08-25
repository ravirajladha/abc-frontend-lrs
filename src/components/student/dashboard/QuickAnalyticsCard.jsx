import PropTypes from 'prop-types';
import React from 'react';

import { formatDateTime, formatNumber } from '@/utils/helpers';

function QuickAnalyticsCard({
  last_login_at,
  total_watch_time,
  avg_assessment_score,
  test_results,
  test_total_marks,

}) {
  return (
    <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
      <div className="card-body px-4">
        <div className="row">
          <div className="col-3">
            <h2 className="text-grey-900 fw-600 font-xs mt-2 mb-2 pb-1 ls-3 lh-1">
              {formatDateTime(last_login_at)
                ? formatDateTime(last_login_at)
                : 'Unavailable'}
            </h2>
            <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
              Last Login At
            </h4>
          </div>
          <div className="col-3">
            <h2 className="text-grey-900 fw-600 font-xs mt-2 mb-2 pb-1 ls-3 lh-1">
              {total_watch_time ? total_watch_time : '0'}
            </h2>
            <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
              Total Watch Time
            </h4>
          </div>
          <div className="col-3">
            <h2 className="text-grey-900 fw-600 font-xs mt-2 mb-2 pb-1 ls-3 lh-1">
              {avg_assessment_score
                ? formatNumber(avg_assessment_score)
                : '0'}
            </h2>
            <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
              Average Assessment Score
            </h4>
          </div>
          <div className="col-3">
            <h2 className="text-grey-900 fw-600 font-xs mt-2 mb-2 pb-1 ls-3 lh-1">
              {test_results ? test_results + '/' + test_total_marks+'.00' : '0'}
            </h2>
            <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
              TOTAL COURSE TEST SCORE
            </h4>
          </div>
        </div>
        {/* <div className="row my-4">
          <div className="col-4">
            <h2 className="text-grey-900 fw-600 font-xs mt-4 mb-2 pb-1 ls-3 lh-1">
              {second_term_results
                ? second_term_results + '/' + second_term_total_marks
                : '0'}
            </h2>
            <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
              Term 2 Score
            </h4>
          </div>
          <div className="col-4">
            <h2 className="text-grey-900 fw-600 font-xs mt-4 mb-2 pb-1 ls-3 lh-1">
              {third_term_results
                ? third_term_results + '/' + third_term_total_marks
                : '0'}
            </h2>
            <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
              Term 3 Score
            </h4>
          </div>
        </div> */}
      </div>
    </div>
  );
}

QuickAnalyticsCard.propTypes = {
  last_login_at: PropTypes.string,
  total_watch_time: PropTypes.string,
  avg_assessment_score: PropTypes.string,
  test_results: PropTypes.string,
  test_total_marks: PropTypes.string,

};

export default QuickAnalyticsCard;

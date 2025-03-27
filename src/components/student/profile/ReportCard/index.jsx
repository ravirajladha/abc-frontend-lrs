import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import DefaultProfileImage from '@/assets/images/default/student.png';
import { formatNumber } from '@/utils/helpers';
import { ContentLoader } from '@/components/common';

function ReportCard({ studentData, reportData, loading }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const d = new Date();
  let year = d.getFullYear();


  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      {loading ? (
        <div className="card-body p-lg-5 p-4 w-100 border-0">
          <div className="row">
            <ContentLoader />
          </div>
        </div>
      ) : (
        <>
          {studentData && (
            <div className="card-body p-lg-5 p-4 w-100 border-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-4 border-0 text-center">
                      <a
                        href=""
                        className="ml-auto mr-auto rounded-lg overflow-hidden d-inline-block"
                      >
                        <img
                          src={
                            studentData['profile_image']
                              ? baseUrl + studentData['profile_image']
                              : DefaultProfileImage
                          }
                          alt="avatar"
                          className="p-0 w100 shadow-xss"
                        />
                      </a>
                      <h4 className="fw-700 font-xs mt-3 mb-1">
                        {studentData['student_name']}
                      </h4>

                      <div className="clearfix"></div>

                      <ul className="list-inline border-0 mt-4">
                        {/* <li className="list-inline-item text-center mr-4">
                          <h4 className="fw-700 font-md">
                            {studentData['class_name']}
                            <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                              Class
                            </span>
                          </h4>
                        </li>
                        <li className="list-inline-item text-center mr-4">
                          <h4 className="fw-700 font-md">
                            {studentData['section_name']}
                            <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                              Section
                            </span>
                          </h4>
                        </li> */}
                        <li className="list-inline-item text-center">
                          <h4 className="fw-700 font-md">
                            {year}
                            <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                              Year
                            </span>
                          </h4>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="clearfix"></div>

                  <p
                    to="#"
                    className="rounded-xxl border-dashed my-2 p-3 w-100 fw-600 fw-700 text-center font-xssss mont-font text-uppercase ls-3 text-grey-900 d-block user-select-none text-dark"
                  >
                    COURSE WISE SCORE
                  </p>

                  <div className="row mb-3">
                    {reportData?.subject_results &&
                      Object.keys(reportData.subject_results).map(
                        (className, index) => (
                          <div key={index} className="col-12 mb-4">
                            <h3 className="text-dark font-xxl fw-700 mont-font mb-3">
                              {className}
                            </h3>
                            <div className="row">
                              {Object.keys(
                                reportData.subject_results[className]
                              ).map((subject, subIndex) => (
                                <div
                                  className="col-lg-4 col-md-4"
                                  key={subIndex}
                                >
                                  <div className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center gap-2 h-200 mt-4">
                                    <span className="mb-2 alert-success">
                                      {subject}
                                    </span>
                                    <span className="font-xsss fw-bold">
                                      Score:{' '}
                                      {reportData.subject_results[className][
                                        subject
                                      ] !== undefined
                                        ? reportData.subject_results[className][
                                            subject
                                          ]
                                        : 'N/A'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="card border-0 mb-4 shadow-none w-100 h50 bg-dark rounded-xxl text-center text-left shadow-md pl-3 pt-2  d-flex align-items-center justify-content-center">
                        <div className="card-body d-block text-center text-left p-0">
                          <h4 className="text-white my-2 mr-3 pb-1 font-sm fw-700 mont-font">
                            Total Score
                            <span className="d-block fw-500 text-grey-300 font-xss mt-1">
                              {reportData?.total_marks &&
                                formatNumber(reportData?.total_marks['total']) +
                                  '/' +
                                  formatNumber(
                                    reportData?.base_total_marks['total']
                                  )}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-7">
                  <div className="rounded-xxl bg-greylight h-100 p-3">
                    <table className="table rounded-10 table-admin mb-0">
                      <thead className="bg-greylight ovh">
                        <tr>
                          <th className="border-0" scope="col">
                            Course
                          </th>

                          <th className="border-0 text-center" scope="col">
                            Term 1
                          </th>
                          <th className="border-0 text-center" scope="col">
                            Term 2
                          </th>
                          <th className="border-0 text-center" scope="col">
                            Term 3
                          </th>

                          <th scope="col" className="text-center border-0">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData?.subject_results &&
                          Object.entries(reportData.subject_results).map(
                            ([subject, subjectData]) => (
                              <tr key={subject}>
                                <td>{subject}</td>
                                {[1, 2, 3].map((termIndex) => {
                                  const termMark = subjectData.term_marks.find(
                                    (mark) => mark.term_type === termIndex
                                  );
                                  const termScore = termMark
                                    ? parseFloat(termMark.score) || 0
                                    : 0;

                                  // Add the term score to the corresponding total
                                  termTotals[termIndex - 1] += termScore;

                                  return (
                                    <td key={termIndex} className="text-center">
                                      {termMark
                                        ? termScore !== 0
                                          ? termScore
                                          : 0
                                        : '-'}
                                    </td>
                                  );
                                })}
                                <td className="text-center">
                                  {formatNumber(subjectData.total_score)}
                                </td>
                              </tr>
                            )
                          )}
                        <tr>
                          <th>Total</th>
                          <th className="text-center">{termTotals[0]}</th>
                          <th className="text-center">{termTotals[1]}</th>
                          <th className="text-center">{termTotals[2]}</th>
                          <th className="text-center">
                            {reportData?.total_marks &&
                              reportData?.total_marks['total']}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <div className="col-lg-12 mt-5">
                      <div className="row"></div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="row mt-2">
                <div className="col-lg-12">
                  <div className="rounded-xxl bg-greylight h-100 p-3">
                    <table className="table rounded-10 table-admin mb-0">
                      <thead className="bg-greylight ovh">
                        <tr>
                          <th
                            colSpan={2}
                            className="border-0 text-center"
                            scope="col"
                          >
                            Assessment Score
                          </th>
                          {/* <th className="border-0 text-center" scope="col">Average Score</th> */}
                        </tr>
                        <tr>
                          <th className="border-0" scope="col">
                            Course
                          </th>
                          <th className="border-0 text-center" scope="col">
                            Average Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData && reportData.assessment_results ? (
                          Object.keys(reportData.assessment_results).map(
                            (className, index) => {
                              const subjects =
                                reportData.assessment_results[className];
                              return (
                                <React.Fragment key={index}>
                                  <tr>
                                    <th
                                      colSpan="2"
                                      className="text-left font-weight-bold"
                                    >
                                      {className} {'Subject'}
                                    </th>
                                  </tr>
                                  {Object.keys(subjects).map(
                                    (subjectName, subIndex) => {
                                      const score = subjects[subjectName];
                                      return (
                                        <tr key={subIndex}>
                                          <td className="">{subjectName}</td>
                                          <td className="text-center">
                                            {score !== null &&
                                            score !== undefined
                                              ? formatNumber(score)
                                              : 'N/A'}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </React.Fragment>
                              );
                            }
                          )
                        ) : (
                          <tr>
                            <td className="text-center" colSpan="2">
                              No assessment results available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="col-lg-12 mt-5">
                      <div className="row"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

ReportCard.propTypes = {
  studentData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  reportData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
};

export default ReportCard;

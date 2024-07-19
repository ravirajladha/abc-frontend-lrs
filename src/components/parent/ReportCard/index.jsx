import PropTypes from 'prop-types';

import { Link, useNavigate } from 'react-router-dom';

import DefaultProfileImage from '@/assets/images/default/student.png';

import { formatNumber } from '@/utils/helpers';

function StudentReportCard({ studentData, reportData }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const termTotals = [0, 0, 0];

  const d = new Date();
  let year = d.getFullYear();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg justify-content-between">
        <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
          PERFORMANCE
        </h4>
        <div className="">
          {/* <button className="btn btn-light text-white d-inline-block rounded-xl bg-current font-xssss uppercase fw-700 ls-lg border-2 mr-2">
            Download
          </button> */}
          <button
            className="btn btn-light text-white d-inline-block rounded-xl bg-current font-xssss uppercase fw-700 ls-lg border-2 "
            onClick={goBack}
          >
            <i className="feather-arrow-left font-xssss mr-1 "></i>
            Back
          </button>
        </div>
      </div>
      {studentData && (
        <div className="card-body p-lg-5 p-4 w-100 border-0">
          <div className="row">
            <div className="col-lg-5">
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
                    <li className="list-inline-item text-center mr-4">
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
                    </li>
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

              <div className="card border-0 shadow-none mb-4">
                <div className="card-bod6 d-block text-left 2 fw-600-0">
                  <div className="item w-100 h50 bg-gold-gradiant rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-3 align-items-end d-flex">
                    <h4 className="text-white font-sm fw-700 mont-font mb-3 ">
                      <span className="d-block fw-500 text-white font-xssss mt-1">
                        Class Rank
                      </span>
                      {reportData?.class_rank && reportData?.class_rank}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="card border-0 mb-4 shadow-none">
                <div className="card-body d-block text-left p-0">
                  <div className="item w-100 h50 bg-primary rounded-xxl text-left shadow-md pl-3 pt-3 align-items-end d-flex">
                    <h4 className="text-white mb-3 font-sm fw-700 mont-font">
                      <span className="d-block fw-500 text-grey-300 font-xssss mt-1">
                        Section Rank
                      </span>
                      {reportData?.section_rank && reportData?.section_rank}
                    </h4>
                  </div>
                </div>
              </div>

              <p
                to="#"
                className="rounded-xxl border-dashed my-2 p-3 w-100 fw-600 fw-700 text-center font-xssss mont-font text-uppercase ls-3 text-grey-900 d-block user-select-none text-dark"
              >
                TERM WISE SCORE
              </p>

              <div className="row mb-3">
                <div className="col-lg-4 col-md-4">
                  <div className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center gap-2 h-100">
                    <span className="btn-round-xxxl mb-2 alert-success">
                      Term 1
                    </span>
                    <span className="font-xsss fw-bold">
                      Score:{' '}
                      {reportData?.total_marks &&
                      reportData?.total_marks['first_term']
                        ? formatNumber(reportData?.total_marks['first_term']) +
                          '/' +
                          formatNumber(
                            reportData?.base_total_marks[
                              'first_term_total_marks'
                            ]
                          )
                        : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4">
                  <div className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center gap-2 h-100">
                    <span className="btn-round-xxxl mb-2 alert-success">
                      Term 2
                    </span>
                    <span className="font-xsss fw-bold d-block">
                      Score:{' '}
                      {reportData?.total_marks &&
                      reportData?.total_marks['second_term']
                        ? formatNumber(reportData?.total_marks['second_term']) +
                          '/' +
                          formatNumber(
                            reportData?.base_total_marks[
                              'second_term_total_marks'
                            ]
                          )
                        : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4">
                  <div className="card shadow-xss border-0 p-4 rounded-lg d-flex justify-content-center align-items-center gap-2 h-100">
                    <span className="btn-round-xxxl mb-2 alert-success">
                      Term 3
                    </span>
                    <span className="font-xsss fw-bold">
                      Score:{' '}
                      {reportData?.total_marks &&
                      reportData?.total_marks['third_term']
                        ? formatNumber(reportData?.total_marks['third_term']) +
                          '/' +
                          formatNumber(
                            reportData?.base_total_marks[
                              'third_term_total_marks'
                            ]
                          )
                        : 'N/A'}
                    </span>
                  </div>
                </div>
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

            <div className="col-lg-7">
              <div className="rounded-xxl bg-greylight h-100 p-3">
                <table className="table rounded-10 table-admin mb-0">
                  <thead className="bg-greylight ovh">
                    <tr>
                      <th className="border-0" scope="col">
                        Subject
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
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-12">
              <div className="rounded-xxl bg-greylight h-100 p-3">
                <table className="table rounded-10 table-admin mb-0">
                  <thead className="bg-greylight ovh">
                    <tr>
                      <th className="border-0" scope="col">
                        Subject
                      </th>
                      <th className="border-0 text-center" scope="col">
                        Average Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData &&
                    reportData.assessment_results &&
                    reportData.assessment_results.length > 0 ? (
                      reportData.assessment_results.map((result, index) => (
                        <tr key={index}>
                          <th className="">{result.subject_name}</th>
                          <th className="text-center">
                            {formatNumber(result.avg_score)}
                          </th>{' '}
                        </tr>
                      ))
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
    </div>
  );
}

StudentReportCard.propTypes = {
  studentData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  reportData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default StudentReportCard;

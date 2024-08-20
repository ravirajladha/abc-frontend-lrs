import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';

import { fetchAssessmentDetails } from '@/api/admin';

function Show() {
  const [loading, setLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState(null);
  const { assessmentId } = useParams();
  useEffect(() => {
    fetchAssessmentDetails(assessmentId).then((data) => {
      setAssessmentData(data.assessment);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <ContentHeader title="Assessment Details" />
      {loading && <ContentLoader />}
      {assessmentData && (
        <>
          <div className="row">
            <div className="col-12 pe-0">
              <div className="card w-100 shadow-sm rounded-10 overflow-hidden border-0 mb-3 mt-0 p-4">
                <div className="card-body d-block pt-4 text-center">
                  {assessmentData.imageSrc && (
                    <figure className="avatar position-relative w-110 z-index-1 w100 z-index-1 mr-auto ml-auto overflow-hidden">
                      <img
                        src={assessmentData.imageSrc}
                        className="p-3 bg-greylight rounded-lg w-100"
                        alt=""
                      />
                    </figure>
                  )}
                  <h4 className="font-xs ls-1 fw-700 text-grey-900">
                    {assessmentData.title}
                  </h4>
                  <h4 className="font-xss my-2 ls-1 fw-500 text-grey-600">
                    Time Limit {assessmentData?.time_limit}s
                  </h4>
                  <h4 className="font-xss my-2 ls-1 fw-500 text-grey-600">
                    Passing Percentage {assessmentData?.passing_percentage}%
                  </h4>
                  <div className="d-flex align-items-center justify-content-center  w-100">
                    <span className="badge badge-pill badge-secondary mr-2 px-3 py-2 text-white font-xssss fw-500 mt-1 lh-3">
                      {assessmentData?.subject}
                    </span>
                    <span className="badge badge-pill badge-info px-3 py-2 text-white mr-2 font-xssss fw-500 mt-1 lh-3">
                      {assessmentData?.course}
                    </span>
                    <span className="badge badge-pill badge-danger px-4 py-2 text-white font-xssss fw-600 mt-1 lh-3">
                      {assessmentData.no_of_questions} Questions
                    </span>
                  </div>
                  <p className="font-xsss my-2 ls-1 fw-500 text-grey-600">
                    Description: {assessmentData?.description}
                  </p>
                </div>
              </div>
            </div>
            {assessmentData.marks && (
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                <div className="card shadow-sm border-0 p-3 mt-0 rounded-10">
                  <div className="card-body d-flex">
                    <h4 className="font-xsss text-grey-800 mb-1 mt-0 fw-700">
                      Marks: {assessmentData.marks}
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          {assessmentData?.questions && (
            <div className="row mt-3">
              {assessmentData?.questions?.map((question, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card border-0 mt-0 rounded-10 shadow-sm">
                    <div className="card-body p-4 pb-0 border-0">
                      <div>
                        <h4 className="fw-700 font-xss mt-4">{`Q ${
                          index + 1
                        }. ${question.text} `}</h4>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_one'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          1. {question.option_one}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_two'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          2. {question.option_two}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_three'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                         3. {question.option_three}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_four'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          4. {question.option_four}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Show;

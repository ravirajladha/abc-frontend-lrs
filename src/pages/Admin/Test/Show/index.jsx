import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';

import { fetchTestDetails } from '@/api/admin';

function Show() {
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState(null);

  const { testId } = useParams();
  useEffect(() => {
    fetchTestDetails(testId).then((data) => {
      setTestData(data.test);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <ContentHeader title={`Test Details`} />
      {loading && <ContentLoader />}
      {testData && (
        <>
          <div className="row">
            <div className="col-12 pe-0">
              <div className="card w-100 shadow-md rounded-10 border-0 mb-3 mt-0 p-4">
                <div className="card-body pt-4 text-center">
                  {testData.image && (
                    <figure className="avatar position-relative w-110 z-index-1 w100 z-index-1 mr-auto ml-auto overflow-hidden">
                      <img
                        src={testData.image}
                        className="p-3 bg-greylight rounded-lg w-100"
                        alt=""
                      />
                    </figure>
                  )}
                  <h4 className="font-xs ls-1 fw-700 text-grey-900">
                    {testData.title}
                  </h4>
                  <div className="d-flex align-items-center justify-content-center flex-wrap w-100">
                    <span className="badge badge-pill badge-secondary mr-2 px-3 py-2 text-white font-xssss fw-500 mt-1 lh-3">
                      {testData?.subject}
                    </span>
                    <span className="badge badge-pill badge-warning mr-2 px-3 py-2 text-white font-xssss fw-500 mt-1 lh-3">
                      {testData?.course}
                    </span>
               
                  </div>
                </div>
              </div>
            </div>
            {testData.marks && (
              <div className="col-xl-8 col-xxl-9 col-md-8">
                <div className="card shadow-md border-0 p-3 mt-0 rounded-10">
                  <div className="position-absolute right-0 mr-5 top-0 mt-4 p-0">
                    <i className="feather-menu text-grey-500 font-xs"></i>
                  </div>
                  <div className="card-body d-flex">
                    <h4 className="font-xsss text-grey-800 mb-1 mt-0 fw-700">
                      Marks: {testData.marks}
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          {testData?.questions && (
            <div className="row">
              {testData?.questions?.map((question, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card border-0 mt-3 rounded-10 shadow-sm">
                    <div className="card-body p-4 pb-0 border-0">
                      <div>
                        <h4 className="fw-700 font-xss mt-3">{`Q ${
                          index + 1
                        }. ${question.question} `}</h4>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_one'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          1: <span className={``}></span> {question.option_one}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_two'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          2: {question.option_two}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_three'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          3: {question.option_three}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            question.answer_key === 'option_four'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          4: {question.option_four}
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

import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import { getJobTestResultOfStudent } from '@/api/common';
import { getStudentDataFromLocalStorage } from '@/utils/services';

import ResponseItemCard from '@/components/common/results/ResponseItemCard';

function JobResult() {
  const navigate = useNavigate();
  const { applicationsId } = useParams();
console.log("application", applicationsId)
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getClassDetails = useCallback(async () => {
    try {
      const res = await getJobTestResultOfStudent(applicationsId);
      console.log("res:", res);
      setResultData(res.term_test_results);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [applicationsId]);

  useEffect(() => {
    getClassDetails();
  }, [getClassDetails]);

  return (
    <div>
      <ContentHeader title="Job" subtitle="Results" />
      {loading ? (
        <ContentLoader />
      ) : (
        <ContentCardWrapper>
          <div className="row">
            <div className="float-left font-xssss fw-700 text-grey-500 text-uppercase ls-3 mt-2 pt-1"></div>
          </div>
          {resultData && resultData.length > 0 ? (
            resultData.map((result) => (
              <div className="row w-100" key={result.result_id}>
                <div className="col-12 my-2 text-center">
                  <h3 className="fw-600 font-xl d-block lh-4 mb-2">
                    {result.test_title}
                  </h3>
                  <h2 className="fw-700 font-md d-block lh-4 mb-1">
                    Score: {result.result_score}/{result.test_total_score}
                  </h2>
                  <p>Percentage: {result.result_percentage}%</p>
                </div>
                {/* Ensure that 'result.response' is an array */}
                {result.response && result.response.map((question) => (
                  <div
                    className="col-lg-12 col-md-12"
                    key={question.question_id}
                  >
                    <ResponseItemCard response={question} />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center mt-5 col-12">
              <div className="alert" role="alert">
                There are no results available at the moment.
              </div>
            </div>
          )}
        </ContentCardWrapper>
      )}
    </div>
  );
}

export default JobResult;

import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import { fetchStudentResultsByCourse } from '@/api/student';
import { getStudentDataFromLocalStorage } from '@/utils/services';

import ResponseItemCard from '@/components/common/results/ResponseItemCard';

function Results({ isAdmin, isStudent }) {
  console.log(isAdmin, "isAdmin");
  const navigate = useNavigate();
  const { courseId, studentId: paramStudentId } = useParams();
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const localStudentId = isAdmin ? paramStudentId : studentData.student_auth_id;
  
  const studentId = isAdmin ? paramStudentId : localStudentId;

  console.log(courseId, studentId, "course and student id");

  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourseDetails = useCallback(async () => {
    try {
      const res = await fetchStudentResultsByCourse(studentId, courseId);
      console.log("result inside result page1", res.test_results);
      setResultData(res.test_results);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [studentId, courseId]);

  useEffect(() => {
    getCourseDetails();
  }, [getCourseDetails]);

  return (
    <div>
      <ContentHeader title="Test" subtitle="Results" />
      {loading ? (
        <ContentLoader />
      ) : (
        <ContentCardWrapper>
          <div className="row">
            <div className="float-left font-xssss fw-700 text-grey-500 text-uppercase ls-3 mt-2 pt-1"></div>
          </div>
          {resultData &&
            (resultData.length > 0 ? (
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
                  {result.response.map((question) => (
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
            ))}
        </ContentCardWrapper>
      )}
    </div>
  );
}

export default Results;

import { useState, useEffect, useCallback } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';

import { fetchSubjectsWithResults, startTest } from '@/api/student';

import { ContentFallback, ContentError } from '@/components/common';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import Star from '/assets/images/star.png';
import StarDisabled from '/assets/images/star-disable.png';

function Subjects() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const studentData = useOutletContext();
  const navigate = useNavigate();
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  const studentId = studentData.student_id;
  const classId = studentData.class_id;
  const schoolId = studentData.school_id;
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubjectsCallback = useCallback(() => {
    return fetchSubjectsWithResults(classId, studentId)
      .then((data) => {
        console.log('Fetching', data);
        setSubjects(data.subjects);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [classId]);

  useEffect(() => {
    fetchSubjectsCallback();
  }, []);

  return (
    <div>
      <ContentHeader title="All" subtitle="Courses" />
      <div className="row">
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : error ? (
          <ContentError message={error.message} />
        ) : subjects && subjects.length > 0 ? (
          subjects?.map((subject, index) => (
            <div className="col-lg-3">
              <div
                className="card course-card p-0 shadow-md border-0 rounded-lg overflow-hidden mr-3 mb-4 h-100"
                key={index}
              >
                <div
                  className="card-image w-100 mb-3"
                  style={{ height: '200px' }}
                >
                  <Link
                    to={subject.id + '/course-preview'}
                    className="video-bttn position-relative d-block h-100"
                  >
                    <img
                      src={baseUrl + subject.image}
                      alt="course"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </div>
                <div className="card-body py-0">
                  <div className="d-flex justify-content-between">
                    <span
                      className={`font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 d-inline-block mr-1 alert-warning text-warning`}
                    >
                      {subject.class_name}
                    </span>
                    <div>
                      <div className="star d-flex w-100 text-left">
                        <img src={Star} alt="star" className="w10" />
                        <img src={Star} alt="star" className="w10" />
                        <img src={Star} alt="star" className="w10" />
                        <img src={Star} alt="star" className="w10" />
                        <img src={StarDisabled} alt="star" className="w10" />
                      </div>
                      <h4 className="font-xsssss text-grey-600 fw-600 mt-1">
                        433 rating
                      </h4>
                    </div>
                  </div>
                  <h4 className="fw-700 font-xss mt-2 lh-26 mt-0">
                    <Link
                      to={subject.id + '/course-preview'}
                      className="text-dark text-grey-900"
                    >
                      {subject.name}
                    </Link>
                  </h4>
                  <span className="font-xssss fw-500 text-grey-900 d-inline-block ml-0 text-dark">
                    Teacher
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <ContentFallback message="  There are no subjects available at the moment." />
        )}
      </div>
    </div>
  );
}

export default Subjects;

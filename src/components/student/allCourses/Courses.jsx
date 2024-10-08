import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContentLoader } from '@/components/common';
import { fetchSubjectsWithResults, startTest } from '@/api/student';
import { ContentFallback, ContentError } from '@/components/common';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';

function AllCourses() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  const studentId = studentData.student_id;
  const subjectId = studentData.subject_id;
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoursesCallback = useCallback(() => {
    return fetchSubjectsWithResults()
      .then((data) => {
        console.log('courses', data.courses);
        setCourses(data.courses);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCoursesCallback();
  }, [fetchCoursesCallback]);

  return (
    <div>
      <div className="row my-3 ">
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : error ? (
          <ContentError message={error.message} />
        ) : courses && courses.length > 0 ? (
          courses?.map((course, index) => (
            <div className="col-lg-3" key={index}>
              <div className="card course-card p-0 shadow-md border-0 rounded-lg overflow-hidden mr-3 mb-4 h-100">
                <div
                  className="card-image w-100 mb-3"
                  style={{ height: '200px' }}
                >
                  <Link
                    to={course.id + '/course-preview'}
                    className="video-bttn position-relative d-block h-100"
                  >
                    <img
                      src={baseUrl + course.image}
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
                      {course.subject_name}
                    </span>
                    <div>
                      <StarRatings
                        rating={Number(course?.average_rating || 0)}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="1px"
                      />
                      <h4 className="font-xsssss text-grey-600 fw-600 mt-1">
                      Based on {course.total_ratings} ratings
                      </h4>
                    </div>
                  </div>
                  <h4 className="fw-700 font-xss mt-2 lh-26 mt-0">
                    <Link
                      to={course.id + '/course-preview'}
                      className="text-dark text-grey-900"
                    >
                      {course.name}
                    </Link>
                  </h4>
                  <span className="font-xssss fw-500 text-grey-900 d-inline-block ml-0 text-dark">
                    {course.trainer_name}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <ContentFallback message="  There are no courses available at the moment." />
        )}
      </div>
    </div>
  );
}

export default AllCourses;

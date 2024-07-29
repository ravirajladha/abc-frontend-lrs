import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchMyCourses } from '@/api/student';
import { ContentItemCard, ContentLoader } from '@/components/common';
import { Link } from 'react-router-dom';
import Star from '/assets/images/star.png';
import StarDisabled from '/assets/images/star-disable.png';
import { PiCertificateBold } from 'react-icons/pi';
import { MdOutlineAssessment } from 'react-icons/md';

function CoursesCard() {
  const [subjectsData, setSubjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchSubjectsCallback = useCallback(async () => {
    try {
      const data = await fetchMyCourses();
      setSubjectsData(data.subjects);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjectsCallback();
  }, [fetchSubjectsCallback]);

  const handleToggleView = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <>
      <h4 className="font-xs text-grey-800 my-3 lh-22 fw-700">My Courses</h4>
      <div className="row">
        {loading ? (
          <div className="text-center col-12">
            <ContentLoader />
          </div>
        ) : subjectsData !== null && subjectsData.length > 0 ? (
          <>
            {subjectsData
              .slice(0, showAll ? subjectsData.length : 4)
              .map((subject, index) => (
                // <ContentItemCard
                //   key={index}
                //   data={subject}
                //   buttons={[
                //     {
                //       label: 'Learn',
                //       action: () => `/student/courses/${subject.id}/learn`,
                //       style: 'bg-primary-gradiant',
                //     },
                //     {
                //       label: 'Finish the course to download',
                //       action: () => ``,
                //       style: 'bg-primary-gradiant ml-2',
                //     },
                //   ]}
                // />
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
                        to={`/student/courses/${subject.id}/learn`}
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
                            <img
                              src={StarDisabled}
                              alt="star"
                              className="w10"
                            />
                          </div>
                          <h4 className="font-xsssss text-grey-600 fw-600 mt-1">
                            433 rating
                          </h4>
                        </div>
                      </div>
                      <h4 className="fw-700 font-xss mt-2 lh-26 mt-0">
                        <Link
                          to={`/student/courses/${subject.id}/learn`}
                          className="text-dark text-grey-900"
                        >
                          {subject.name}
                        </Link>
                      </h4>
                      <span className="font-xssss fw-500 text-grey-900 d-inline-block ml-0 text-dark">
                        Teacher
                      </span>
                      <hr />
                      <div className="progress mt-3 h10">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuemin="0"
                          style={{ width: `70%` }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h4 className="fw-500 font-xssss mt-2">
                          Start date: 16-07-2024
                        </h4>
                        <h4 className="fw-500 font-xssss mt-2">
                          Validity: 45 days
                        </h4>
                      </div>
                    </div>
                    <div className="card-footer bg-white">
                      <div className="d-flex justify-content-around mt-2">
                        <div className="d-flex flex-column align-items-center">
                          <MdOutlineAssessment className="font-md text-primary" />
                          <p className="font-xssss text-grey-900 fw-500">
                            Test
                          </p>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <PiCertificateBold className="font-md text-success text-center" />
                          <p className="font-xssss text-grey-900 fw-500">
                            Certificate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {subjectsData.length > 4 && (
              <div className="text-right mt-3 col-12">
                <button
                  className="btn bg-primary font-xsss text-white"
                  onClick={handleToggleView}
                >
                  {showAll ? 'View Less' : 'View All'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
              There are no courses available at the moment.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CoursesCard;

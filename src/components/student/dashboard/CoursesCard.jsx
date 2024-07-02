import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchMyCourses } from '@/api/student';
import { ContentItemCard, ContentLoader } from '@/components/common';
import { Link } from 'react-router-dom';

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
    <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
      <div className="card-body">
        <h4 className="font-xss text-grey-800 mt-1 lh-22 fw-700">My Courses</h4>
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
                    <ContentItemCard
                      key={index}
                      data={subject}
                      buttons={[
                        {
                          label: 'Learn',
                          action: () =>
                            `/student/courses/${subject.id}/learn`,
                          style: 'bg-primary-gradiant',
                        },
                      ]}
                    />
                //   <div className="col-xl-3 col-lg-4 col-md-6 mt-2">
                //     <div className="card mb-4 d-block w-100 h-100 shadow-md rounded-lg px-2 pt-5 border-0 text-center">
                //       <img
                //         src={baseUrl + subject.image}
                //         alt="icon"
                //         className="p-1 w-100 object-fit-cover fixed-avatar"
                //       />

                //       <h4 className="fw-700 font-xs my-2">{subject.name}</h4>

                //       <div className="clearfix"></div>

                //       <div className="mb-2">
                //         <Link
                //           key={index}
                //           to={`/student/courses/${subject.id}/learn`}
                //           className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4`}
                //         >
                //           Learn
                //         </Link>
                //       </div>
                //     </div>
                //   </div>
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
      </div>
    </div>
  );
}

export default CoursesCard;

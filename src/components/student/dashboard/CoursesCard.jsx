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
                        action: () => `/student/courses/${subject.id}/learn`,
                        style: 'bg-primary-gradiant',
                      },
                    ]}
                  />
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

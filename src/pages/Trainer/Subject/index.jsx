import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchTrainerCourses } from '@/api/trainer';

import {
  ContentFallback,
  ContentHeader,
  ContentItemCard,
  ContentLoader,
  EllipsisMenu,
} from '@/components/common';

function Course() {
  let { subjectId } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [subjectName, setSubjectName] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoursesCallback = useCallback(async () => {
    try {
      const data = await fetchTrainerCourses(subjectId);
      setSubjectName(data?.subject);
      setCoursesData(data.courses);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    fetchCoursesCallback();
  }, [fetchCoursesCallback]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ContentHeader title="All" subtitle="Courses" />
      <div className="row">
        {loading ? (
          <ContentLoader />
        ) : coursesData.length > 0 ? (
          coursesData.map((item, index) => (
            <div className="col-xl-3 col-lg-4 col-md-6 mt-2" key={index}>
              <div className="card mb-4 d-block w-100 h-100 shadow-md rounded-lg px-2 pt-5 border-0 text-center">
                <EllipsisMenu
                  items={[
                    {
                      label: 'Reviews',
                      href: `${item.id}/reviews`,
                    },
                    {
                      label: 'FAQs',
                      href: `${item.id}/faqs`,
                    },
                  ]}
                />
                <Link
                  to=""
                  className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto overflow-hidden"
                >
                  {item.image && (
                    <img
                      src={baseUrl + item.image}
                      alt="icon"
                      className="p-1 w-100 object-fit-cover fixed-avatar"
                    />
                  )}
                </Link>
                <h4 className="fw-700 font-xs my-2">{item.name}</h4>
                <div className="clearfix"></div>
                <div className="mb-2">
                  <Link
                    to={`/trainer/subjects/${subjectId}/courses/${item.id}/chapters`}
                    className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 bg-primary-gradiant`}
                  >
                    Chapters
                  </Link>
                  <Link
                    to={`/trainer/subjects/${subjectId}/courses/${item.id}/results`}
                    className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 bg-success ml-2`}
                  >
                    Results
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <ContentFallback />
        )}
      </div>
    </div>
  );
}

export default Course;

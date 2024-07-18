import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchTeacherSubjects } from '@/api/teacher';

import {
  ContentFallback,
  ContentHeader,
  ContentItemCard,
  ContentLoader,
  EllipsisMenu,
} from '@/components/common';

function Subject() {
  let { classId } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [className, setClassName] = useState(null);
  const [subjectsData, setSubjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjectsCallback = useCallback(async () => {
    try {
      const data = await fetchTeacherSubjects(classId);
      setClassName(data?.class);
      setSubjectsData(data.subjects);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    fetchSubjectsCallback();
  }, [fetchSubjectsCallback]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ContentHeader title="All" subtitle="Courses" />
      <div className="row">
        {loading ? (
          <ContentLoader />
        ) : subjectsData.length > 0 ? (
          subjectsData.map((item, index) => (
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
                    to={`/teacher/subjects/${classId}/courses/${item.id}/chapters`}
                    className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 bg-primary-gradiant`}
                  >
                    Chapters
                  </Link>
                  <Link
                    to={`/teacher/subjects/${classId}/courses/${item.id}/results`}
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

export default Subject;

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchTeacherSubjects } from '@/api/teacher';

import {
  ContentFallback,
  ContentHeader,
  ContentItemCard,
  ContentLoader,
} from '@/components/common';

function Subject() {
  let { classId } = useParams();

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
            <ContentItemCard
              key={index}
              data={item}
              buttons={[
                {
                  label: 'Chapters',
                  action: () =>
                    `/teacher/classes/${classId}/subjects/${item.id}/chapters`,
                  style: ' bg-primary-gradiant',
                },
                {
                  label: 'Results',
                  action: (item) =>
                    `/teacher/classes/${classId}/subjects/${item.id}/results`,
                  style: ' bg-success ml-2',
                },
              ]}
            />
          ))
        ) : (
          <ContentFallback />
        )}
      </div>
    </div>
  );
}

export default Subject;

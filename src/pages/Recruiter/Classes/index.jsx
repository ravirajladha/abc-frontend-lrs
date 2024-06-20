import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ContentItemCard,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchClasses } from '@/api/common';

function Classes() {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchClasses();
      setClassesData(response);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ContentHeader title="All" subtitle="Classes" />
      <div className="row">
        {loading ? (
          <ContentLoader />
        ) : classesData.length > 0 ? (
          classesData.map((item, index) => (
            <ContentItemCard
              key={index}
              data={item}
              buttons={[
                {
                  label: 'Courses',
                  action: (item) => `/teacher/subjects/${item.id}/courses`,
                  style: ' bg-primary-gradiant',
                },
                {
                  label: 'Results',
                  action: (item) => `/teacher/subjects/${item.id}/results`,
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

export default Classes;

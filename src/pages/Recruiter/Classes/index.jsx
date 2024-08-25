import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ContentItemCard,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchSubjects } from '@/api/common';

function Subjects() {
  const [subjectsData, setSubjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchSubjects();
      setSubjectsData(response);
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
      <ContentHeader title="All" subtitle="Subjects" />
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
                  label: 'Courses',
                  action: (item) => `/trainer/subjects/${item.id}/courses`,
                  style: 'bg-primary-gradiant',
                },
                {
                  label: 'Results',
                  action: (item) => `/trainer/subjects/${item.id}/results`,
                  style: 'bg-success ml-2',
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

export default Subjects;

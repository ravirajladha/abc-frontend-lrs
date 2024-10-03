import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ContentItemCard,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchTrainerSubjects } from '@/api/trainer';

function Subjects() {
  const [subjectsData, setSubjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchTrainerSubjects();
      console.log(response);
      setSubjectsData(response.subjects);
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
      <ContentHeader title="All" subtitle="Courses" />
      <div className="row">
        {loading ? (
          <ContentLoader />
        ) : subjectsData && subjectsData.length > 0 ? (
          subjectsData.map((item, index) => (
            <ContentItemCard
              key={index}
              data={item}
              buttons={[
                {
                  label: 'Courses',
                  action: (item) => `/trainer/subjects/${item.id}/courses`,
                  style: ' bg-primary-gradiant',
                },
                {
                  label: 'Results',
                  action: (item) => `/trainer/subjects/${item.id}/results`,
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

export default Subjects;

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { fetchSubjects } from '@/api/common';
import { deleteSubject } from '@/api/admin';

import {
  ContentLoader,
  ContentItemCard,
  ContentHeader,
} from '@/components/common';

function Subjects({ title }) {
  let { classId } = useParams();

  const [className, setClassName] = useState(null);
  const [subjectsData, setSubjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjectsCallback = useCallback(async () => {
    try {
      const data = await fetchSubjects(classId);
      setClassName(data?.class);
      setSubjectsData(data.subjects);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  const handleDelete = async (subjectId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this subject?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSubject(classId, subjectId);
          fetchSubjectsCallback();
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  useEffect(() => {
    fetchSubjectsCallback();
  }, [fetchSubjectsCallback]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-2">
      {loading ? (
        <ContentLoader />
      ) : (
        <ContentHeader
          title={`${className}`}
          subtitle={title}
          buttons={[
            {
              link: `create`,
              text: 'New Subject',
            },
          ]}
        />
      )}
      <div className="row">
        {loading ? (
          <div className="text-center mt-5 col-12"></div>
        ) : subjectsData !== null & subjectsData.length>0 ? (
          subjectsData.map((subject, index) => (
            
            <ContentItemCard
              key={index}
              data={subject}
              buttons={[
                {
                  label: 'Chapters',
                  action: () =>
                    `/admin/classes/${classId}/subjects/${subject.id}/chapters`,
                  style: ' bg-primary-gradiant',
                },
                {
                  label: 'Results',
                  action: () =>
                    `/admin/classes/${classId}/subjects/${subject.id}/results`,
                  style: ' bg-success ml-2',
                },
              ]}
              handleDelete={() => handleDelete(subject.id)}
              handleEdit={() =>
                `/admin/classes/${classId}/subjects/${subject.id}/edit`
              }
            />
          ))
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
               There are no subjects available at the moment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Subjects.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subjects;

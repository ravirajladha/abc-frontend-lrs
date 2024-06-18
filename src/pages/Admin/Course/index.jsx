import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { fetchCourses } from '@/api/common';
import { deleteSubject } from '@/api/admin';

import {
  ContentLoader,
  ContentItemCard,
  ContentHeader,
} from '@/components/common';

function Courses({ title }) {
  let { subjectId } = useParams();

  const [subjectName, setSubjectName] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoursesCallback = useCallback(async () => {
    try {
      const data = await fetchCourses(subjectId);
      setSubjectName(data?.class);
      setCoursesData(data.courses);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

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
          const response = await deleteSubject(subjectId, subjectId);
          fetchCoursesCallback();
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  useEffect(() => {
    fetchCoursesCallback();
  }, [fetchCoursesCallback]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-2">
      {loading ? (
        <ContentLoader />
      ) : (
        <ContentHeader
          title={title}
          buttons={[
            {
              link: `create`,
              text: 'New Course',
            },
          ]}
        />
      )}
      <div className="row">
        {loading ? (
          <div className="text-center mt-5 col-12"></div>
        ) : coursesData !== null & coursesData.length>0 ? (
          coursesData.map((course, index) => (
            
            <ContentItemCard
              key={index}
              data={course}
              buttons={[
                {
                  label: 'Chapters',
                  action: () =>
                    `/admin/subjects/${subjectId}/courses/${course.id}/chapters`,
                  style: ' bg-primary-gradiant',
                },
                {
                  label: 'Results',
                  action: () =>
                    `/admin/subjects/${subjectId}/courses/${course.id}/results`,
                  style: ' bg-success ml-2',
                },
              ]}
              handleDelete={() => handleDelete(course.id)}
              handleEdit={() =>
                `/admin/subjects/${subjectId}/courses/${course.id}/edit`
              }
            />
          ))
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
               There are no courses available at the moment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Courses.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Courses;

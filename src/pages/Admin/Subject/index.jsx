import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchSubjects } from '@/api/common';
import { deleteClass } from '@/api/admin';

import {
  ContentLoader,
  ContentItemCard,
  ContentHeader,
} from '@/components/common';

function Classes({ title }) {
  const [subjectsData, setSubjectsData] = useState(null);
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

  const handleDelete = async (subjectId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this class?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteClass(classId);
          fetchData();
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-2">
      <ContentHeader
        title={title}
        backLink="/admin/dashboard"
        buttons={[
          {
            link: 'create',
            text: 'New Subject',
          },
        ]}
      />

      <div className="row">
        {loading ? (
          <ContentLoader />
        ) : subjectsData !== null && subjectsData.length > 0 ? (
          subjectsData.map((classItem, index) => (
            <ContentItemCard
              key={index}
              data={classItem}
              buttons={[
                {
                  label: 'Courses',
                  action: (item) => `/admin/subjects/${item.id}/courses`,
                  style: ' bg-primary-gradiant',
                },
                {
                  label: 'Results',
                  action: (item) => `/admin/subjects/${item.id}/results`,
                  style: ' bg-success ml-2',
                },
              ]}
              handleDelete={() => handleDelete(classItem.id)}
              handleEdit={(item) => `/admin/subjects/${item.id}/edit`}
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

Classes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Classes;

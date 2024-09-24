import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchSubjects } from '@/api/common';
import { deleteSubject } from '@/api/admin';

import {
  ContentLoader,
  ContentItemCard,
  ContentHeader,
} from '@/components/common';

function Subjects({ title }) {
  const [subjectsData, setSubjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('from subjects index');
  const fetchData = async () => {
    try {
      const response = await fetchSubjects();
      console.log(response);
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
      text: 'Do you want to delete this subject?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSubject(subjectId);
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
        ) : subjectsData && subjectsData.length > 0 ? (
          subjectsData.map((subjectItem, index) => (
            <ContentItemCard
              key={index}
              data={subjectItem}
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
              handleDelete={() => handleDelete(subjectItem.id)}
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

Subjects.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subjects;

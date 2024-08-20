import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import { fetchChapters } from '@/api/common';
import { deleteChapter } from '@/api/admin';

import { ContentLoader, ContentHeader } from '@/components/common';

function Chapters({ title }) {
  let { subjectId, courseId } = useParams();

  const [courseName, setCourseName] = useState();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (subjectId, courseId) => {
    return await fetchChapters(subjectId, courseId)
      .then((data) => {
        setChapters(data.chapters);
        setCourseName(data.course);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(subjectId, courseId);
  }, []);

  const handleDelete = async (chapterId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this chapter?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteChapter(chapterId);
          await fetchData(subjectId, courseId);
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
          console.error('Error deleting chapter:', error);
        }
      }
    });
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-2">
      <ContentHeader
        title={courseName}
        subtitle={title}
        backLink={`/admin/subjects/${subjectId}/courses`}
        buttons={[
          {
            link: 'create',
            text: 'New Chapter',
          },
        ]}
      />

      <div className="row">
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : chapters && chapters.length > 0 ? (
          <div className="col-12">
            <div className="card border-0 py-4 shadow-md">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-admin mb-0 ">
                    <thead className="bg-greylight rounded-10">
                      <tr>
                        <th className="border-0">#</th>
                        <th className="border-0">Title</th>
                        <th className="border-0 text-right" width="35%">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapters.map((chapter, index) => (
                        <tr key={chapter.id}>
                          <td>{index + 1}</td>
                          <td>{chapter.title}</td>
                          <td className="text-right">
                            <Link
                              to={`/admin/subjects/${subjectId}/courses/${courseId}/chapters/${chapter.id}/create`}
                              className="btn btn-outline-info mr-2 btn-icon btn-sm"
                            >
                              <i className="feather-plus"></i>
                            </Link>
                            <Link
                              to={`/admin/subjects/${subjectId}/courses/${courseId}/chapters/${chapter.id}`}
                              className="btn btn-outline-primary mr-2 btn-icon btn-sm"
                            >
                              <i className="feather-eye"></i>
                            </Link>
                            <Link
                              to={`/admin/subjects/${subjectId}/courses/${courseId}/chapters/${chapter.id}/edit`}
                              className="btn btn-outline-warning btn-icon mr-2 btn-sm"
                            >
                              <i className="feather-edit"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(chapter.id)}
                              className="btn btn-outline-danger btn-icon btn-sm"
                            >
                              <i className="feather-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
              There are no chapters available at the moment. <br />
              <Link to="create">Go ahead and add new chapters.</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Chapters.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Chapters;

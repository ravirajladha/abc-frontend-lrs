import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import { fetchChapters } from '@/api/common';
import { deleteChapter } from '@/api/admin';

import { ContentLoader, ContentHeader } from '@/components/common';
import { updateChapterLockStatus } from '@/api/trainer';

function Chapters({ title }) {
  let { courseId, subjectId } = useParams();

  const [subjectName, setSubjectName] = useState();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (courseId, subjectId) => {
    return await fetchChapters(courseId, subjectId)
      .then((data) => {
        setChapters(data.chapters);
        setSubjectName(data.subject);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(courseId, subjectId);
  }, []);

  const toggleChapterStatus = async (chapterId, newStatus) => {
    try {
      const response = await updateChapterLockStatus(chapterId, newStatus);
      if (response) {
        const updatedChapters = chapters.map((chapter) => {
          if (chapter.id === chapterId) {
            return { ...chapter, lock_status: newStatus };
          }
          return chapter;
        });
        toast.success("Chapter status updated successfully.");
        setChapters(updatedChapters);
      }
    } catch (error) {
      console.error('Error updating chapter lock status:', error);
      toast.error(error.message);
    }
  };
  

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-2">
      <ContentHeader
        title={subjectName}
        subtitle={title}
        backLink={`/trainer/subjects/${courseId}/courses`}
        // buttons={[
        //   {
        //     link: 'create',
        //     text: 'New Chapter',
        //   },
        // ]}
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
                            {/* {chapter.lock_status == 0 ? (
                              <button
                                className="btn btn-outline-success btn-icon btn-sm mx-1"
                                onClick={() =>
                                    toggleChapterStatus(chapter.id, 1)
                                }
                              >
                                <i className="feather-lock"></i> Unlock
                              </button>
                            ) : (
                              <button
                                className="btn btn-outline-danger btn-icon btn-sm mx-1"
                                onClick={() =>
                                  toggleChapterStatus(chapter.id, 0)
                                }
                              >
                                <i className="feather-unlock"></i> Lock
                              </button>
                            )} */}
                            <Link
                              to={`/trainer/subjects/${courseId}/courses/${subjectId}/chapters/${chapter.id}`}
                              className="btn btn-outline-primary mx-1 btn-icon btn-sm"
                            >
                              <i className="feather-eye"></i>
                            </Link>
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

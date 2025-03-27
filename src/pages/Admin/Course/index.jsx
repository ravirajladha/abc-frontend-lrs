import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { fetchCourses } from '@/api/common';
import { deleteCourse } from '@/api/admin';

import {
  ContentLoader,
  ContentItemCard,
  ContentHeader,
  EllipsisMenu,
} from '@/components/common';

function Subjects({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  let { subjectId } = useParams();

  const [subjectName, setSubjectName] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoursesCallback = useCallback(async () => {
    try {
      const data = await fetchCourses(subjectId);
      setSubjectName(data?.subject);
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
      text: 'Do you want to delete this course?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteCourse(subjectId, courseId);
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
          title={`${subjectName}`}
          subtitle={title}
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
        ) : (coursesData !== null) & (coursesData.length > 0) ? (
          coursesData.map((item, index) => (
            // <ContentItemCard
            //   key={index}
            //   data={course}
            //   buttons={[
            //     {
            //       label: 'Chapters',
            //       action: () =>
            //         `/admin/subjects/${subjectId}/courses/${course.id}/chapters`,
            //       style: ' bg-primary-gradiant',
            //     },
            //     {
            //       label: 'Results',
            //       action: () =>
            //         `/admin/subjects/${subjectId}/courses/${course.id}/results`,
            //       style: ' bg-success ml-2',
            //     },
            //   ]}
            //   handleDelete={() => handleDelete(course.id)}
            //   handleEdit={() =>
            //     `/admin/subjects/${subjectId}/courses/${course.id}/edit`
            //   }
            // />
            <div className="col-xl-3 col-lg-4 col-md-6 mt-2" key={index}>
              <div className="card mb-4 d-block w-100 h-100 shadow-md rounded-lg px-2 pt-5 border-0 text-center">
                <EllipsisMenu
                  items={[
                    {
                      label: 'Reviews',
                      href: `${item.id}/reviews`,
                    },
                    {
                      label: 'FAQs',
                      href: `${item.id}/faqs`,
                    },
                    {
                      label: 'Edit',
                      icon: 'edit',
                      href: `${item.id}/edit`,
                    },
                    {
                      label: 'Delete',
                      icon: 'trash',
                      onClick: () => handleDelete(item.id),
                    },
                  ]}
                />
                <Link
                  to=""
                  className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto overflow-hidden"
                >
                  {item.image && (
                    <img
                      src={baseUrl + item.image}
                      alt="icon"
                      className="p-1 w-100 object-fit-cover fixed-avatar"
                    />
                  )}
                </Link>
                <h4 className="fw-700 font-xs my-2">{item.name}</h4>
                <div className="clearfix"></div>
                <div className="mb-2">
                  <Link
                    to={`/admin/subjects/${subjectId}/courses/${item.id}/chapters`}
                    className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 bg-primary-gradiant`}
                  >
                    Chapters
                  </Link>
                  <Link
                    to={`/admin/subjects/${subjectId}/courses/${item.id}/results`}
                    className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 bg-success ml-2`}
                  >
                    Results
                  </Link>
                </div>
              </div>
            </div>
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

Subjects.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subjects;

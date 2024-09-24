import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchReadableCoursesList } from '@/api/admin';
import Swal from 'sweetalert2';

function Index({ title }) {
  const [readableCourses, setreadableCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchReadableCoursesList();
      setreadableCourses(response.readableCourses);
      console.log(response.readableCourses);
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
    <>
      <ContentHeader
        title="All"
        subtitle="Readable Courses"
        buttons={[
          {
            link: `create`,
            text: 'New Readable Course',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        readableCourses &&
        (readableCourses.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0 ">
                      <thead className="bg-greylight rounded-10 ">
                        <tr>
                          <th className="border-0" scope="col">
                            #
                          </th>
                          <th className="border-0" scope="col">
                        Subject
                          </th>
                          <th className="border-0" scope="col">
                            Course
                          </th>
                          <th className="border-0" scope="col">
                            Ebook Name
                          </th>
                          <th className="border-0" scope="col">
                            Project Report Name
                          </th>
                          <th className="border-0" scope="col">
                            Case Study Name
                          </th>
                          <th scope="col" className="text-right border-0 pl-1" width="20%">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {readableCourses.map((readableCourse, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{readableCourse.subject_name}</td>
                            <td>{readableCourse.course_name}</td>
                            <td>{readableCourse.ebook_title}</td>
                            <td>{readableCourse.project_report_title ?? '-'}</td>
                            <td>{readableCourse.case_study_title ?? '-'}</td>
                            <td className="text-right">
                              <Link
                                to={`/ebooks/${readableCourse.ebook_id}/preview`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
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
          </div>
        ) : (
          <ContentFallback />
        ))
      )}
    </>
  );
}

Index.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Index;

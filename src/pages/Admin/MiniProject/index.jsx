import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ContentHeader,
  ContentLoader,
  ContentFallback,
} from '@/components/common';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMiniProjects } from '@/api/admin';
function MiniProject({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [miniProjectsData, setMiniProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getMiniProjects();
      console.log(response.miniProjects);
      setMiniProjectsData(response.miniProjects);
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
      <ContentHeader
        title="Mini Projects"
        buttons={[
          {
            link: 'create',
            text: 'New Project',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        miniProjectsData &&
        (miniProjectsData.length > 0 ? (
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
                            Name
                          </th>
                          <th className="border-0" scope="col">
                            Subject
                          </th>
                          <th className="border-0" scope="col">
                            Course
                          </th>
                          <th className="border-0" scope="col">
                            Image
                          </th>
                          <th className="border-0" scope="col">
                            Participant
                          </th>
                          <th className="border-0" scope="col">
                            Tasks
                          </th>
                          <th className="border-0" scope="col">
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-right border-0 pl-1"
                            width="20%"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {miniProjectsData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{item.name}</strong>
                            </td>
                            <td>{item.subject_name}</td>
                            <td>{item.course_name}</td>
                            <td>
                              {' '}
                              {/* Column for the image */}
                              {item.image && ( // Check if there's an image URL
                                <img
                                  src={baseUrl + item.image}
                                  alt="Mini Project Image"
                                  style={{ width: '50px', height: 'auto' }}
                                />
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/admin/mini-project/${item.id}/participants`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i> View{' '}
                                {item.participant_count}
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/admin/mini-project-tasks/${item.id}`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i> View (
                                {item.task_count})
                              </Link>
                            </td>
                            <td>
                              {item.is_active ? (
                                <span className="badge badge-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td className="text-right">
                              <Link
                                to={`/admin/mini-projects/${item.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
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
    </div>
  );
}

MiniProject.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MiniProject;

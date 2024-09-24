import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProjectReports, deleteProjectReport } from '@/api/admin';
import Swal from 'sweetalert2';

function ProjectReport({ title }) {
  const [projectReportsData, setprojectReportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchProjectReports();
      setprojectReportsData(response.projectReports);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (projectReportId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this project Report',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProjectReport(projectReportId);
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
    <>
      <ContentHeader
        title="Project Reports"
        buttons={[
          {
            link: `create`,
            text: 'New Project Report',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        projectReportsData &&
        (projectReportsData.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
                  {/* <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                    <option>Sort by latest</option>
                  </select> */}
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
                          <th scope="col" className="text-right border-0 pl-1">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectReportsData.map((projectReportItem, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{projectReportItem.title}</strong>
                            </td>
                            <td>{projectReportItem.subject_name}</td>
                            <td>{projectReportItem.course_name}</td>
                            <td className="text-right">
                              <Link
                                to={`/project-reports/${projectReportItem.id}/preview`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i>
                              </Link>
                              <Link
                                to={`${projectReportItem.id}/modules`}
                                className="btn btn-outline-secondary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-book"></i>
                              </Link>
                              <Link
                                to={`${projectReportItem.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
                              </Link>
                              <Link
                                to="#"
                                className="btn btn-outline-danger btn-icon btn-sm"
                                onClick={() =>
                                  handleDelete(projectReportItem.id)
                                }
                              >
                                <i className="feather-trash"></i>
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
ProjectReport.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProjectReport;

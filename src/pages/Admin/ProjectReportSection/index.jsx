import { useState, useEffect } from 'react';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { useParams } from 'react-router';
import { fetchProjectReportSections } from '@/api/admin';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

function ProjectReportSection({ title }) {
  const [projectReportSections, setProjectReportSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { projectReportId, projectReportModuleId } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetchProjectReportSections(
        projectReportId,
        projectReportModuleId
      );
      setProjectReportSections(response.projectReportSections);
      console.warn(response);
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
        title="Project Report"
        subtitle="Sections"
        buttons={[
          {
            link: `create`,
            text: 'New Section',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        projectReportSections &&
        (projectReportSections.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
                  <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                    <option>Sort by latest</option>
                  </select>
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
                          <th scope="col" className="text-right border-0 pl-1">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectReportSections.map((sectionItem, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{sectionItem.title}</strong>
                            </td>
                            <td className="text-right">
                              <Link
                                to={`/project-reports/${projectReportId}/preview`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i>
                              </Link>
                              <Link
                                to={`${sectionItem.id}/elements/create`}
                                className="btn btn-outline-secondary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-plus"></i>
                              </Link>

                              {/* not implemented edit and delete */}

                              <Link
                                to={`${sectionItem.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
                              </Link>
                              {/* <Link
                                to="#"
                                className="btn btn-outline-danger btn-icon btn-sm"
                              >
                                <i className="feather-trash"></i>
                              </Link> */}
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

export default ProjectReportSection;

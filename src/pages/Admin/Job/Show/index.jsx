import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';

import { fetchJobApplicationsList } from '@/api/admin';
import { formatDateTime } from '@/utils/helpers';

function Show(props) {

  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);

  const fetchJob = useCallback(async () => {
    fetchJobApplicationsList(jobId)
      .then((data) => {
        if (data) {
          console.log('data', data.job_applications);
          setJobApplications(data.job_applications);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, [jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);
  return (
    <>
      <ContentHeader
        title="Show Job Applications"
        backLink={props.isAdmin ? '/admin/jobs' : '/recruiter/jobs'}
      />

      {isLoading ? (
        <div className="text-center mt-5 col-12">
          <ContentLoader />
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body d-flex align-items-center justify-content-between pt-4 px-4 pb-0">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">
                  Job Applications
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
                          Class
                        </th>
                        <th className="border-0" scope="col">
                          Status
                        </th>
                        <th className="border-0" scope="col">
                          Applied on
                        </th>
                        {/* <th
                          scope="col"
                          className="text-right border-0 pl-1"
                          width="25%"
                        >
                          Action
                        </th> */}
                      </tr>
                    </thead>
                    {jobApplications && jobApplications?.length > 0 ? (
                      <tbody>
                        {jobApplications?.map((application, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{application?.student_name}</strong>
                            </td>
                            <td>{application?.class_name}</td>
                            <td>
                              {application?.is_pass ? (
                                <span className="badge badge-success">
                                  Pass
                                </span>
                              ) : (
                                <span className="badge badge-warning">
                                  Fail
                                </span>
                              )}
                            </td>
                            <td>{formatDateTime(application?.created_at)}</td>

                            {/*  <td className="text-right">
                             <Link
                                to="#"
                                onClick={() => handleShowModal(application)}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i>
                              </Link> 
                            </td>*/}
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5" className="text-center">
                            There are no job applications available at the
                            moment.
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Show;

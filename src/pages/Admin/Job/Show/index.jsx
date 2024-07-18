import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';
import { fetchJobApplicationsList } from '@/api/admin';
import { formatDateTime } from '@/utils/helpers';

const statusOptions = [
  'In Progress',
  'Applied',
  'Rejected',
  'Interview Scheduled',
  'Offered',
  'Hired',
];

function Show(props) {
  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);
  const [filters, setFilters] = useState({
    studentName: '',
    minPercentage: '',
    maxPercentage: '',
    passFail: '',
  });

  const initialFilters = {
    studentName: '',
    minPercentage: '',
    maxPercentage: '',
    passFail: '',
  };

  const fetchJob = useCallback(
    async (appliedFilters) => {
      setIsLoading(true);

      const { studentName, minPercentage, maxPercentage, passFail } = appliedFilters;
      fetchJobApplicationsList(jobId, {
        studentName,
        minPercentage,
        maxPercentage,
        passFail,
      })
        .then((data) => {
          if (data) {
            setJobApplications(data.job_applications);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
    },
    [jobId]
  );

  useEffect(() => {
    fetchJob(filters);
  }, [fetchJob]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJob(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    fetchJob(initialFilters);
  };

  const handleStatusChange = (applicationId, newStatus) => {
    // Dummy function to handle status change
    console.log(`Application ID: ${applicationId}, New Status: ${newStatus}`);
  };

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
        <>
          <div className="card border-0 mt-0 mb-2 rounded-lg shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between pt-4 px-4 pb-0">
              <form className="mb-4" onSubmit={handleFilterSubmit}>
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Student Name"
                      name="studentName"
                      value={filters.studentName}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min %"
                      name="minPercentage"
                      value={filters.minPercentage}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max %"
                      name="maxPercentage"
                      value={filters.maxPercentage}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-control"
                      name="passFail"
                      value={filters.passFail}
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      <option value="1">Pass</option>
                      <option value="0">Fail</option>
                    </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <button type="submit" className="btn btn-success bg-primary w-100">
                      Apply Filters
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark text-white bg-dark ml-2 w-100 "
                      onClick={handleReset}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex align-items-center justify-content-between pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">Job Applications</h4>
                </div>
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0">
                      <thead className="bg-greylight rounded-10">
                        <tr>
                          <th className="border-0" scope="col">#</th>
                          <th className="border-0" scope="col">Name</th>
                          <th className="border-0" scope="col">Status</th>
                          <th className="border-0" scope="col">Score</th>
                          <th className="border-0" scope="col">Applied on</th>
                          <th className="text-right border-0 pl-1" scope="col" width="25%">Action</th>
                        </tr>
                      </thead>
                      {jobApplications && jobApplications.length > 0 ? (
                        <tbody>
                          {jobApplications.map((application, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td><strong>{application.student_name}</strong></td>
                              <td>
                                <select
                                  className="form-control"
                                  value={application.status || ''}
                                  onChange={(e) => handleStatusChange(application.application_id, e.target.value)}
                                >
                                  <option value="">Select Status</option>
                                  {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td><strong>{application.percentage ?? '-'}</strong></td>
                              <td>{formatDateTime(application.created_at)}</td>
                              <td className="text-right">
                                {application.test_id ? (
                                  <Link
                                    to={`${application.application_id}/result`}
                                    className="btn btn-outline-warning btn-icon btn-sm mr-2"
                                  >
                                    <i className="feather-eye"></i>
                                  </Link>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="6" className="text-center">
                              There are no job applications available at the moment.
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
        </>
      )}
    </>
  );
}

export default Show;

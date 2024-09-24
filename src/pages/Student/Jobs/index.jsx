import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// import { submitJobApplication } from '@/api/student';
import { useNavigate } from 'react-router-dom';
import { ContentFallback, ContentHeader } from '@/components/common';
import { JobInstructionsModal } from '@/pages/Student';

import { fetchJobList, submitJobApplication } from '@/api/student';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { storeJobResponseWithoutToken } from '@/api/student';

function Jobs() {
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  console.log(studentData);
  const studentId = studentData.student_auth_id;
  // const classId = studentData.class_id;
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [loading1, setLoading1] = useState(false);

  const handleOpenModal = (job) => {
    console.log('job', job);
    setCurrentJob(job);
    setShowModal(true);
  };
  const getJobsList = useCallback(async () => {
    fetchJobList()
      .then((data) => {
        if (data) {
          setJobs(data.jobs);
        }
        console.log('jobs', data.jobs);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    getJobsList();
  }, [getJobsList]);

  // const handleSubmit = async (e, jobId) => {
  //   e.preventDefault();
  //   try {
  //     const submissionData = new FormData();
  //     submissionData.append('job_id', jobId);
  //     submissionData.append('student_id', studentId);
  //     const response = await submitJobApplication(submissionData);
  //     toast.success(response.message);
  //     getJobsList();
  //   } catch (error) {
  //     toast.error('Error applying the job. Please try again.');
  //   }
  // };

  const handleShowModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };
  const handleStartTestFromModal = (jobId, testId) => {
    handleCloseModal();
    handleStartTest(jobId, testId);
  };

  const handleStartTest = async (jobId, testId) => {
    setLoading1(true);
    const data = {
      studentId, // Assuming this is available from context or state
      // schoolId,
      // classId, 
      jobId,
      testId,
    };
    console.log('before testId: ' + testId);

    try {
      let response;
      if (testId) {
        console.log('testId: ' + testId);
        response = await submitJobApplication(data);
      } else {
        response = await submitJobApplication(data);
      }

      console.log(response, 'response');
      console.log(response.status, 'response status');
      if (response.status === 200) {
        setLoading1(false);

        if (testId) {
          navigate(`job-test/${response.token}/${jobId}`);
        } else {
          toast.success('Job application submitted successfully.');
          getJobsList();
        }
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      setLoading1(false);
      console.error(error);
      if (
        error.response &&
        error.response.data.message === 'Test already taken'
      ) {
        toast.error('You have already taken this test.');
      } else {
        toast.error('Unable to start the test. Please try again later.');
      }
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <ContentHeader title="Jobs" />
      <div className="row">
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
              <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
              <figure className="avatar position-relative w-110 z-index-1 w100 z-index-1 mr-auto ml-auto">
                  <img
                    src={baseUrl + job.image}
                    alt="image"
                  className="p-3 bg-greylight rounded-lg w-100"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </figure>

                <h4 className="fw-700 font-xs my-3">{job.title}</h4>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-dark mb-1 mr-1">
                  ₹&nbsp;{job?.annual_ctc}
                </span>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-dark mb-1">
                  <i className="feather-map-pin"></i>&nbsp; {job.location}
                </span>
                <p className="fw-500 font-xssss text-grey-500 mt-3 text-center">
                  Description: {job?.description}
                </p>
                <div className="clearfix"></div>

                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1 text-left mt-2">
                  {' '}
                  <i className="feather-pocket"></i>&nbsp; {job.criteria}
                </span>

                <div className="clearfix"></div>
                <div className="col-lg-12">
  <Link
    to="#"
    onClick={() => {
      if (!job?.applied) {
        handleOpenModal(job);
      }
    }}
    className="btn btn-outline-warning btn-icon btn-sm mr-2"
  >
    {job?.applied ? job?.participated_test_id ? `Applied (Score: ${job.percentage}%)` : 'Applied' : 'Apply'}
  </Link>
  <Link
    to="jobDetail"
    
    className="btn btn-outline-warning btn-icon btn-sm mr-2"
  >
  View Detail
  </Link>
</div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-12 ">
            <ContentFallback message="There are no job posts available at the moment." />
          </div>
        )}

<JobInstructionsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        currentJob={currentJob}
        handleStartTestFromModal={handleStartTestFromModal}
      />

       
      </div>
    </div>
  );
}

export default Jobs;

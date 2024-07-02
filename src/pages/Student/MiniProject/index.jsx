import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useOutletContext, useParams } from 'react-router-dom';
import { startMiniProject, completeMiniProject } from '@/api/student';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '@/utils/helpers';

import { getMiniProjectTasks } from '@/api/admin';
import {
  ContentHeader,
  ContentLoader,
  ContentFallback,
} from '@/components/common';

function MiniProject({ title }) {
  const studentData = useOutletContext();
  const studentId = studentData.student_auth_id;
  const [miniProjectData, setMiniProjectData] = useState({});
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentStatus, setStudentStatus] = useState(null);
  const navigate = useNavigate();
  const { subjectId, miniProjectId } = useParams();

  
  useEffect(() => {
    const fetchMiniProjectData = async () => {
      try {
        const response = await getMiniProjectTasks(miniProjectId, studentId);
        console.log(response, 'response');
        setStudentStatus(response.hasStartedMiniProject);
        setMiniProjectData(response.miniProject);
        const allTasks = response.miniProjectTasks;
        console.log(allTasks, 'all tasks');
        setTodoTasks(allTasks.filter((task) => !task.status));
        setInProgressTasks(allTasks.filter((task) => task.status === 1));
        setCompletedTasks(allTasks.filter((task) => task.status === 2));
   
      } catch (error) {
        console.error('Error fetching mini project data:', error);
        toast.error('Error fetching mini project data.');
    
      }finally{
        setLoading(false);
      }
    };

    fetchMiniProjectData();
  }, [miniProjectId]);

  console.log('inProgressTasks', inProgressTasks);
  const handleStartButtonClick = async (taskId, elabId) => {
    // e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('miniProjectTaskId', taskId);
      formData.append('studentId', studentId);
      formData.append('elabId', elabId);
      formData.append('subjectId', subjectId);
      formData.append('miniProjectId', miniProjectId);
      //need to pass subject id later, else the same taask with same user id will be shown completed
      console.log('formdata', formData);
      const response = await startMiniProject(formData);
      toast.success(response.message);
      // submission_id
      // console.log("submission_id", response);

      const url = `/student/elab/show/2/${subjectId}&${miniProjectId}&${taskId}/${elabId}`;
      // window.open(url, '_blank');
      window.open(url);

      // redirect to the elab
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGenerateCertificate = async (miniProjectId, studentId) => {
    console.log('interns', miniProjectId, studentId);
    try {
      const formData1 = new FormData();
      formData1.append('studentId', studentId);
      formData1.append('miniProjectId', miniProjectId);
      console.log('formdata1', formData1);
      const response = await completeMiniProject(formData1);
      console.log('response status', response);
      if (response.status === true) {
        toast.success(response.message);
        setStudentStatus(true);
        // setCertificateGenerated(true);
        fetchMiniProjectData();
      } else {
        toast.warning(response.message);
      }
      // Redirect to the elab
    } catch (error) {
      // Handle network or unexpected errors
      // console.error('Error generating certificate:', error);
      // toast.error('Failed to generate certificate', error.message);
    }
  };

  return (
    <>
      <ContentHeader
        title="Mini Projects"
        // buttons={[
        //   {
        //     link: `create`,
        //     text: 'New Mini Project',
        //   },
        // ]}
      />

      {loading ? (
        <ContentLoader />
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body d-flex pt-4 px-4 pb-0">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">{title}</h4>
                <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                  <option>Sort by latest</option>
                </select>
              </div>
              <div className="middle-sidebar-bottom theme-dark-bg">
                <div className="middle-sidebar-left">
                  <div className="row">
                    <div className="col-lg-12 pt-0 mb-3 mt-4 d-flex justify-content-between">
                      <h2 className="fw-400 font-lg d-block">
                        <b>{miniProjectData.name}</b>
                      </h2>
                    </div>
                    <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                      <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                        <div className="card-body p-3 border-top-lg border-size-lg border-primary p-0">
                          <h4>
                            <span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">
                              To Do
                            </span>
                            {/* <span className="float-right btn-round-sm bg-greylight">
                              <i className="feather-plus font-xss text-grey-900"></i>
                            </span> */}
                          </h4>
                        </div>
                        {todoTasks.map((task, index) => (
                          <div
                            className="card-body p-3 bg-lightblue m-3 rounded-lg"
                            key={index}
                          >
                            <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">
                              {task.mini_project_task_name}
                            </h4>
                            <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">
                              {task.description}
                            </p>

                            {!studentStatus && (
                              <button
                                className="px-2 py-1 mt-2 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-warning"
                                // target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  handleStartButtonClick(task.id, task.elab_id)
                                }
                              >
                                Start
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                      <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                        <div className="card-body p-3 border-top-lg border-size-lg border-warning p-0">
                          <h4>
                            <span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">
                              In progress{' '}
                            </span>
                            {/* <span className="float-right btn-round-sm bg-greylight">
                              <i className="feather-plus font-xss text-grey-900"></i>
                            </span> */}
                          </h4>
                        </div>
                        {inProgressTasks.map((task, index) => (
                          <div
                            className="card-body p-3 bg-lightbrown m-3 rounded-lg"
                            key={index}
                          >
                            <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">
                              {task.mini_project_task_name}
                            </h4>
                            <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">
                              {task.description}
                            </p>

                            {/* <Link
                              to={`/student/elab/show/2/${subjectId}&${miniProjectId}&${task.submission_id}/${task.elab_id}`}
                              // target="_blank"
                              rel="noopener noreferrer"
                            > */}

                            {!studentStatus && (
                              <Link
                                to={`/student/elab/show/2/${subjectId}&${miniProjectId}&${task.id}/${task.elab_id}`}
                                // target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button className="px-2 py-1 mt-2 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-primary">
                                  Resume
                                </button>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                      <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                        <div className="card-body p-3 border-top-lg border-size-lg border-success p-0">
                          <h4>
                            <span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">
                              Done
                            </span>
                            {/* <span className="float-right btn-round-sm bg-greylight">
                              <i className="feather-plus font-xss text-grey-900"></i>
                            </span> */}
                          </h4>
                        </div>
                        {/* <Link
                                      to={`/admin/elab/check-code/1/1/${task.elab_id}/${task.elab_submission_id}`}
                                      className="btn btn-outline-warning btn-icon btn-sm mr-2"
                                    >
                                    </Link> */}
                          
                        {completedTasks.map((task, index) => (
                          <div
                            className="card-body p-3 bg-lightgreen m-3 rounded-lg"
                            key={index}
                          >
                            <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">
                              {task.mini_project_task_name}
                            </h4>
                            <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">
                              {task.description}
                            </p>
                            <p className="font-xxsss lh-24 fw-500 text-grey-400 mt-1 d-block mb-1">
                        {formatDateTime(task.code_submitted_at)}
                      </p>
                    
                      <Link
                        to={`/student/elab/check-code/1/1/${task.elab_id}/${task.elab_submission_id}`}
                        className="btn btn-outline-warning btn-icon btn-sm mr-2"
                      >
                        <i className="feather-eye"></i> View Code
                      </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 )}

 {!loading && !studentStatus && (
   <button
     onClick={() => handleGenerateCertificate(miniProjectId, studentId)}
     className="mt-1 btn bg-success float-right text-center text-white font-xsss fw-600 p-3 w175 mt-5 rounded-lg d-inline-block border-0"
   >
     Click To Complete
   </button>
 )}

 {!loading && studentStatus && (
   <div className="text-center mt-5">
     <h3 className="bg-success text-white">Mini Project Completed</h3>
   </div>
 )}

 {!loading &&
   todoTasks.length === 0 &&
   inProgressTasks.length === 0 &&
   completedTasks.length === 0 && (
     <div className="text-center mt-5">
       <h3>No tasks found in this Mini Project</h3>
     </div>
   )}
</>
);
}

MiniProject.propTypes = {
  title: PropTypes.string,
};

export default MiniProject;

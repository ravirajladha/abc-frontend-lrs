// InternshipTasks.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ContentHeader,
  ContentLoader,
  ContentFallback,
} from '@/components/common';

const InternshipTasks = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { internshipId } = useParams();

  useEffect(() => {
    // Mock data
    const mockTasks = [
      {
        id: 1,
        name: 'Task 1',
        students: {
          pending: 3,
          in_progress: 5,
          completed: 2,
        },
      },
      {
        id: 2,
        name: 'Task 2',
        students: {
          pending: 4,
          in_progress: 3,
          completed: 4,
        },
      },
      {
        id: 3,
        name: 'Task 3',
        students: {
          pending: 2,
          in_progress: 4,
          completed: 5,
        },
      },
      // Add more tasks as needed
    ];
    setTasks(mockTasks);
  }, [internshipId]);

  return (
    <div>
      <ContentHeader
        title={`Tasks for Internship ${internshipId}`}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        tasks &&
        (tasks.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {/* {title} */}
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0">
                      <thead className="bg-greylight rounded-10">
                        <tr>
                          <th className="border-0" scope="col">#</th>
                          <th className="border-0" scope="col">Task Name</th>
                          <th className="border-0" scope="col">Pending</th>
                          <th className="border-0" scope="col">In Progress</th>
                          <th className="border-0" scope="col">Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{task.name}</strong>
                            </td>
                            <td>
                              {task.students.pending}
                            </td>
                            <td>
                              {task.students.in_progress}
                            </td>
                            <td>
                              {task.students.completed}
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
};

InternshipTasks.propTypes = {
  internshipId: PropTypes.number,
};

export default InternshipTasks;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ContentHeader } from '@/components/common';

function Internship({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', status: 'Not Started' },
    { id: 2, name: 'Task 2', status: 'Not Started' },
    { id: 3, name: 'Task 3', status: 'Not Started' },
    // Add more tasks as needed
  ]);

  const handleStart = (taskId) => {
    setTasks(prevState =>
      prevState.map(task =>
        task.id === taskId ? { ...task, status: 'In Progress' } : task
      )
    );
  };

  const handleComplete = (taskId) => {
    setTasks(prevState =>
      prevState.map(task =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };

  const handleCertificateUpload = (event, taskId) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate certificate upload functionality here
      console.log(`Certificate uploaded for task ${taskId}:`, file);
      toast.success('Certificate uploaded successfully');
    }
  };

  return (
    <div>
      <ContentHeader title={title} />
      <div className="kanban-board">
        <div className="kanban-column not-started">
          <h3>Not Started</h3>
          {tasks.filter(task => task.status === 'Not Started').map(task => (
            <div key={task.id} className="kanban-task">
              <h5>{task.name}</h5>
              <button
                className="bg-primary text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase mb-2"
                onClick={() => handleStart(task.id)}
              >
                Start
              </button>
            </div>
          ))}
        </div>

        <div className="kanban-column in-progress">
          <h3>In Progress</h3>
          {tasks.filter(task => task.status === 'In Progress').map(task => (
            <div key={task.id} className="kanban-task">
              <h5>{task.name}</h5>
              <button
                className="bg-success text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase mb-2"
                onClick={() => handleComplete(task.id)}
              >
                Complete
              </button>
            </div>
          ))}
        </div>

        <div className="kanban-column completed">
          <h3>Completed</h3>
          {tasks.filter(task => task.status === 'Completed').map(task => (
            <div key={task.id} className="kanban-task">
              <h5>{task.name}</h5>
              <button className="bg-warning text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase mb-2">
                Generate Certificate
              </button>
              <button className="bg-info text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase mb-2">
                Verify Certificate
              </button>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="form-control-file border-size-md p-2 rounded-sm"
                onChange={(event) => handleCertificateUpload(event, task.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .kanban-board {
          display: flex;
          justify-content: space-around;
        }
        .kanban-column {
          flex: 1;
          margin: 0 10px;
          padding: 10px;
          border-radius: 4px;
        }
        .kanban-column.not-started {
          background: #f0f4c3;
        }
        .kanban-column.in-progress {
          background: #bbdefb;
        }
        .kanban-column.completed {
          background: #c8e6c9;
        }
        .kanban-task {
          background: #fff;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

Internship.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default Internship;

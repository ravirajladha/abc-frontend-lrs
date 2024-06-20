import React from 'react';
import { Link } from 'react-router-dom';

function MiniProjects({ project, subjectId }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="col-lg-3">
      <div className="item">
        <div className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">
          <div className="card-image w-100">
            <Link to={`/student/courses/${subjectId}/mini-project/${project.id}`} className="col-12 border-0">
              <img src={baseUrl + project.image} alt={project.name} />
              <div className=" text-center">
            <h3 className="text-dark fw-700 lh-5 font-xss mt-1">{project.name}</h3>
          </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniProjects;

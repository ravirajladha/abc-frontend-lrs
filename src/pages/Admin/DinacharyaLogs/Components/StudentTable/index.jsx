import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ContentLoader } from '@/components/common';

const StudentTable = ({ students, loading, toggleModal }) => (
  <div className="row">
    {loading ? (
      <div className="text-center col-12">
        <ContentLoader />
      </div>
    ) : students && students.length > 0 ? (
      <div className="col-lg-12">
        <div className="card border-0 mt-0 rounded-lg shadow-xs">
          <div className="card-body d-flex px-4 pt-4 pb-0">
            <h4 className="font-xss text-grey-700">
              All <strong className="fw-700">Public Students List</strong>
            </h4>
          </div>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-admin mb-0">
                <thead className="bg-greylight rounded-10 ovh border-0">
                  <tr>
                    <th className="border-0">#</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Class</th>
                    <th className="border-0">Parents</th>
                    <th className="border-0">Created At</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.student_name}</td>
                      <td>{student?.class_name}</td>
                      <td>{student.parent_name}</td>
                      <td>{student.created_at}</td>
                      <td>
                        <Link
                          to="#"
                          className="btn btn-outline-primary btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleModal(student);
                          }}
                        >
                          <i className="feather-eye"></i>
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
    ) : (
      <div className="text-center mt-5 col-12">
        <div className="alert" role="alert">
          There are no students available at the moment.
        </div>
      </div>
    )}
  </div>
);

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default StudentTable;

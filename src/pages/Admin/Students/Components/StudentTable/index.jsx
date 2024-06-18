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
      // <div className="col-lg-12">
      //   <div className="card border-0 mt-0 rounded-lg shadow-xs">
      //     <div className="card-body d-flex px-4 pt-4 pb-0">
      //       <h4 className="font-xss text-grey-700">
      //         All <strong className="fw-700">Public Students List</strong>
      //       </h4>
        
          <div className="card-body d-flex px-4 pt-4 pb-0 justify-content-between">
            {/* <div className="table-responsive"> */}
              <table className="table table-admin mb-0">
                <thead className="bg-greylight rounded-10 ovh border-0">
                  <tr>
                    <th className="border-0">#</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Number</th>
                    {/* <th className="border-0">Class</th> */}
                    {/* <th className="border-0">Section</th> */}
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone_number}</td>
                      {/* <td>{student?.class_name}</td> */}
                      {/* <td>{student.section_name}</td> */}
                      <td>
                        <Link
                          to={`${student.auth_id}/edit-profile`}
                          className="btn btn-outline-primary btn-sm mx-1"
                        >
                          <i className="feather-edit"></i>
                        </Link>
                        <Link
                          to={`${student.student_id}/show-profile`}
                          className="btn btn-outline-warning btn-icon btn-sm mx-1"
                        >
                          <i className="feather-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* </div>
          </div>
        </div> */}
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

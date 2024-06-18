import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ContentLoader } from '@/components/common';
import DefaultProfileImage from '@/assets/images/default/student.png';

const StudentCard = ({ students, loading, baseUrl, toggleModal }) => (
  <div className="row">
    {loading ? (
      <div className="text-center col-12">
        <ContentLoader />
      </div>
    ) : students && students.length > 0 ? (
      students.map((student) => (
        <div className="col-md-4 mb-4" key={student.id}>
          <div className="card">
            <div className="card-body">
              <div className="mb-4 d-block w-100 rounded-lg border-0 text-center">
                <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden">
                  <img
                    src={
                      student?.profile_image
                        ? baseUrl + student?.profile_image
                        : DefaultProfileImage
                    }
                    alt="avatar"
                    className="w-100 mt-2"
                  />
                </figure>
                <h4 className="fw-700 font-xs my-3">{student?.name}</h4>
                <div className="clearfix"></div>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                  {student?.class_name}
                </span>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-primary d-inline-block text-primary mb-1 mr-1">
                  Section {student?.section_name}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <Link
                  onClick={() => toggleModal(student)}
                  className="btn btn-outline-success btn-icon btn-sm mr-2"
                >
                  Add Photo
                </Link>
                <Link
                  to={`${student.auth_id}/show`}
                  className="btn btn-outline-warning btn-icon btn-sm"
                >
                  View Photo
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center mt-5 col-12">
        <div className="alert" role="alert">
          There are no students available at the moment.
        </div>
      </div>
    )}
  </div>
);

StudentCard.propTypes = {
  students: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default StudentCard;

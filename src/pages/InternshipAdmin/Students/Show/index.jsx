import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { ContentHeader } from '@/components/common';
import { fetchStudent } from '@/api/internshipAdmin';
import No_image from '@/assets/images/no_image.png';

import DefaultProfileImage from '@/assets/images/default/student.png';

function Show({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { studentId } = useParams();
  const [student, setStudentDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudent(studentId);

        setStudentDetails(data.student);
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-2">
      <ContentHeader title={title} />
      {student && (
        <div className="row">
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
              <div className="row">
                <div className="col-lg-4">
                  <div className="mb-4 d-block w-100 rounded-lg border-0 text-center">
                    <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden">
                      <img
                        src={
                          student?.profile_image
                            ? baseUrl + student?.profile_image
                            // : DefaultProfileImage
                            : DefaultProfileImage
                        }
                        alt="avatar"
                        className="w-100 mt-2"
                      />
                    </figure>
                    <h4 className="fw-700 font-xs my-3">{student?.name}</h4>
                    <div className="clearfix"></div>
                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                      {student?.class}
                    </span>
                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-primary d-inline-block text-primary mb-1 mr-1">
                      Section {student?.section}
                    </span>
                  </div>
                </div>

                <div className="col-lg-4 mb-3 border-bottom">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Name: </span> {student?.name || "N/A"}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Email: </span> {student?.email || "N/A"}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">DOB: </span> {student?.dob || "N/A"}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Address: </span>{' '}
                      {student?.address || "N/A"}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Pincode: </span>{' '}
                      {student?.pincode || "N/A"}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4 mb-3 border-bottom">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">ID: </span> {student?.username || "N/A"}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Phone Number: </span>{' '}
                      {student?.phone_number || "N/A"}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Parent Name: </span>{' '}
                      {student?.parent_name || "N/A"}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Parent CODE: </span>{' '}
                      {student?.parent_code || "N/A"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;

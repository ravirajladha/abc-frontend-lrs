import PropTypes from 'prop-types';

import DefaultProfileImage from '@/assets/images/default/student.png';
import { Link } from 'react-router-dom';
import { getStudentDetails } from '@/api/student';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ContentLoader } from '@/components/common';
import { formatDate } from '@/utils/helpers';

function AboutCard({ studentData, isProfileEditable }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [student, setstudent] = useState({});
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await getStudentDetails(studentData.student_auth_id);
        setstudent(response.student);
      } catch (error) {
        toast.error('Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [studentData]);
  if (loading) return <ContentLoader />;

  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      {student && (
        <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
          {isProfileEditable && (
            <Link
              to={`${student?.student_auth_id}/edit`}
              className="font-xs text-black float-right"
            >
              <i className="feather-edit" />{' '}
            </Link>
          )}

          <div className="row">
            <div className="col-lg-4">
              <div className="mb-4 d-block w-100 rounded-lg border-0 text-center ">
                <figure className="avatar shadow-lg rounded-circle ml-auto mr-auto mb-0 w100 overflow-hidden">
                  <img
                    src={
                      student?.profile_image
                        ? baseUrl + student?.profile_image
                        : DefaultProfileImage
                    }
                    alt="avatar"
                    className=" w-100"
                  />
                </figure>
                <h4 className="fw-700 font-xs my-2">{student?.name}</h4>
                <div className="clearfix"></div>
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-700">
                  <span className="text-grey-900 fw-600">Email:</span>{' '}
                  {student?.email || 'N/A'}
                </span>
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-700">
                  <span className="text-grey-900 fw-600">Phone Number: </span>{' '}
                  {student?.phone_number || 'N/A'}
                </span>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">DOB: </span>{' '}
                  {student?.dob && formatDate(student?.dob) || 'N/A'}
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Address: </span>{' '}
                  {student?.address || 'N/A'}
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Gender: </span>{' '}
                  {student?.gender || 'N/A'}
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Pincode: </span>{' '}
                  {student?.pincode || 'N/A'}
                </label>
              </div>
            </div>
          </div>
          <div className="card w-100 border-top-current bg-lightgreen p-2 mb-2">
            <h4 className="font-xss fw-700 my-2">Educational Details</h4>
            <div className="card-body m-4 mb-0 bg-lightblue p-4 rounded-lg">
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">College Name: </span>
                      {student?.college_name}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Start Date: </span>
                      {student?.college_start_date && formatDate(student?.college_start_date) || 'N/A'}
                    </label>
                  </div>
                  </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">End Date: </span>
                      {student?.college_end_date && formatDate(student?.college_end_date) || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Semester: </span>
                      {student?.college_sem || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">12th Percentage: </span>
                      {student?.percentage_12th || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">12th End Date: </span>
                      {student?.end_date_12th && formatDate(student?.end_date_12th) || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">10th Percentage: </span>
                      {student?.percentage_10th || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">10th End Date: </span>
                      {student?.end_date_10th && formatDate(student?.end_date_10th) || 'N/A'}
                    </label>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          <div className="card w-100 border-top-current bg-lightgreen p-2 mb-2">
            <h4 className="font-xss fw-700 my-2">Parent / Guardian Details</h4>
            <div className="card-body m-4 mb-0 bg-lightblue p-4 rounded-lg">
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Father Name: </span>
                      {student?.father_name || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Father Email: </span>
                      {student?.father_email || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Father Phone: </span>
                      {student?.father_number || 'N/A'}
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Mother Name: </span>
                      {student?.mother_name || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Mother Email: </span>
                      {student?.mother_email || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Mother Phone: </span>
                      {student?.mother_number || 'N/A'}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card w-100 border-top-current bg-lightgreen p-2 mb-2">
            <h4 className="font-xss fw-700 my-2">About Me</h4>
            <div className="card-body m-4 mb-0 bg-lightblue p-4 rounded-lg">
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Hobbies: </span>
                      {/* {student?.hobbies?.length > 0
                        ? student.hobbies.join(', ')
                        : 'N/A' 
                      } */}
                      {student?.hobbies || 'N/A'}
                    </label>
                  </div>
                  </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Achievements: </span>
                      {student?.achievements || 'N/A'}
                      {/* {student?.achievements?.length > 0
                        ? student.achievements.join(', ')
                        : 'N/A' 
                      } */}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Language: </span>
                      {/* {student?.languages?.length > 0
                        ? student.languages.join(', ')
                        : 'N/A' 
                      } */}
                      {student?.languages || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">About me: </span>
                      {student?.about || 'N/A'}
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

AboutCard.propTypes = {
  studentData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default AboutCard;

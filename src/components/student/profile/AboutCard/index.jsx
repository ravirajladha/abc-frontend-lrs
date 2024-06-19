import PropTypes from 'prop-types';

import DefaultProfileImage from '@/assets/images/default/student.png';

function AboutCard({ studentData }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const student = studentData;
  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      <div className="card-header p-4 w-100 border-0 d-flex rounded-lg  bg-current">
        <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">About Me</h4>
      </div>
      {student && (
        <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
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
                <h4 className="fw-700 font-xs my-3">{student?.student_name}</h4>
                <div className="clearfix"></div>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                  {student?.class_name}
                </span>
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-primary d-inline-block text-primary mb-1 mr-1">
                  {student?.section_name}
                </span>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Name: </span>{' '}
                  {student?.student_name}
                </label>
              </div>
              {/* <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Class: </span> {student?.class_name|| 'N/A'}
                </label>
              </div> */}
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">DOB: </span> {student?.dob|| 'N/A'}
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Address: </span> {student?.address|| 'N/A'}
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Pincode: </span> {student?.pincode|| 'N/A'}
                </label>
              </div>
              
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Email: </span>{' '}
                  {student?.email || 'N/A'}
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Phone number: </span>{' '}
                  {student?.phone_number|| 'N/A'}
                </label>
              </div>
              {/* <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Parent ID: </span>{' '}
                  {student?.parent_code|| 'N/A'}
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Parent Name: </span>{' '}
                  {student?.parent_name || 'N/A'}
                </label>
              </div> */}
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

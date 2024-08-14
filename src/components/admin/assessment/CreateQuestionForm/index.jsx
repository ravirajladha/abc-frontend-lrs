import { SelectInput } from '@/components/common/form';
import PropTypes from 'prop-types';

function CreateQuestionForm({
  subjects,
  courses,
  formData,
  validationErrors,
  handleInputChange,
  handleSubjectChange,
  handleCourseChange,
  handleAction,
}) {
  return (
    <form onSubmit={handleAction}  autoComplete="off">
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Select Subject</label>
            <SelectInput
              className="form-control"
              options={subjects}
              name="selectedSubject"
              label="name"
              value={formData.selectedSubject || ''}
              onChange={handleSubjectChange}
              placeholder="Select Subject"
              required
            />
            {validationErrors.selectedSubject && (
              <span className="text-danger">
                Subject empty or not found
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-6 mb-2">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Select Course</label>
            <SelectInput
              className="form-control"
              options={courses}
              name="selectedCourse"
              label="name"
              value={formData.selectedCourse || ''}
              onChange={handleCourseChange}
              placeholder="Select Course"
              required
            />
            {validationErrors.selectedCourse && (
              <span className="text-danger">
              Course empty or not found
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-6 mb-2">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">No. of Questions</label>
            <input
              type="text"
              className="form-control"
              name="noOfQuestions"
              placeholder="Enter No. of Questions"
              value={formData.noOfQuestions || ''}
              disabled
            />
          </div>
        </div>

        <div className="col-lg-6 mb-2">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">
              Name for Assessment
            </label>
            <input
              type="text"
              className="form-control"
              name="assessmentName"
              placeholder="Enter Name for Assessment"
              value={formData.assessmentName || ''}
              onChange={handleInputChange}
              required
            />
            {validationErrors.assessmentName && (
              <span className="text-danger">
                {validationErrors.assessmentName}
              </span>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-2">
          <div className="form-group ">
            <label className="form-label mont-font fw-600 font-xsss">
              Duration (in seconds)*
            </label>
            <input
              name="duration"
              value={formData.duration || ''}
              onChange={handleInputChange}
              className="form-control form_control"
              type="number"
              inputMode="numeric"
              step="1"
              min="0"
              placeholder="Enter Duration (in seconds) *"
            />
            {validationErrors.duration && (
              <span className="text-danger">{validationErrors.duration}</span>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-2">
          <div className="form-group ">
            <label className="form-label mont-font fw-600 font-xsss">
              Passing Percentage*
            </label>
            <input
              name="passingPercentage"
              value={formData.passingPercentage || ''}
              onChange={handleInputChange}
              className="form-control form_control"
              type="number"
              inputMode="numeric"
              step="1"
              min="0"
              max="100"
              placeholder="Enter Percentage out of 100"
            />
            {validationErrors.duration && (
              <span className="text-danger">{validationErrors.duration}</span>
            )}
          </div>
        </div>

        <div className="col-lg-6 mb-2">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">
              Description for Assessment
            </label>
            <textarea
              name="description"
              className="form-control mb-0 p-3 h100 lh-16"
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Enter description for assessment"
            ></textarea>
            {validationErrors.description && (
              <span className="text-danger">
                {validationErrors.description}
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-12">
          <button
            type="submit"
            className={`btn bg-current mt-4 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right ls-3 ${
              !formData.noOfQuestions && 'disabled'
            }`}
            disabled={!formData.noOfQuestions}
          >
            <>
              <i className="feather-arrow-right-circle mr-2"></i> Next
            </>
          </button>
        </div>
      </div>
    </form>
  );
}

CreateQuestionForm.propTypes = {
  courses: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  formData: PropTypes.shape({
    selectedCourse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedSubject: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    noOfQuestions: PropTypes.number,
    assessmentName: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.any,
  }).isRequired,
  validationErrors: PropTypes.shape({
    selectedCourse: PropTypes.string,
    selectedSubject: PropTypes.string,
    assessmentName: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.any,
  }).isRequired,
  setCourses: PropTypes.func.isRequired,
  setSubjects: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  setValidationErrors: PropTypes.func.isRequired,
  fetchSubjectsDropdownData: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCourseChange: PropTypes.func.isRequired,
  handleSubjectChange: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default CreateQuestionForm;

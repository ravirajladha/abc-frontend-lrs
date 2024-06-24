import PropTypes from 'prop-types';
import { SaveButton } from '@/components/common/form';

function QuestionForm({
  question,
  handleInputChange,
  handleSubmit,
  validationErrors,
  loading,
}) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card w-100 border-0 bg-white shadow-xs p-0">
          <div className="card-header p-4 w-100 border-0 d-flex rounded-lg  bg-light">
            <h4 className="font-xs text-grey fw-600 ml-4 mb-0 mt-2">
              Ask Question
            </h4>
          </div>
          <div className="card-body p-lg-5 p-4 w-100 border-0 ">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-12">
                  <textarea
                    className="form-control mb-0 p-3 bg-greylight lh-16"
                    rows="5"
                    placeholder="Write your question here."
                    style={{ resize: 'none' }}
                    value={question}
                    onChange={handleInputChange}
                    autoComplete="question"
                  ></textarea>
                  {validationErrors.question && (
                    <span className="text-danger">
                      {validationErrors.question}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mt-4 text-right">
                {/* <button
                    type="submit"
                    className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <i className="fa fa-spinner fa-spin mr-2"></i>
                    ) : (
                      <i className="feather-save mr-2"></i>
                    )}
                    {loading ? 'Submitting...' : 'Submit'}
                  </button> */}

                  <SaveButton isSubmitting={loading} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

QuestionForm.propTypes = {
  question: PropTypes.string,
  validationErrors: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default QuestionForm;

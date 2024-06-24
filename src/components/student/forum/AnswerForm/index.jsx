import PropTypes from 'prop-types';

function AnswerForm({
  answer,
  handleInputChange,
  handleSubmit,
  validationErrors,
}) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card w-100 border-0 bg-white shadow-md p-0">
          <div className="card-header p-4 w-100 border-0 d-flex rounded-lg  bg-light">
            <h4 className="font-xs text-grey-700 fw-600 ml-4 mb-0 mt-2">
              Write your answer
            </h4>
          </div>
          <div className="card-body p-lg-5 p-4 w-100 border-0 ">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-12">
                  <textarea
                    className="form-control mb-0 p-3 bg-greylight lh-16"
                    rows="4"
                    placeholder="Write your answer here."
                    style={{ resize: 'none' }}
                    value={answer}
                    onChange={handleInputChange}
                    autoComplete="answer"
                  ></textarea>
                  {validationErrors.answer && (
                    <span className="text-danger">
                      {validationErrors.answer}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mt-4 text-right">
                  <button
                    type="submit"
                    className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

AnswerForm.propTypes = {
  answer: PropTypes.string,
  validationErrors: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default AnswerForm;

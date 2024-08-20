import PropTypes from 'prop-types';

import { ContentDisplayModal } from '@/components/common';
import { TERM_TYPES } from '@/utils/constants';

const TestQuestionShowModal = ({
  showModal,
  handleCloseModal,
  selectedQuestion,
}) => {
  return (
    <>
      {selectedQuestion && (
        <ContentDisplayModal
          show={showModal}
          handleClose={handleCloseModal}
          title="Test Question Details"
          content={
            <div className="row">
              <div className="col-12">
                <div className="card border-0 m-0">
                  <div className="card-body p-2 pb-0 border-0">
                    <div className="row mt-1">
                      <div className="col-12">
                        <span className="badge badge-pill badge-info mr-2 px-3 py-2 text-white font-xssss fw-500 mt-1 lh-3">
                          {selectedQuestion?.class}
                        </span>
                        <span className="badge badge-pill badge-warning px-3 py-2 text-white font-xssss fw-600 mt-1 lh-3">
                          {selectedQuestion?.subject}
                        </span>
                      </div>
                      <div className="col-12">
                        <h4 className="fw-600 font-xss mt-3">
                          {`Q. ${selectedQuestion?.question}`}
                        </h4>
                      </div>
                      {selectedQuestion?.code && (
                        <div className="col-12 p-2 mb-0">
                          <pre className="bg-grey pl-2 mx-2 py-2 mb-0">
                            <code>{`${selectedQuestion?.code}`}</code>
                          </pre>
                        </div>
                      )}
                      <div className="col-12">
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            selectedQuestion.answer_key === 'option_one'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          Option 1: {`${selectedQuestion.option_one}`}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            selectedQuestion.answer_key === 'option_two'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          Option 2: {`${selectedQuestion.option_two}`}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            selectedQuestion.answer_key === 'option_three'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          Option 3: {`${selectedQuestion.option_three}`}
                        </p>
                        <p
                          className={`font-xsss mt-3 fw-500 ${
                            selectedQuestion.answer_key === 'option_four'
                              ? 'text-success fw-700'
                              : ''
                          }`}
                        >
                          Option 4: {`${selectedQuestion.option_four}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

TestQuestionShowModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer_key: PropTypes.oneOf([
      'option_one',
      'option_two',
      'option_three',
      'option_four',
    ]),
    option_one: PropTypes.string.isRequired,
    option_two: PropTypes.string.isRequired,
    option_three: PropTypes.string.isRequired,
    option_four: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  }),
};

export default TestQuestionShowModal;

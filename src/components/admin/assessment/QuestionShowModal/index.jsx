import PropTypes from 'prop-types';
import { ContentDisplayModal } from '@/components/common';

const QuestionDetailsModal = ({
  showModal,
  handleCloseModal,
  selectedQuestion,
}) => {
  return (
    <>
      {selectedQuestion && (
        <ContentDisplayModal
          show={showModal}
          handleClose={handleCloseModal} className="card border-0"
          title="Assessment Question Details"
          content={
            <div className="row">
              <div className="col-12">
                <div className="card border-0 m-0">
                  <div className="card-body p-2 pb-0 border-0">
                    <h4 className="fw-600 font-xss mt-4">
                      {`Q. ${selectedQuestion.text}`}
                    </h4>
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
          }
        />
      )}
    </>
  );
};

QuestionDetailsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.shape({
    text: PropTypes.string.isRequired,
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
  }),
};

export default QuestionDetailsModal;

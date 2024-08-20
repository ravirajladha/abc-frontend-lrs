import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

function SelectQuestions({
  questions,
  isSubmitting,
  selectedQuestions,
  setSelectedQuestions,
}) {
  const handleToggleQuestion = (questionId) => {
    const isSelected = selectedQuestions.includes(questionId);

    if (isSelected) {
      setSelectedQuestions((prevSelected) =>
        prevSelected.filter((id) => id !== questionId)
      );
    } else {
      setSelectedQuestions((prevSelected) => [...prevSelected, questionId]);
    }
  };

  return (
    <>
      {isSubmitting ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <div className="row">
                {questions ? (
                  questions.map((question) => (
                    <div key={question.id} className="col-lg-6">
                      <div
                        className={`question-card card p-4 mb-3 
                              ${
                                selectedQuestions.includes(question.id)
                                  ? 'selected'
                                  : ''
                              }
                            `}
                      >
                        <div>
                          <div className="font-xs fw-600">
                            Q. {question.question}
                          </div>
                          {question?.code && <pre className=" bg-grey p-2">{question?.code}</pre>}
                          <ul>
                            <li
                              className={
                                question.answer_key === 'option_one'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {'1.' + question.option_one}
                            </li>
                            <li
                              className={
                                question.answer_key === 'option_two'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {'2.' +question.option_two}
                            </li>
                            <li
                              className={
                                question.answer_key === 'option_three'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {'3.' +question.option_three}
                            </li>
                            <li
                              className={
                                question.answer_key === 'option_four'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {'4.' +question.option_four}
                            </li>
                          </ul>
                        </div>
                        <div className="pt-2 text-right">
                          <a
                            className={
                              selectedQuestions.includes(question.id)
                                ? 'btn btn-success'
                                : 'btn btn-primary'
                            }
                            onClick={() => handleToggleQuestion(question.id)}
                          >
                            {selectedQuestions.includes(question.id) ? (
                              <>
                                <span className="feather-check"></span> Selected
                              </>
                            ) : (
                              <>Select</>
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No questions available</p>
                )}
              </div>
              <div className="font-xs fw-600">
                No. of questions selected:
                {selectedQuestions && selectedQuestions.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

SelectQuestions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  isSubmitting: PropTypes.bool.isRequired,
  selectedQuestions: PropTypes.array.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
};

export default SelectQuestions;

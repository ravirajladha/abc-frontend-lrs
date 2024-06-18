import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { ContentLoader } from '@/components/common';
function SelectQuestions({
  questions,
  isSubmitting,
  selectedQuestions,
  setSelectedQuestions,
}) {

  const handleToggleQuestion = (questionId) => {
    const isSelected = selectedQuestions.includes(questionId);

    const maxSelectedQuestions = 5;
    const selectedQuestionCount = selectedQuestions.length;

    if (isSelected) {
      setSelectedQuestions((prevSelected) =>
        prevSelected.filter((id) => id !== questionId)
      );
    } else {
      // Only allow selecting more questions if the maximum limit is not reached
      if (selectedQuestionCount < maxSelectedQuestions) {
        setSelectedQuestions((prevSelected) => [...prevSelected, questionId]);
      } else {
        // Show a toast or message indicating maximum questions reached
        console.log('Maximum questions limit reached');
      }
    }
  };
  console.log(selectedQuestions);
  return (
    <>
      {isSubmitting ? (
        <>
          <p className="text-center">Submitting assessment</p>
          <ContentLoader />
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
                            Q. {question.text}
                          </div>
                          <ul>
                            <li
                              className={
                                question.answer_key === 'option_one'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {question.option_one}
                            </li>
                            <li
                              className={
                                question.answer_key === 'option_two'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {question.option_two}
                            </li>
                            <li
                              className={
                                question.answer_key === 'option_three'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {question.option_three}
                            </li>
                            <li
                              className={
                                question.answer_key === 'option_four'
                                  ? 'text-success fw-700'
                                  : undefined
                              }
                            >
                              {question.option_four}
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
      // id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  isSubmitting: PropTypes.bool.isRequired,
  selectedQuestions: PropTypes.array.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
};

export default SelectQuestions;

import React from 'react';
import PropTypes from 'prop-types';

function ResponseItemCard({ response }) {
  const options = ['option_one', 'option_two', 'option_three', 'option_four'];
  const isAnswerCorrect = response.answer_key === response.student_response;

  return (
    <div
      className={`card mt-1 rounded-10 shadow-md ${
        response[response.student_response] === undefined
          ? 'border-danger'
          : 'border-0'
      }`}
    >
      <div className={`card-body p-4 pb-0  `}>
        <div className="row">
          <div className="col-lg-8">
            <h4 className="fw-600 font-xss mt-4">Q. {response.question}</h4>
            {response?.code && (
              <pre className=" bg-grey p-2">{response?.code}</pre>
            )}
            {options.map((option, index) => (
              <p
                key={index}
                className={`font-xsss mt-3 fw-500 ${
                  response.answer_key === option ? 'text-success fw-700' : ''
                } ${
                  !isAnswerCorrect && response.student_response === option
                    ? 'text-danger fw-700'
                    : ''
                }`}
              >
                {`${index + 1}. ${response[option]}`}
              </p>
            ))}
          </div>
          <div className="col-lg-4 d-flex align-items-center">
            {isAnswerCorrect ? (
              <p className="font-xsss mt-3 fw-500 text-success fw-700">
                Correct Answer!
              </p>
            ) : (
              <p className="font-xsss mt-3 fw-500 text-danger fw-700">
                {response[response.student_response]
                  ? 'Your Answer: ' +
                    response[response.student_response] +
                    ' (Incorrect)'
                  : 'Not Attempted'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ResponseItemCard.propTypes = {
  response: PropTypes.shape({
    question: PropTypes.string,
    option_one: PropTypes.string,
    option_two: PropTypes.string,
    option_three: PropTypes.string,
    option_four: PropTypes.string,
    answer_key: PropTypes.string,
    student_response: PropTypes.string,
  }),
};

export default ResponseItemCard;

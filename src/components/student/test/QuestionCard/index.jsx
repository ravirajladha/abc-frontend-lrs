import React from 'react';
import PropTypes from 'prop-types';

function QuestionCard({
  index,
  question,
  selectedOption,
  setSelectedOption,
  setSelectedAnswers,
}) {
  return (
    <>
      <h4 className="font-xss text-uppercase text-current fw-700 ls-3">
        {`Question  ${index + 1}`}
      </h4>
      <h3 className="font-lg text-grey-800 fw-700 lh-32 mt-3 ">
        {question?.question}
      </h3>
      {question?.code && <pre className=" bg-grey p-2">{question?.code}</pre>}
      <>
        {['option_one', 'option_two', 'option_three', 'option_four'].map(
          (option, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                id={`${option}`}
                className='d-none'
                value={option}
                checked={selectedOption === option}
                onChange={(e) => {
                  const updatedOption = e.target.value;
                  setSelectedOption(updatedOption);
                  setSelectedAnswers((prevSelectedAnswers) => [
                    ...prevSelectedAnswers,
                    updatedOption,
                  ]);
                }}
              />

              <label
                htmlFor={`${option}`}
                className={`bg-lightblue theme-dark-bg p-2 mt-3 question__answer style2 rounded-lg font-xssss fw-600 lh-28 text-grey-700 mb-0 p-2 ${
                  selectedOption === option ? 'active' : ''
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <span className="pt-2 pb-2 pl-3 pr-3 mr-4 d-inline-block rounded-lg bg-current text-white font-xssss fw-600">
                  {String.fromCharCode(65 + index)}
                </span>
                {question[option]}
              </label>
            </React.Fragment>
          )
        )}
      </>
    </>
  );
}

QuestionCard.propTypes = {
  index: PropTypes.number,
  question: PropTypes.object,
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
  setSelectedAnswers: PropTypes.func,
};

export default QuestionCard;

import PropTypes from 'prop-types';

function QnaSearchResults({ results, onResultClick }) {
  const handleClick = (question, id) => {
    onResultClick(question, id);
    results = '';
  };
  return (
    <div className="result scroll-bar card w-100 border-0 bg-white shadow-xs p-0">
      {results?.map((result, id) => {
        return (
          <p key={id} onClick={() => handleClick(result?.question, result?.id)}>
            {result?.question}
          </p>
        );
      })}
    </div>
  );
}

QnaSearchResults.propTypes = {
  results: PropTypes.any,
  onResultClick: PropTypes.any,
};

export default QnaSearchResults;

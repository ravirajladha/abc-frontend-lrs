import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { searchForumQuestion } from '@/api/student';

function SearchBar() {
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async () => {
    setSearchResults([]);
    try {
      const response = await searchForumQuestion(searchQuery);
      if (response.status) {
        setSearchResults(response.data.questions);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleSearchInput = () => {
    setSearchQuery(searchInputRef.current.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="card border-0 bg-white shadow-xs p-0 mb-4 rounded-lg">
      <form onSubmit={handleSearchSubmit} autoComplete="off">
        <div className="row mx-1">
          <div className="col-lg-10">
            <div className="form-group icon-input mb-0 search-box">
              <i
                className="ti-search font-lg text-grey-400"
                style={{ top: '14.2px', left: '4px' }}
              ></i>
              <input
                type="text"
                placeholder="Start typing to search.."
                className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xss fw-500 rounded w-100"
                value={searchQuery}
                onChange={handleSearchInput}
                ref={searchInputRef}
                autoComplete="searchQuery"
              />
            </div>
          </div>
          <div className="col-lg-2 text-center bg-current rounded-end-5 rounded-lg">
            <button
              className="fw-600 bg-transparent cursor-pointer text-white font-xsss px-3 py-3 text-center d-inline-block rounded border-0 w-100"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {searchQuery !== '' && searchResults && searchResults.length > 0 ? (
        <div className="row z-index-1">
          <div className="position-absolute w-75 rounded-lg shadow-md border-bottom-1 p-2 mt-1 mx-3 top-4 bg-white">
            {searchResults.map((result) => (
              <div key={result.id} className="result-item pl-2 py-2">
                <Link to={`${result.id}`}>
                  {result.question}
                  <i className="ml-2 feather-external-link"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        searchQuery !== '' && (
          <div className="row z-index-1">
            <div className="position-absolute w-75 rounded-lg shadow-md border-bottom-1 p-2 mt-1 mx-3 top-4 bg-white">
              <div className="result-item">No forums found.</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  searchResults: PropTypes.array,
};

export default SearchBar;

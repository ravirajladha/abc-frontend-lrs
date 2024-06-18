import { useState, useEffect } from 'react';
import { fetchQuotes, deleteQuote } from '@/api/admin';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import { ContentLoader, Pagination } from '@/components/common';

function Quote({ title, subtitle }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [onPageChange, setOnPageChange] = useState(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchQuotes(currentPage)
      .then((data) => {
        console.warn(data);
        setQuotes(data.quotes.data);

        setCurrentPage(data.quotes.current_page);
        setTotalPages(data.quotes.last_page);
        setOnPageChange(data.quotes.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleDelete = async (quoteId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this Case Study?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteQuote(quoteId);
          setQuotes(quotes.filter((quote) => quote.id !== quoteId));

          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-2">
      <div className="row mb-4">
        <div className="col-lg-12 d-flex align-items-center justify-content-between">
          <h2 className="text-grey-900 font-md mb-0">
            <span className="fw-600">All Quotes</span>
          </h2>
          <div className="d-flex align-items-center">
            <Link
              to="create"
              className="btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-3 rounded-lg text-center font-xsss shadow-xs mr-2 text-white bg-primary-gradiant"
            >
              <span
                className="feather-plus font-xsss mr-1 fw-bolder"
                style={{ marginTop: '2.5px' }}
              ></span>
              Add Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Contents */}

      <div className="row">
        {loading ? (
          <div className="text-center col-12">
            <ContentLoader />
          </div>
        ) : quotes && quotes.length > 0 ? (
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-xs">
              <div className="card-body d-flex px-4 pt-4 pb-0">
                <h4 className="font-xss text-grey-700">
                  All <strong className="fw-700"> Quotes List</strong>{' '}
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-admin mb-0 ">
                    <thead className="bg-greylight rounded-10 ovh border-0">
                      <tr>
                        <th className="border-0">#</th>
                        <th className="border-0">Name</th>

                        <th className="border-0">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote, index) => (
                        <tr key={quote.id}>
                          <td>{index + 1}</td>
                          <td>{quote.quote}</td>

                          <td>
                            <Link
                              to={`${quote.id}/edit`}
                              className="btn btn-outline-warning btn-icon btn-sm"
                            >
                              <i className="feather-edit"></i>
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-outline-warning btn-icon btn-sm"
                              onClick={() => handleDelete(quote.id)}
                            >
                              <i className="feather-trash"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
          </div>
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
              There are no Quotes available at the moment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Quote.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Quote;

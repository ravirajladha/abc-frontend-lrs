import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchEbooks, deleteEbook } from '@/api/admin';
import Swal from 'sweetalert2';

function Index({ title }) {
  const [ebooksData, setEbooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchEbooks();
      setEbooksData(response.ebooks);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (ebookId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this Ebook?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteEbook(ebookId);
          fetchData();
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContentHeader
        title="All"
        subtitle="eBooks"
        buttons={[
          {
            link: `create`,
            text: 'New eBook',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        ebooksData &&
        (ebooksData.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
                  {/* <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                    <option>Sort by latest</option>
                  </select> */}
                </div>
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0 ">
                      <thead className="bg-greylight rounded-10 ">
                        <tr>
                          <th className="border-0" scope="col">
                            #
                          </th>
                          <th className="border-0" scope="col">
                            Name
                          </th>
                          <th className="border-0" scope="col">
                            Subject
                          </th>
                          <th className="border-0" scope="col">
                            Course
                          </th>
                          <th
                            scope="col"
                            className="text-right border-0 pl-1"
                            width="20%"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ebooksData.map((ebookItem, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{ebookItem.title}</strong>
                            </td>
                            <td>{ebookItem.subject_name}</td>
                            <td>{ebookItem.course_name}</td>
                            <td className="text-right">
                              <div className="d-flex flex-wrap justify-content-end">
                                <Link
                                  to={`/ebooks/${ebookItem.id}/preview`}
                                  className="btn btn-outline-warning btn-icon btn-sm mr-2 mb-2"
                                >
                                  <i className="feather-eye"></i>
                                </Link>
                                <Link
                                  to={`${ebookItem.id}/modules`}
                                  className="btn btn-outline-secondary btn-icon btn-sm mr-2 mb-2"
                                >
                                  <i className="feather-book"></i>
                                </Link>
                                <Link
                                  to={`${ebookItem.id}/edit`}
                                  className="btn btn-outline-primary btn-icon btn-sm mr-2 mb-2"
                                >
                                  <i className="feather-edit"></i>
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-outline-danger btn-icon btn-sm mb-2"
                                  onClick={() => handleDelete(ebookItem.id)}
                                >
                                  <i className="feather-trash"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ContentFallback />
        ))
      )}
    </>
  );
}

Index.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Index;

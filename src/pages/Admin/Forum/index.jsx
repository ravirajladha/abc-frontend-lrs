import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
  Pagination,
} from '@/components/common';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchForumQuestions, updateForumStatus } from '@/api/admin';
import Swal from 'sweetalert2';
import { formatDateTime } from '@/utils/helpers';

function Index({ title }) {
  const [forumsData, setForumsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchData = async () => {
    try {
      const response = await fetchForumQuestions(currentPage);
      setForumsData(response.forumQuestions.data);
      setTotalPages(response.forumQuestions.last_page);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (index, newStatus) => {
    const data = { forum_id: forumsData[index].id, status: newStatus };
    try {
      const response = await updateForumStatus(data);

      // Update the local forumsData state with the new status
      const updatedForumsData = [...forumsData];
      updatedForumsData[index].status = newStatus;
      setForumsData(updatedForumsData);
      toast.success('Status updated successfully.');
    } catch (error) {
      console.error('There was an error updating the status!', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <ContentHeader title="Forum" subtitle="Questions" />
      {loading ? (
        <ContentLoader />
      ) : (
        forumsData &&
        (forumsData.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
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
                            Question
                          </th>
                          <th className="border-0" scope="col">
                            Asked By
                          </th>
                          <th className="border-0" scope="col">
                            Asked At
                          </th>
                          <th className="border-0" scope="col">
                            Status
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
                        {forumsData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{item.question}</strong>
                            </td>
                            <td>{item.student_name}</td>
                            <td>{formatDateTime(item.created_at)}</td>
                            <td>
                              <select
                                value={item.status}
                                onChange={(e) =>
                                  handleStatusChange(index, e.target.value)
                                }
                                className={`badge p-1 text-white ${
                                  item.status == 0 ? 'bg-danger' : 'bg-success'
                                }`}
                              >
                                <option value="0">Deactive</option>
                                <option value="1">Active</option>
                              </select>
                            </td>
                            <td className="text-right">
                              <Link
                                to={`${item.id}/answers`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i>
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

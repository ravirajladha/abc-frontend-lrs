import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ContentHeader,
  ContentLoader,
  ContentFallback,
} from '@/components/common';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getInternships, deleteInternship } from '@/api/admin';
function Internship({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [InternshipsData, setInternshipsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getInternships();
      console.log('resp', response.internships);
      setInternshipsData(response.internships);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteInternship(id);
      // Remove the deleted entry from the participants state
      setInternshipsData((prevParticipants) =>
        prevParticipants.filter((participant) => participant.id !== id)
      );
      toast.success('Internship Deleted Successfully');
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  return (
    <div>
      <ContentHeader
        title="Internships"
        buttons={[
          {
            link: 'create',
            text: 'New Project',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        InternshipsData &&
        (InternshipsData.length > 0 ? (
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
                            Name
                          </th>
                          <th className="border-0" scope="col">
                            Subject
                          </th>
                          {/* <th className="border-0" scope="col">
                            Subject
                          </th> */}
                          <th className="border-0" scope="col">
                            Image
                          </th>
                          <th className="border-0" scope="col">
                            Participant
                          </th>
                          <th className="border-0" scope="col">
                            Internship Task
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
                        {InternshipsData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{item.name}</strong>
                            </td>
                            <td>{item.subject_name}</td>
                            {/* <td>{item.subject_name}</td> */}
                            <td>
                              {' '}
                              {/* Column for the image */}
                              {item.image && ( // Check if there's an image URL
                                <img
                                  src={baseUrl + item.image}
                                  alt="Internship Image"
                                  style={{ width: '50px', height: 'auto' }}
                                />
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/admin/internship/${item.id}/participants`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i> View (
                                {item.participant_count})
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/admin/internship-tasks/${item.id}`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i> View (
                                {item.task_count})
                              </Link>
                            </td>
                            <td>
                              {item.is_active ? (
                                <span className="badge badge-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td className="text-right">
                              {/* edit, active /deactive pending */}
                              {/* <Link
                                to={`/`}
                                className="btn btn-outline-secondary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-book"></i>
                              </Link>
                              <Link
                                to={``}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
                              </Link> */}

                              <Link
                                to={`/admin/internship/${item.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
                              </Link>
                              <button
                                onClick={() => handleDelete(item.id)} // Pass the id to the handleDelete function
                                className="btn btn-outline-danger btn-icon btn-sm mr-2"
                              >
                                <i className="feather-trash"></i>
                              </button>
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
    </div>
  );
}

Internship.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Internship;

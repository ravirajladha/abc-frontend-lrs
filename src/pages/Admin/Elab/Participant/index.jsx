import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ContentHeader, ContentLoader, UcFirst } from '@/components/common';
import { Link } from 'react-router-dom';
import {
  getElabParticipants,
  deleteElabParticipantCodeBase,
} from '@/api/admin';
import { useParams } from 'react-router-dom';
import { formatDateTime, formatVideoTimestamp } from '@/utils/helpers';

function Participants({ title }) {
  const [elabs, setElabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { elabId } = useParams();
  // console.log("elabid", elabId);
  useEffect(() => {
    getElabParticipants(elabId)
      .then((response) => {
        if (response && response.elabs) {
          setElabs(response.elabs);
        } else {
          setError(new Error('Invalid response structure'));
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [elabId]); // Make sure to include elabId in the dependency array to fetch data when it changes

  // Define a function to handle deletion
  const handleDelete = async (id) => {
    try {
      await deleteElabParticipantCodeBase(id);
      // Remove the deleted entry from the elabs state
      setElabs(elabs.filter((elab) => elab.id !== id));
    } catch (error) {
      setError(error);
    }
  };
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  // console.log("elabs", data)
  // if (error) return <div>Error: {error.message}</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ContentHeader
        title="All"
        subtitle="Elab Participants"
        buttons={[
          {
            link: 'create',
            text: 'New eLab',
          },
        ]}
      />
      <div className="row">
        {loading ? (
          <div className="text-center col-12">
            <ContentLoader />
          </div>
        ) : elabs && elabs.length > 0 ? (
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body d-flex pt-4 px-4 pb-0">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">{title}</h4>
                <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                  <option>Sort by latest</option>
                </select>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-admin mb-0 ">
                    <thead className="bg-greylight rounded-10">
                      <tr>
                        <th className="border-0" scope="col">
                          #
                        </th>
                        <th className="border-0" scope="col">
                          student
                        </th>
                        <th className="border-0" scope="col">
                          Memory (in kb)
                        </th>
                        <th className="border-0" scope="col">
                          time taken
                        </th>
                        <th className="border-0" scope="col">
                          start time
                        </th>
                        <th className="border-0" scope="col">
                          Language
                        </th>
                        <th scope="col" className="text-right border-0 pl-1">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {elabs.map((elab, index) => (
                        <tr key={elab.id}>
                          <td>{index + 1}</td> {/* Serial number */}
                          <td>
                            <strong>
                              {/* <UcFirst text={elab.elab_id} /> */}
                              {elab.student_id}
                            </strong>
                          </td>
                          <td>
                            {elab.execution_time}
                            {elab.memory}
                          </td>
                          <td>{formatTime(elab.time_taken)}</td>
                          <td>{formatDateTime(elab.created_at)}</td>
                          <td>
                            {/* {elab.code_language === 0 && 'Java'}
                            {elab.code_language === 1 && 'Python'}
                            {elab.code_language === 2 && 'C'}
                            {elab.code_language === 3 && 'SQL'} */}
                            Java
                          </td>
                          <td className="text-right">
                            {/* <Link
                              to={elab.id}
                              disabled
                              className="btn btn-outline-warning btn-icon btn-sm mr-2"
                            >
                              <i className="feather-eye"></i>
                            </Link> */}
                            <Link
                              to={
                                '/admin/elab/check-code/1/1/' +
                                elab.elab_id +
                                '/' +
                                elab.id
                              }
                              className="btn btn-outline-primary btn-icon btn-sm mr-2"
                            >
                              <i className="feather-eye"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(elab.id)} // Pass the id to the handleDelete function
                              className="btn btn-outline-danger btn-icon btn-sm mr-2"
                            >
                              <i className="feather-trash"></i>
                            </button>

                            {/* <Link
                              to="#"
                              className="btn btn-outline-danger btn-icon btn-sm"
                            >
                              <i className="feather-trash"></i>
                            </Link> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
              There are no elabs available at the moment.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Participants.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Participants;

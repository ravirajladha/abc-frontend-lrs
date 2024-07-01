import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMiniProjectParticipants,deleteMiniProjectParticipant } from '@/api/admin';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  ContentHeader,
  ContentLoader,
  ContentFallback,
} from '@/components/common';
function MiniProjectParticipants() {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const { miniProjectId } = useParams();
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await getMiniProjectParticipants(miniProjectId);
        console.log('response from inside the function', response);
        setParticipants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    if (miniProjectId) {
      fetchParticipants(miniProjectId);
    }
  }, [miniProjectId]);


  const handleDelete = async (id) => {
    try {
      await deleteMiniProjectParticipant(id);
      // Remove the deleted entry from the participants state
      setParticipants(prevParticipants => prevParticipants.filter(participant => participant.id !== id)); // Update state after deletion
      toast.success("Participants deleted successfully");

    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };
  // console.log("elabs", data)
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ContentHeader
        title="Mini Projects Participants"
        // buttons={[
        //   {
        //     link: 'create',
        //     text: 'New Project',
        //   },
        // ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        participants &&
        (participants.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {/* {title} */}
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
                          <th>Student ID</th>
                          {participants.length > 0 &&
                            participants[0].task_presence.map((task, index) => (
                              <th key={index}>Task {index + 1}</th>
                            ))}

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
                        {participants.map((participant, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{participant.student_name}</strong>
                            </td>
                            {participant.task_presence.map(
                              (task, taskIndex) => (
                                <td
                                  key={taskIndex}
                                  style={{
                                    color:
                                      task.status === 'Completed'
                                        ? 'green'
                                        : 'red',
                                  }}
                                >
                                  
                                  {task.status === 'Completed' ? (
                                    <Link
                                      to={`/admin/elab/check-code/1/1/${task.elab_id}/${task.elab_submission_id}`}
                                      className="btn btn-outline-warning btn-icon btn-sm mr-2"
                                    >
                                      <i className="feather-eye"></i>
                                    </Link>
                                  ) : (
                                    task.status
                                  )}
                                </td>
                              )
                            )}

                            <td className="text-right">
                           
                          
                              <button
                              onClick={() => handleDelete(participant.id)} // Pass the id to the handleDelete function
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

MiniProjectParticipants.propTypes = {
  miniProjectId: PropTypes.number,
};

export default MiniProjectParticipants;

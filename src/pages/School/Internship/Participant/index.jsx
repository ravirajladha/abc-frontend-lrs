import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ContentHeader,
  ContentLoader,
  ContentFallback,
} from '@/components/common';

const InternshipParticipants = () => {
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const { internshipId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data
    const mockParticipants = [
      { id: 1, student_name: 'John Doe', work_progress: 80, started_at: '01/07/2024 10:00', completed_at: '10/07/2024 15:00' },
      { id: 2, student_name: 'Jane Smith', work_progress: 90, started_at: '02/07/2024 11:00', completed_at: '11/07/2024 16:00' },
      { id: 3, student_name: 'Alice Johnson', work_progress: 75, started_at: '03/07/2024 12:00', completed_at: '12/07/2024 17:00' },
      { id: 4, student_name: 'Bob Brown', work_progress: 60, started_at: '04/07/2024 13:00', completed_at: '13/07/2024 18:00' },
      { id: 5, student_name: 'Charlie Davis', work_progress: 85, started_at: '05/07/2024 14:00', completed_at: '14/07/2024 19:00' },
    ];
    setParticipants(mockParticipants);
  }, [internshipId]);

  const handleDelete = (id) => {
    setParticipants(prevParticipants => prevParticipants.filter(participant => participant.id !== id));
    toast.success("Participant deleted successfully");
  };

  return (
    <div>
      <ContentHeader
        title="Internship Participants"
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
                    <table className="table table-admin mb-0">
                      <thead className="bg-greylight rounded-10">
                        <tr>
                          <th className="border-0" scope="col">#</th>
                          <th className="border-0" scope="col">Student Name</th>
                          <th className="border-0" scope="col">Progress</th>
                          <th className="border-0" scope="col">Started At</th>
                          <th className="border-0" scope="col">Completed At</th>
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
                            <td>
                              {participant.work_progress}%
                            </td>
                            <td>
                              {participant.started_at}
                            </td>
                            <td>
                              {participant.completed_at}
                            </td>
                            <td className="text-right">
                              <Link
                                to={`1/progress`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i> View
                              </Link>
                              <button
                                onClick={() => handleDelete(participant.id)}
                                className="btn btn-outline-danger btn-icon btn-sm mr-2"
                              >
                                <i className="feather-trash"></i> Delete
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
};

InternshipParticipants.propTypes = {
  internshipId: PropTypes.number,
};

export default InternshipParticipants;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ContentHeader, ContentLoader, ContentFallback  } from '@/components/common';
import {  useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllInternshipTasks ,deleteInternshipTask} from '@/api/admin';

function InternshipTasks({ title }) {
  const [internshiptData, setInternshipDataa] = useState([]);
  const [internshipTasksData, setInternshipTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { internshipId } = useParams();
  // getMiniProjectTasksByinternshipId

  const fetchData = async () => {
    try {
      const response = await getAllInternshipTasks(internshipId);
      console.log("resonspse from insdie", response);
      setInternshipTasksData(response.internship_tasks);
      setInternshipDataa(response.internship);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const handleDelete = async (id) => {
    try {
      await deleteInternshipTask(id);
      // Remove the deleted entry from the participants state
      setInternshipTasksData(prevParticipants => prevParticipants.filter(participant => participant.id !== id)); // Update state after deletion
      toast.success("Internship Task deleted successfully");
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  return (
    <div>
      <ContentHeader
        title="Internship Tasks"
        buttons={[
          {
            link: 'create',
            text: 'New Task',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        internshipTasksData &&
        (internshipTasksData.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title} : {internshiptData.name}

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
                            Description
                          </th>
                          <th className="border-0" scope="col">
                            Elab
                          </th>
                          <th className="border-0" scope="col">
                            Status
                          </th>
                          <th scope="col" className="text-right border-0 pl-1" width="20%">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {internshipTasksData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                           
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.elab_name}</td>
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
                             {/* edit pending, disable and active pending */}
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
                                to={`edit/${item.id}`}
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

InternshipTasks.propTypes = {
  title: PropTypes.string.isRequired,
};

export default InternshipTasks;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ContentHeader,
  ContentLoader,
  ContentFallback,
} from '@/components/common';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Internship = ({ title }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const staticInternshipsData = [
    {
      id: 1,
      name: 'Internship 1',
      class_name: 'Class A',
      image: '/path/to/image1.jpg',
      participant_count: 10,
      task_count: 5,
      is_active: true,
    },
    {
      id: 2,
      name: 'Internship 2',
      class_name: 'Class B',
      image: '/path/to/image2.jpg',
      participant_count: 15,
      task_count: 7,
      is_active: false,
    },
    {
      id: 3,
      name: 'Internship 3',
      class_name: 'Class C',
      image: '/path/to/image3.jpg',
      participant_count: 12,
      task_count: 6,
      is_active: true,
    },
    {
      id: 4,
      name: 'Internship 4',
      class_name: 'Class D',
      image: '/path/to/image4.jpg',
      participant_count: 8,
      task_count: 4,
      is_active: false,
    },
    {
      id: 5,
      name: 'Internship 5',
      class_name: 'Class E',
      image: '/path/to/image5.jpg',
      participant_count: 20,
      task_count: 9,
      is_active: true,
    },
    {
      id: 6,
      name: 'Internship 6',
      class_name: 'Class F',
      image: '/path/to/image6.jpg',
      participant_count: 18,
      task_count: 8,
      is_active: true,
    },
    {
      id: 7,
      name: 'Internship 7',
      class_name: 'Class G',
      image: '/path/to/image7.jpg',
      participant_count: 14,
      task_count: 6,
      is_active: false,
    },
    {
      id: 8,
      name: 'Internship 8',
      class_name: 'Class H',
      image: '/path/to/image8.jpg',
      participant_count: 22,
      task_count: 10,
      is_active: true,
    },
    {
      id: 9,
      name: 'Internship 9',
      class_name: 'Class I',
      image: '/path/to/image9.jpg',
      participant_count: 17,
      task_count: 7,
      is_active: false,
    },
    {
      id: 10,
      name: 'Internship 10',
      class_name: 'Class J',
      image: '/path/to/image10.jpg',
      participant_count: 19,
      task_count: 8,
      is_active: true,
    },
    {
      id: 11,
      name: 'Internship 11',
      class_name: 'Class K',
      image: '/path/to/image11.jpg',
      participant_count: 25,
      task_count: 12,
      is_active: true,
    },
  ];

  const [InternshipsData, setInternshipsData] = useState(staticInternshipsData);

  const handleDelete = (id) => {
    setInternshipsData((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== id)
    );
    toast.success('Internship Deleted Successfully');
  };

  return (
    <div>
      <ContentHeader
        title="Internships"
        // buttons={[
        //   {
        //     link: 'create',
        //     text: 'New Project',
        //   },
        // ]}
      />
      {InternshipsData && InternshipsData.length > 0 ? (
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
                     
                        <th className="border-0" scope="col">
                          Participants
                        </th>
                        <th className="border-0" scope="col">
                     Tasks
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
                          <td>{item.class_name}</td>
                          
                          <td>
                            <Link
                              to={`/internship-admin/internship/${item.id}/participants`}
                              className="btn btn-outline-warning btn-icon btn-sm mr-2"
                            >
                              <i className="feather-eye"></i> View (
                              {item.participant_count})
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/internship-admin/internship/1/tasks`}
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
                            {/* <Link
                              to={`/admin/internship/${item.id}/edit`}
                              className="btn btn-outline-primary btn-icon btn-sm mr-2"
                            >
                              <i className="feather-edit"></i>
                            </Link> */}
                            <button
                              onClick={() => handleDelete(item.id)}
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
      )}
    </div>
  );
};

Internship.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Internship;

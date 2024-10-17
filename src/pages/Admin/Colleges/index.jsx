import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchColleges, updateCollegeStatus } from '@/api/admin';
import { toast } from 'react-toastify';

const Colleges = ({ title }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = async (collegeId, newStatus) => {
    try {
      // Update the status using the API call
      const response = await updateCollegeStatus(collegeId, newStatus);
      toast.success('College status updated successfully');
      
      // Update the local state to reflect the change
      setColleges((prevColleges) =>
        prevColleges.map((college) =>
          college.id === collegeId ? { ...college, status: newStatus } : college
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetchColleges();
      setColleges(response.colleges);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <ContentLoader />;
  return (
    <div>
      <ContentHeader
        title="All"
        subtitle={title}
        buttons={[
          {
            link: 'create',
            text: 'New College',
          },
        ]}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card border-0 mt-0 rounded-lg shadow-sm">
            <div className="card-body d-flex pt-4 px-4 pb-0">
              <h4 className="font-xss text-grey-800 mt-3 fw-700">{title}</h4>
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
                        city
                      </th>
                      <th className="border-0" scope="col">
                        state
                      </th>
                      <th className="border-0" scope="col">
                        Address
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
                    {colleges && colleges.length > 0 ? (
                      colleges.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{item.name}</strong>
                          </td>
                          <td>{item.city}</td>
                          <td>{item.state}</td>
                          <td>{item.address}</td>
                          <td>
                            {' '}
                            <select
                              value={item.status}
                              onChange={(e) =>
                                handleStatusChange(item.id, e.target.value)
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
                            <div className="d-flex flex-wrap justify-content-end">
                              <Link
                                to={`${item.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2 mb-2"
                              >
                                <i className="feather-edit"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <ContentFallback />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;

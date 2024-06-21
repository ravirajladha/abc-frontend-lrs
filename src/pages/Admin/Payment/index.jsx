import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { fetchTransactions } from '@/api/admin';
import { formatDateTime } from '@/utils/helpers';

function Payment({ title }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchTransactions();
      setTransactions(response.transactions);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ContentHeader
        title="Payments"
        // buttons={[
        //   {
        //     link: `create`,
        //     text: 'New Payment',
        //   },
        // ]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        transactions &&
        (transactions.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
                  <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                    <option>Sort by latest</option>
                  </select>
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
                            Phone Number
                          </th>
                          <th className="border-0" scope="col">
                            Email
                          </th>
                          <th className="border-0" scope="col">
                            Transaction Id
                          </th>
                          <th className="border-0" scope="col">
                            Amount
                          </th>
                          <th className="border-0" scope="col">
                            Status
                          </th>
                          <th className="border-0" scope="col">
                            IP Address
                          </th>
                          <th className="border-0" scope="col">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{item.student_name}</strong>
                            </td>
                            <td>
                              <strong>{item.phone_number}</strong>
                            </td>
                            <td>
                              <strong>{item.email}</strong>
                            </td>
                            <td>{item.transaction_id}</td>
                            <td>{item.amount}</td>
                            <td className='text-success'>{item.status}</td>
                            <td>{item.ip_address}</td>
                            <td>{formatDateTime(item.created_at)}</td>
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

Payment.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Payment;

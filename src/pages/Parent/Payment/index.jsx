import React from 'react';
import PropTypes from 'prop-types';
import { ContentHeader } from '@/components/common';
import { Link } from 'react-router-dom';

function Payment({ title }) {
  return (
    <>
      <ContentHeader
        title="Payments"
        buttons={[
          {
            link: `create`,
            text: 'New Payment',
          },
        ]}
      />
      <div className="row">
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
                  <thead className="bg-greylight rounded-10 ">
                    <tr>
                      <th className="border-0" scope="col">
                        #
                      </th>
                      <th className="border-0" scope="col">
                        Name
                      </th>
                      <th className="border-0" scope="col">
                        Class
                      </th>
                      <th className="border-0" scope="col">
                        Section
                      </th>
                      <th className="border-0" scope="col">
                        Amount
                      </th>
                      <th className="border-0" scope="col">
                        Date
                      </th>
                      <th className="border-0" scope="col">
                        School Name
                      </th>
                      {/* <th scope="col" className="text-right border-0 pl-1" width="20%">
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>
                        <strong>Name</strong>
                      </td>
                      <td>Class 6</td>
                      <td>A</td>
                      <td>9999</td>
                      <td>29/3/2024</td>
                      <td>Agasthya Vidyanikethan</td>
                      {/* <td className="text-right">
                        <Link
                          to="1/edit"
                          className="btn btn-outline-primary btn-icon btn-sm mr-2"
                        >
                          <i className="feather-edit"></i>
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-outline-danger btn-icon btn-sm"
                        >
                          <i className="feather-trash"></i>
                        </Link>
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Payment.propTypes = {
  title: PropTypes.string,
};

export default Payment;

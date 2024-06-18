import React from 'react';
import { Link } from 'react-router-dom';

const OldApplicationTable = ({
  applications,
  changeApplicationStatus,
  handleWhatsappClick,
  handleAddRemark,
  tableRef,
  isValidNumber,
  setMessage = { setMessage },
  handleCheckboxChange,
  handleSelectAllChange,
  selectedIds,
}) => {
  // Your helper functions or logic here

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card border-0 mt-0 rounded-lg shadow-sm">
          <div className="card-body d-flex pt-4 px-4 pb-0"></div>
          <div className="card-body p-4">
            <h4 className="mont-font fw-400 font-xss fw-500 mb-4">
              Old Applications
            </h4>
            <div className="table-responsive">
              <table ref={tableRef} className="table table-admin mb-0 ">
                <thead className="bg-greylight rounded-10 ">
                  <tr>
                    <th scope="col" className="border-0">
                      {/* Checkbox for "Select All" */}
                      Select All{' '}
                      <input
                        type="checkbox"
                        checked={selectedIds.length === applications.length}
                        onChange={handleSelectAllChange}
                      />
                    </th>
                    <th scope="col" className="border-0">
                      Sl. No.
                    </th>
                    <th scope="col" className="border-0">
                      Month
                    </th>
                    <th scope="col" className="border-0">
                      Year
                    </th>
                    <th scope="col" className="border-0">
                      Enquiry Date
                    </th>
                    <th scope="col" className="border-0">
                      Student Name
                    </th>
                    <th scope="col" className="border-0">
                      Enquiry Class
                    </th>
                    <th scope="col" className="border-0">
                      2024-25 Yr. Class Expected
                    </th>
                    <th scope="col" className="border-0">
                      DOB
                    </th>
                    <th scope="col" className="border-0">
                      Father Name
                    </th>
                    <th scope="col" className="border-0">
                      Mother Name
                    </th>
                    <th scope="col" className="border-0">
                      F-Contact No
                    </th>
                    <th scope="col" className="border-0">
                      M-Contact No
                    </th>
                    <th scope="col" className="border-0">
                      Address
                    </th>
                    <th scope="col" className="border-0">
                      Status
                    </th>
                    <th scope="col" className="border-0">
                      Heard About Us ?
                    </th>
                    <th scope="col" className="border-0">
                      Previous Schooling Details
                    </th>
                    <th scope="col" className="border-0">
                      Application Date
                    </th>
                    <th scope="col" className="border-0">
                      Admission Date
                    </th>
                    <th scope="col" className="border-0">
                      Admission Enquiry for{' '}
                    </th>
                    <th scope="col" className="border-0">
                      Data
                    </th>
                    <th scope="col" className="border-0">
                      Age as on 01/06/2023
                    </th>
                    <th scope="col" className="border-0">
                      Entrance Test date
                    </th>
                    <th scope="col" className="border-0">
                      Entrance Test result
                    </th>
                    <th scope="col" className="border-0">
                      Remarks
                    </th>
                    <th scope="col" className="border-0">
                      Data
                    </th>
                    <th scope="col" className="border-0">
                      Already Enrolled
                    </th>
                    <th scope="col" className="border-0">
                      Actions
                    </th>
                    <th scope="col" className="border-0">
                      Message
                    </th>
                    <th scope="col" className="border-0">
                      Remarks
                    </th>
                    <th scope="col" className="border-0">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        {/* Checkbox for selecting individual rows */}
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(application.id)}
                          onChange={() =>
                            handleCheckboxChange(
                              application.id,
                              isValidNumber(application.f_contact)
                                ? application.f_contact
                                : isValidNumber(application.m_contact)
                                ? application.m_contact
                                : ''
                            )
                          }
                        />
                      </td>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {application?.month ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.year ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.enquiry_date ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_name ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.enquiry_class ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.class_expected_in_2024_25 ?? '-'}
                      </td>
                      <td className="text-center">{application?.dob ?? '-'}</td>
                      <td className="text-center">
                        {application?.f_name ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_name ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.f_contact ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_contact ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.address ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.status ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.heard_about_us ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.prev_school ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.application_date ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.admission_date ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.admission_enquiry_for ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.data ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.age_as_01_06_2023 ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.entrance_test_date ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.entrance_test_result ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.remarks ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.data_2 ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.already_enrolled ?? '-'}
                      </td>
                      <td className="text-center">
                        <select
                          className="px-0 py-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                          value={application.application_status}
                          onChange={(e) =>
                            changeApplicationStatus(index, +e.target.value)
                          }
                          aria-label="Select status"
                        >
                          <option className="bg-light text-dark" value="0">
                            Pending
                          </option>
                          <option className="bg-light text-dark" value="1">
                            School visit scheduled
                          </option>
                          <option className="bg-light text-dark" value="2">
                            Approved
                          </option>
                          <option className="bg-light text-dark" value="3">
                            Admitted
                          </option>
                          <option className="bg-light text-dark" value="4">
                            Waiting List
                          </option>
                          <option className="bg-light text-dark" value="5">
                            Black List
                          </option>
                        </select>
                      </td>
                      <td className="text-center">
                        {isValidNumber(application.f_contact) ||
                        isValidNumber(application.m_contact) ? (
                          <>
                            <select
                              className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                              onChange={(e) => setMessage(e.target.value)}
                              aria-label="Select status"
                            >
                              <option
                                className={`${
                                  application.whatsapp_status === 1
                                    ? 'bg-dark text-light'
                                    : 'bg-light text-dark'
                                }`}
                                value="1"
                              >
                                Message 1
                              </option>
                              <option
                                className={`${
                                  application.whatsapp_status_2 === 1
                                    ? 'bg-dark text-light'
                                    : 'bg-light text-dark'
                                }`}
                                value="2"
                              >
                                Message 2
                              </option>
                            </select>
                            <img
                              src="/assets/images/applications/whatsapp.png"
                              alt="icon"
                              width={30}
                              className="d-inline-block"
                              onClick={() =>
                                handleWhatsappClick(
                                  index,
                                  isValidNumber(application.f_contact)
                                    ? application.f_contact
                                    : isValidNumber(application.m_contact)
                                    ? application.m_contact
                                    : null
                                )
                              }
                            />
                          </>
                        ) : null}
                      </td>
                      <td>
                        <button
                          className="p-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss ls-3 bg-primary border-0"
                          onClick={() => handleAddRemark(application.id)}
                        >
                          Remark
                        </button>
                      </td>
                      <td className="text-center">
                        <Link to={`${application.id}/view`}>View</Link>
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
  );
};

export default OldApplicationTable;

import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationTable = ({
  applications,
  changeApplicationStatus,
  handleWhatsappClick,
  handleAddRemark,
  tableRef,
  isValidNumber,
  setMessage,
  handleCheckboxChange,
  handleSelectAllChange,
  selectedIds,
}) => {
  // Your helper functions or logic here

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card border-0 mt-0 rounded-lg shadow-sm">
          <div className="card-body p-4">
            <h4 className="mont-font fw-400 font-xss fw-500 mb-4">
              New Applications
            </h4>
            <div className="table-responsive">
              <table ref={tableRef} className="table table-admin mb-0">
                <thead className="bg-greylight rounded-10">
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
                      Enquired At
                    </th>
                    <th scope="col" className="border-0">
                      Student Full Name
                    </th>
                    <th scope="col" className="border-0">
                      Class Name
                    </th>
                    <th scope="col" className="border-0">
                      Father Name
                    </th>
                    <th scope="col" className="border-0">
                      Mother Name
                    </th>
                    <th scope="col" className="border-0">
                      Student DOB
                    </th>
                    <th scope="col" className="border-0">
                      Father Designation
                    </th>
                    <th scope="col" className="border-0">
                      Father Email
                    </th>
                    <th scope="col" className="border-0">
                      Father Mobile
                    </th>
                    <th scope="col" className="border-0">
                      Father Qualification
                    </th>
                    <th scope="col" className="border-0">
                      Father Telephone
                    </th>
                    <th scope="col" className="border-0">
                      Mother Designation
                    </th>
                    <th scope="col" className="border-0">
                      Mother Email
                    </th>
                    <th scope="col" className="border-0">
                      Mother Mobile
                    </th>
                    <th scope="col" className="border-0">
                      Mother Qualification
                    </th>
                    <th scope="col" className="border-0">
                      Mother Telephone
                    </th>
                    <th scope="col" className="border-0">
                      Residential Address
                    </th>
                    <th scope="col" className="border-0">
                      Residential Phone
                    </th>
                    <th scope="col" className="border-0">
                      Student Blood Group
                    </th>
                    <th scope="col" className="border-0">
                      Student Caste
                    </th>
                    <th scope="col" className="border-0">
                      Student Gender
                    </th>
                    <th scope="col" className="border-0">
                      Student Mother Tongue
                    </th>
                    <th scope="col" className="border-0">
                      Student Nationality
                    </th>
                    <th scope="col" className="border-0">
                      Student Religion
                    </th>
                    <th scope="col" className="border-0">
                      Last School Name
                    </th>
                    <th scope="col" className="border-0">
                      Branch
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
                              isValidNumber(application.f_mob)
                                ? application.f_mob
                                : isValidNumber(application.m_mob)
                                ? application.m_mob
                                : ''
                            )
                          }
                        />
                      </td>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {application?.enquired_at ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_fname ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.classname ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.fname ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_name ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_dob ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.f_desig ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.f_email ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.f_mob ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.f_qual ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.f_tel ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_desig ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_email ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_mob ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_qual ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.m_tel ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.res_add ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.res_phone ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_blood_group ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_caste ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_gender ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_mt ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_nationality ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.student_religion ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.last_school_name ?? '-'}
                      </td>
                      <td className="text-center">
                        {application?.branch ?? '-'}
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
                        {isValidNumber(application.f_mob) ||
                        isValidNumber(application.m_mob) ? (
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
                                  isValidNumber(application.f_mob)
                                    ? application.f_mob
                                    : isValidNumber(application.m_mob)
                                    ? application.m_mob
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

export default ApplicationTable;

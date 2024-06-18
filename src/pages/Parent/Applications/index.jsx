import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchApplications } from '@/api/parent';
import { getUserDataFromLocalStorage } from '@/utils/services';

function Applications() {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const parentPhone = userData.phone_number;
  const [applications, setApplications] = useState([]);
  const [oldApplications, setOldApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchApplications(parentPhone);
      setApplications(response.data.applications);
      setOldApplications(response.data.oldApplications);
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
    <div>
      <ContentHeader title="Student" subtitle="Applications" />
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          {applications && applications.length > 0 ? (
            <ContentCardWrapper>
              <h4 className="mont-font fw-400 font-xss fw-500 mb-4">
                New Applications
              </h4>
              <div className="table-responsive">
                <table className="table table-admin mb-0">
                  <thead className="bg-greylight rounded-10">
                    <tr>
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
                        Father Blood Group
                      </th>
                      <th scope="col" className="border-0">
                        Father Company
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
                        Father Annual Income
                      </th>
                      <th scope="col" className="border-0">
                        Father Telephone
                      </th>
                      <th scope="col" className="border-0">
                        Father Aadhaar
                      </th>
                      <th scope="col" className="border-0">
                        Mother Blood Group
                      </th>
                      <th scope="col" className="border-0">
                        Mother Company
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
                        Mother Annual Income
                      </th>
                      <th scope="col" className="border-0">
                        Mother Telephone
                      </th>
                      <th scope="col" className="border-0">
                        Mother Aadhaar
                      </th>
                      <th scope="col" className="border-0">
                        Relative Name
                      </th>
                      <th scope="col" className="border-0">
                        Relative Phone
                      </th>
                      <th scope="col" className="border-0">
                        Relationship with Child
                      </th>
                      <th scope="col" className="border-0">
                        Residential Address
                      </th>
                      <th scope="col" className="border-0">
                        Residential Phone
                      </th>
                      <th scope="col" className="border-0">
                        Student Aadhaar
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
                        Student Nick Name
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
                        Distance Between School And Residence
                      </th>
                      <th scope="col" className="border-0">
                        Issues
                      </th>
                      <th scope="col" className="border-0">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application, index) => (
                      <tr key={index}>
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
                          {application?.f_bld ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.f_comp ?? '-'}
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
                          {application?.f_sal ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.f_tel ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.f_aadhar ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.m_bld ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.m_comp ?? '-'}
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
                          {application?.m_sal ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.m_tel ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.m_adhar ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.rel_name ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.rel_phone ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.relation_ch ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.res_add ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.res_phone ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.student_aadhaar ?? '-'}
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
                          {application?.student_pname ?? '-'}
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
                          {application?.des ?? '-'}
                        </td>
                        <td className="text-center">
                          {application?.issues ?? '-'}
                        </td>
                        <td>
                          <button
                            className={`p-2 text-white fw-700 rounded-lg text-center font-xsssss ls-3 border-0 ${
                              application.application_status === 1
                                ? 'bg-secondary'
                                : application.application_status === 2
                                ? 'bg-success'
                                : application.application_status === 3
                                ? 'bg-info'
                                : application.application_status === 4
                                ? 'bg-warning'
                                : application.application_status === 5
                                ? 'bg-danger'
                                : 'bg-primary'
                            }`}
                          >
                            {application.application_status === 1
                              ? 'School visit scheduled'
                              : application.application_status === 2
                              ? 'Approved'
                              : application.application_status === 3
                              ? 'Admitted'
                              : application.application_status === 4
                              ? 'Waiting List'
                              : application.application_status === 5
                              ? 'Black List'
                              : 'Pending'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ContentCardWrapper>
          ) : (
            ''
          )}

          {oldApplications && oldApplications.length > 0 ? (
            <ContentCardWrapper>
              <h4 className="mont-font fw-400 font-xss fw-500 mb-4">
                Old Applications
              </h4>
              <div className="table-responsive">
                <table className="table table-admin mb-0 ">
                  <thead className="bg-greylight rounded-10 ">
                    <tr>
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
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {oldApplications.map((application, index) => (
                      <tr key={index}>
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
                        <td className="text-center">
                          {application?.dob ?? '-'}
                        </td>
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
                        <td>
                          <button
                            className={`p-2 text-white fw-700 rounded-lg text-center font-xsssss ls-3 border-0 ${
                              application.application_status === 1
                                ? 'bg-secondary'
                                : application.application_status === 2
                                ? 'bg-success'
                                : application.application_status === 3
                                ? 'bg-info'
                                : application.application_status === 4
                                ? 'bg-warning'
                                : application.application_status === 5
                                ? 'bg-danger'
                                : 'bg-primary'
                            }`}
                          >
                            {application.application_status === 1
                              ? 'School visit scheduled'
                              : application.application_status === 2
                              ? 'Approved'
                              : application.application_status === 3
                              ? 'Admitted'
                              : application.application_status === 4
                              ? 'Waiting List'
                              : application.application_status === 5
                              ? 'Black List'
                              : 'Pending'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ContentCardWrapper>
          ) : (
            ''
          )}

          {applications &&
          applications.length === 0 &&
          oldApplications &&
          oldApplications.length === 0 ? (
            <ContentFallback />
          ) : null}
        </>
      )}
      <ContentCardWrapper>
        <div className="row">
          <div className="col-lg-12">
            <h2 className="text-grey-900 font-md mb-2">
              <span className="fw-600">Important</span> Information
            </h2>
            <ul style={{ marginLeft: '20px' }}>
              <li>▪ Original Copy of the Birth Certificate.</li>
              <li>
                ▪ Xerox Copy of the Immunization (vaccine) record (Original must
                be brought along for verification).
              </li>
              <li>
                ▪ Xerox Copy of the Caste &amp; Income Certificate of both Child
                &amp; Parents.
              </li>
              <li>
                ▪ Xerox Copy of Student's individual Bank Account Pass Book.
              </li>
              <li>▪ Xerox Copy of Aadhar Card of both Child &amp; Parents.</li>
              <li>▪ 4 Passport Size Photos of the Child.</li>
              <li>▪ 2 Stamp Size Photos of the Child.</li>
            </ul>
          </div>
        </div>
      </ContentCardWrapper>
    </div>
  );
}

export default Applications;

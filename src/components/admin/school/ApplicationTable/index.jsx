import PropTypes from 'prop-types';

import './style.css';

const ApplicationTable = ({ applications, tableRef }) => {
  return (
    <div className="table-responsive">
      <table ref={tableRef} className="table table-admin mb-0">
        <thead className="bg-greylight rounded-10">
          <tr>
            <th scope="col" className="border-0">
              Sl. No.
            </th>
            <th scope="col" className="border-0">
              Enquired At
            </th>
            <th scope="col" className="border-0">
              Name
            </th>
            <th scope="col" className="border-0">
              Class Name
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Name
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Name
            </th>
            <th scope="col" className="border-0">
              Student&apos;s DOB
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Blood Group
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Company
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Designation
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Email
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Mobile
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Qualification
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Annual Income
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Tel
            </th>
            <th scope="col" className="border-0">
              Father&apos;s Aadhaar
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Blood Group
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Company
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Designation
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Email
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Mobile
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Qualification
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Annual Income
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Telephone
            </th>
            <th scope="col" className="border-0">
              Mother&apos;s Aadhaar
            </th>
            <th scope="col" className="border-0">
              Relative&apos;s Name
            </th>
            <th scope="col" className="border-0">
              Relative&apos;s Phone
            </th>
            <th scope="col" className="border-0">
              Relationship
            </th>
            <th scope="col" className="border-0">
              Residential Address
            </th>
            <th scope="col" className="border-0">
              Residential Phone
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Aadhaar
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Blood Group
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Caste
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Gender
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Mother Tongue
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Nationality
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Nick Name
            </th>
            <th scope="col" className="border-0">
              Student&apos;s Religion
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
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{application?.enquired_at ?? '-'}</td>
              <td className="text-center">
                {application?.student_fname ?? '-'}
              </td>
              <td className="text-center">{application?.classname ?? '-'}</td>
              <td className="text-center">{application?.fname ?? '-'}</td>
              <td className="text-center">{application?.m_name ?? '-'}</td>
              <td className="text-center">{application?.student_dob ?? '-'}</td>
              <td className="text-center">{application?.f_bld ?? '-'}</td>
              <td className="text-center">{application?.f_comp ?? '-'}</td>
              <td className="text-center">{application?.f_desig ?? '-'}</td>
              <td className="text-center">{application?.f_email ?? '-'}</td>
              <td className="text-center">{application?.f_mob ?? '-'}</td>
              <td className="text-center">{application?.f_qual ?? '-'}</td>
              <td className="text-center">{application?.f_sal ?? '-'}</td>
              <td className="text-center">{application?.f_tel ?? '-'}</td>
              <td className="text-center">{application?.f_aadhar ?? '-'}</td>
              <td className="text-center">{application?.m_bld ?? '-'}</td>
              <td className="text-center">{application?.m_comp ?? '-'}</td>
              <td className="text-center">{application?.m_desig ?? '-'}</td>
              <td className="text-center">{application?.m_email ?? '-'}</td>
              <td className="text-center">{application?.m_mob ?? '-'}</td>
              <td className="text-center">{application?.m_qual ?? '-'}</td>
              <td className="text-center">{application?.m_sal ?? '-'}</td>
              <td className="text-center">{application?.m_tel ?? '-'}</td>
              <td className="text-center">{application?.m_adhar ?? '-'}</td>
              <td className="text-center">{application?.rel_name ?? '-'}</td>
              <td className="text-center">{application?.rel_phone ?? '-'}</td>
              <td className="text-center">{application?.relation_ch ?? '-'}</td>
              <td className="text-center">{application?.res_add ?? '-'}</td>
              <td className="text-center">{application?.res_phone ?? '-'}</td>
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
              <td className="text-center">{application?.student_mt ?? '-'}</td>
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
              <td className="text-center">{application?.branch ?? '-'}</td>
              <td className="text-center">{application?.des ?? '-'}</td>
              <td className="text-center">{application?.issues ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ApplicationTable.propTypes = {
  applications: PropTypes.array,
  tableRef: PropTypes.ref,
};

export default ApplicationTable;

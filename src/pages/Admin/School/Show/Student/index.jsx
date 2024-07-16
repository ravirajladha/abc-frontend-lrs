import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { NavTab } from '@/components/admin/school';
import { getStudents } from '@/api/admin';

function Student() {
  const { schoolId } = useParams();

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudents(schoolId);
        console.log(data.students);
        setStudents(data.students);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching school students:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [schoolId]);

  return (
    <div className="px-2">
      <ContentHeader
        title="Students"
        buttons={[
          {
            link: `/admin/academic-admin/${schoolId}/edit`,
            text: 'Edit Academic Admin Details',
            iconClassName: 'feather-edit mr-2',
          },
        ]}
        backLink={'/admin/academic-admin'}
      />
      <NavTab schoolId={schoolId} />
      {loading ? (
        <div className="my-5">
          <ContentLoader />
        </div>
      ) : students && students.length > 0 ? (
        <ContentCardWrapper>
          <div className="row">
            <div className="col-12">
              <h4 className="font-xss text-grey-700 mb-4">Student List</h4>
              <div className="table-responsive">
                <table className="table table-admin mb-0 ">
                  <thead className="bg-greylight rounded-10 ovh border-0">
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Roll Number</th>
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">Class</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.username}</td>
                        <td>{student.phone_number}</td>
                        <td>{student.class + ' ' + student.section}</td>
                        <td>{student.email}</td>
                        <td>
                          {' '}
                          <Link
                            to={`${student.student_id}`}
                            className="btn btn-outline-success btn-icon btn-sm mr-2"
                          >
                            <i className="feather-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ContentCardWrapper>
      ) : (
        <div className="text-center mt-5 col-12">
          <div className="alert" role="alert">
            There are no students available at the moment.
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;

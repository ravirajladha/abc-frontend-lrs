import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { NavTab } from '@/components/admin/school';
import { getTeachers } from '@/api/admin';

function Teacher() {
  const { schoolId } = useParams();

  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeachers(schoolId);
        setTeachers(data.teachers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching school teachers:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [schoolId]);

  return (
    <div className="px-2">
      <ContentHeader
        title="Teachers"
        buttons={[
          {
            link: `/admin/schools/${schoolId}/edit`,
            text: 'Edit School Details',
            iconClassName: 'feather-edit mr-2',
          },
        ]}
        backLink={'/admin/schools'}
      />
      <NavTab schoolId={schoolId} />
      {loading ? (
        <div className="my-5">
          <ContentLoader />
        </div>
      ) : teachers && teachers.length > 0 ? (
        <ContentCardWrapper>
          <div className="row">
            <div className="col-12">
              <h4 className="font-xss text-grey-700 mb-4">Teachers List</h4>
              <div className="table-responsive">
                <table className="table table-admin mb-0 ">
                  <thead className="bg-greylight rounded-10 ovh border-0">
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">Class</th>
                      <th className="border-0">Subject</th>
                      <th className="border-0">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher, index) => (
                      <tr key={teacher.id}>
                        <td>{index + 1}</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.phone_number}</td>
                        <td>
                          {teacher.teacher_classes &&
                          teacher.teacher_classes?.length > 0 ? (
                            teacher.teacher_classes?.map((item) => (
                              <span key={item.id}>{item.class_name} </span>
                            ))
                          ) : (
                            <>
                              <p className="text-center">-</p>
                            </>
                          )}
                        </td>
                        <td>
                          {teacher.teacher_subjects &&
                          teacher.teacher_subjects?.length > 0 ? (
                            teacher.teacher_subjects?.map((item) => (
                              <span key={item.id}>{item.subject_name} </span>
                            ))
                          ) : (
                            <>
                              <p className="text-center">-</p>
                            </>
                          )}
                        </td>
                        <td>{teacher.email}</td>
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
            There are no trainers available at the moment.
          </div>
        </div>
      )}
    </div>
  );
}

export default Teacher;

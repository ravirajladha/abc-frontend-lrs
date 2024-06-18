import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import DefaultProfileImage from '@/assets/images/default/teacher.png';

import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchTeacher } from '@/api/school';

function Show({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { teacherId } = useParams();
  const [teacher, setTeacherDetails] = useState(null);
  const [teacherSubjects, setTeacherSubjects] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await fetchTeacher(teacherId);
      setTeacherDetails(data.teacher);
      setTeacherSubjects(data.teacher_subjects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching school data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [teacherId]);

  return (
    <div className="px-2">
      <ContentHeader title={title} />
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          {teacher && (
            <div className="row">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="mb-4 d-block w-100 border-0 text-center">
                        <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden">
                          <img
                            src={
                              teacher?.profile_image
                                ? baseUrl + teacher?.profile_image
                                : DefaultProfileImage
                            }
                            alt="avatar"
                            className="w-100"
                          />
                        </figure>
                        <h4 className="fw-700 font-xs my-3">{teacher?.name}</h4>
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <div className="row">
                        <div className="col-lg-6 mb-3 border-bottom">
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Name: </span>{' '}
                              {teacher?.name}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Email: </span>{' '}
                              {teacher?.email}
                            </label>
                          </div>
                          {/* <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">DOB: </span>{' '}
                              {teacher?.dob}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Address: </span>{' '}
                              {teacher?.address}
                            </label>
                          </div> */}
                        </div>
                        <div className="col-lg-6 mb-3 border-bottom">
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">ID: </span>{' '}
                              {teacher?.username}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Phone Number: </span>{' '}
                              {teacher?.phone_number}
                            </label>
                          </div>
                          {/* <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Location: </span>{' '}
                              {teacher?.city}
                              {teacher?.state}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Pincode: </span>{' '}
                              {teacher?.pincode}
                            </label>
                          </div> */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <h3 className="fw-600 font-xs my-4">
                            Teacher Classes and Subjects:{' '}
                          </h3>
                          {teacherSubjects !== null ? (
                            teacherSubjects?.map((value, index) => (
                              <ol type="1" key={index}>
                                <li className="mont-font fw-500 font-xss">
                                  {index + 1}. {value?.class_name}
                                  {', '}
                                  {value?.subject_name}
                                </li>
                              </ol>
                            ))
                          ) : (
                            <ContentFallback message="  There are no subjects available at the moment." />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;

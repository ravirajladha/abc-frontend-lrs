import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import DefaultProfileImage from '@/assets/images/default/trainer.png';

import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchTrainer } from '@/api/internshipAdmin';

function Show({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { trainerId } = useParams();
  const [trainer, setTrainerDetails] = useState(null);
  const [trainerSubjects, setTrainerSubjects] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await fetchTrainer(trainerId);
      setTrainerDetails(data.trainer);
      setTrainerSubjects(data.trainer_subjects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching school data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [trainerId]);

  return (
    <div className="px-2">
      <ContentHeader title={title} />
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          {trainer && (
            <div className="row">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="mb-4 d-block w-100 border-0 text-center">
                        <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden">
                          <img
                            src={
                              trainer?.profile_image
                                ? baseUrl + trainer?.profile_image
                                : DefaultProfileImage
                            }
                            alt="avatar"
                            className="w-100"
                          />
                        </figure>
                        <h4 className="fw-700 font-xs my-3">{trainer?.name}</h4>
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <div className="row">
                        <div className="col-lg-6 mb-3 border-bottom">
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Name: </span>{' '}
                              {trainer?.name}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Email: </span>{' '}
                              {trainer?.email}
                            </label>
                          </div>
                          {/* <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">DOB: </span>{' '}
                              {trainer?.dob}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Address: </span>{' '}
                              {trainer?.address}
                            </label>
                          </div> */}
                        </div>
                        <div className="col-lg-6 mb-3 border-bottom">
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">ID: </span>{' '}
                              {trainer?.username}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Phone Number: </span>{' '}
                              {trainer?.phone_number}
                            </label>
                          </div>
                          {/* <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Location: </span>{' '}
                              {trainer?.city}
                              {trainer?.state}
                            </label>
                          </div>
                          <div className="form-group">
                            <label className="mont-font fw-500 font-xsss">
                              <span className="fw-600 ">Pincode: </span>{' '}
                              {trainer?.pincode}
                            </label>
                          </div> */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <h3 className="fw-600 font-xs my-4">
                            Trainer Classes and Subjects:{' '}
                          </h3>
                          {trainerSubjects !== null ? (
                            trainerSubjects?.map((value, index) => (
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
import React from 'react';
import DefaultTrainerImage from '@/assets/images/default/trainer.png';

const index = ({ trainer }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 bg-lightblue">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 text-primary mb-4">
        Trainer
      </h2>
      <div className="row align-items-center">
      <div className="col-lg-3 d-flex flex-column align-items-center">
          <img
            src={
              trainer?.profile_image
                ? baseUrl + trainer?.profile_image
                : DefaultTrainerImage
            }
            alt="avatar"
            className="rounded-circle"
            width="100"
            height="100"
          />
          <h4 className="font-xss fw-600 mt-2 text-center">
            {trainer?.name}
          </h4>
          <p className="fw-500 font-xssss text-center">
            {trainer?.expertise}
          </p>
          <p className="fw-500 font-xssss text-center">
            {trainer?.experience} years of experience
          </p>
        </div>
        <div className="col-lg-9">
          <h4 className="font-xssss fw-600 text-grey-600 pl-2 position-relative lh-24">
            {trainer?.description}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default index;

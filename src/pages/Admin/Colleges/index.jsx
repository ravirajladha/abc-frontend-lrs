import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ContentLoader } from '@/components/common';

const Colleges = () => (
  <div className="card-body d-flex px-4 pt-4 pb-0 justify-content-between">
    <table className="table table-admin mb-0">
      <thead className="bg-greylight rounded-10 ovh border-0">
        <tr>
          <th className="border-0">#</th>
          <th className="border-0">Name</th>
          <th className="border-0">Email</th>
          <th className="border-0">Subscription</th>
          <th className="border-0">Status</th>
          <th className="border-0">Number</th>
          <th className="border-0">Actions</th>
        </tr>
      </thead>
      
    </table>
  </div>
);

export default Colleges;

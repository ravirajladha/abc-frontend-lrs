import React from 'react';

const StatusBadge = ({ status }) => {
  const isActive = status === 1;
  return (
    <span className={`badge ${isActive ? 'badge-success' : 'badge-danger'}`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export default StatusBadge;

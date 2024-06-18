import React from 'react';

const Toggle = ({ id, isActive, onToggle }) => {
  const handleToggle = () => {
    // Pass the elab id and the updated isActive value to the onToggle function
    onToggle(id, !isActive);
  };

  return (
    <input
      type="checkbox"
      checked={isActive}
      onChange={handleToggle}
    />
  );
};

export default Toggle;

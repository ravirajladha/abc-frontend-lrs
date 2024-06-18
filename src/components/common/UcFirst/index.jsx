// Capitalize.js

import React from 'react';

function UcFirst({ text }) {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return <>{capitalizeFirstLetter(text)}</>;
}

export default UcFirst;

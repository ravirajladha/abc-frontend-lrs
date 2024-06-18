import React from 'react';
import PropTypes from 'prop-types';
import { ContentHeader } from '@/components/common';

function Videos({ title }) {
  return (
    <div>
      <ContentHeader title="Contents" />
    </div>
  );
}

Videos.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Videos;

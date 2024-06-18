import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ContentHeader } from '@/components/common';
import { Link } from 'react-router-dom';
// console.log("title" );
// console.log("title", title);
function Show({ title }) {
  return (
    <div>
      <ContentHeader
        title={title}
        buttons={[
          {
            link: 'create',
            text: 'New Assessment',
          },
          {
            iconClassName: '',
            link: '/admin/assessments/question-bank',
            text: 'Question Bank',
          },
        ]}
      />
    </div>
  );
}
Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;

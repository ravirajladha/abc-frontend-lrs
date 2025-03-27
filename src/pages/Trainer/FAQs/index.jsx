import { fetchFaqs } from '@/api/trainer';
import { ContentHeader } from '@/components/common';
import { FAQs } from '@/components/student/previewCourse';
import { selectUserType } from '@/store/authSlice';
import { USER_TYPES } from '@/utils/constants';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const index = () => {
  let { courseId, subjectId } = useParams();
  const authenticatedUserType = useSelector(selectUserType);
  
  return (
    <>
      <ContentHeader
        title="All"
        subtitle="FAQs list"
        buttons={authenticatedUserType  === USER_TYPES.TRAINER ? [{ link: 'create', text: 'Add FAQ' }] : []}
      />
      <div className="row">
        <div className="col-lg-12">
          <FAQs courseId={courseId}/>
        </div>
      </div>
    </>
  );
};

export default index;

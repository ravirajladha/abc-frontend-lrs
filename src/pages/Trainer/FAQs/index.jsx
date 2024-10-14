import { fetchFaqs } from '@/api/trainer';
import { ContentHeader } from '@/components/common';
import { FAQs } from '@/components/student/previewCourse';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const index = () => {
  let { courseId, subjectId } = useParams();
  
  return (
    <>
      <ContentHeader
        title="All"
        subtitle="FAQs list"
        buttons={[{ link: 'create', text: 'Add FAQ' }]}
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

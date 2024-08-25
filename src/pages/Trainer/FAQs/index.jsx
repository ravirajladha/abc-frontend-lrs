import { ContentHeader } from '@/components/common';
import { FAQs } from '@/components/student/previewCourse';
import React from 'react';
import { useParams } from 'react-router';

const index = () => {
  let { classId, subjectId } = useParams();

  return (
    <>
      <ContentHeader
        title="All"
        subtitle="FAQs list"
        backLink={`/trainer/subjects/${classId}/courses`}
        buttons={[{ link: 'create', text: 'Add FAQ' }]}
      />
      <div className="row">
        <div className="col-lg-12">
          <FAQs />
        </div>
      </div>
    </>
  );
};

export default index;

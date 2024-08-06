import React from 'react';
import DefaultTeacherImage from '@/assets/images/default/teacher.png';

const index = ({teacher}) => {
  return (
    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 bg-lightblue">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 text-primary mb-4">
        Trainer
      </h2>
      <div className="row">
        <div className="col-lg-3 text-center">
          <img src={DefaultTeacherImage} alt="" />
          <h4 className="font-xss fw-600 mt-2 mb-3 pl-2 position-relative lh-24">
            {teacher?.name}
          </h4>
        </div>
        <div className="col-lg-9">
          <h4 className="font-xssss fw-600 text-grey-600 pl-2 position-relative lh-24">
          A Java Trainer is an experienced software professional who specializes in teaching Java programming. They possess deep knowledge of Java's syntax, object-oriented programming concepts, and frameworks like Spring and Hibernate. A Java Trainer is adept at explaining complex concepts in an easy-to-understand manner, developing comprehensive curricula, and providing hands-on coding exercises. They stay updated with the latest industry trends and best practices to equip learners with relevant skills. Their role involves mentoring students, conducting workshops, and preparing them for certifications and real-world projects, ultimately fostering a strong foundation in Java development.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default index;

import React from 'react';

function ContentDescription({ description }) {
  return (
    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 h300">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">Description</h2>
      <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
        {/* {description} */}
        This course is meticulously designed to cover all fundamental OOP concepts with detailed explanations and practical examples. By the end of the course, learners will have a solid grasp of Java's OOP principles, demonstrated through real-world coding exercises and projects. This ensures that students are not only proficient in theory but also capable of applying their knowledge in practical scenarios, making them well-prepared for industry challenges.
      </p>
    </div>
  );
}

export default ContentDescription;

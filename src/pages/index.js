/*

  Pages Directory: /src/pages/index.js
  This file serves as an index for all pages in this application.

  Pages List:
  1. Common
  2. Authentication
  3. Admin
  4. School
  5. Trainer
  6. Student
  7. Parent

*/

// Common Pages
export * from './common';

// Authentication Pages
export * from './Auth';

// Admin Pages
export * from './Admin';

// School Pages
export * from './InternshipAdmin';

// Trainer Pages
export * from './Trainer';

// Student Pages
export * from './Student';

// Parent Pages
export * from './Parent';

//Recruiter pages
export * from './Recruiter';

// Ebook Preview Page
export { default as EbookPreview } from './Ebook/Show';

// Case Study Preview Page
export { default as CaseStudyPreview } from './CaseStudy/Show';

// Project Report Preview Page
export { default as ProjectReportPreview } from './ProjectReport/Show';

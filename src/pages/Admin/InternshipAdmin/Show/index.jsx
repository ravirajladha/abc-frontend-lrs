// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Link, useParams } from 'react-router-dom';

// import Logo from '@/assets/images/logo-transparent.png';
// import No_image from '@/assets/images/no_image.png';

// import {
//   ContentCardWrapper,
//   ContentHeader,
//   ContentLoader,
// } from '@/components/common';
// import { NavTab } from '@/components/admin/school';
// import { getSchoolData } from '@/api/admin';

// function Show({ title }) {
//   const baseUrl = import.meta.env.VITE_BASE_URL;

//   const { schoolId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [schoolData, setSchoolData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getSchoolData(schoolId);
//         console.log("data", data);
//         setSchoolData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching school data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [schoolId]);

//   return (
//     <div className="px-2">
//       <ContentHeader
//         title={title}
//         buttons={[
//           {
//             link: 'edit',
//             text: 'Edit School Details',
//             iconClassName: 'feather-edit mr-2',
//           },
//         ]}
//         backLink={'/admin/schools'}
//       />
//       <NavTab schoolId={schoolId} />
//       {loading && (
//         <div className="row my-5">
//           <ContentLoader />
//         </div>
//       )}
//       {schoolData && (
//         <ContentCardWrapper>
//           <div className="row">
//             <div className="col-lg-3">
//               <div className="mb-4 d-block w-100 rounded-lg  border-0 text-center">
//                 <figure className="avatar ml-auto mr-auto mb-0 w150 overflow-hidden">
//                   <img
//                     src={schoolData?.image ? baseUrl + schoolData?.image : No_image}
//                     alt="avatar"
//                     className="shadow-lg w-100 p-1"
//                   />
//                 </figure>
//                 <h4 className="fw-700 font-xs my-3">School Image</h4>
//                 <figure className="avatar ml-auto mr-auto mb-0 w150 overflow-hidden">
//                   <img
//                     src={schoolData?.logo ? baseUrl + schoolData?.logo : No_image}
//                     alt="avatar"
//                     className="shadow-lg w-100 p-1"
//                   />
//                 </figure>
//                 <h4 className="fw-700 font-xs my-3">School Logo</h4>
//                 <h6 className="fw-700 font-xs my-3">School Name: <u>{schoolData?.name}</u></h6>
//               </div>
//             </div>
//             <div className="col-lg-9">
//               <div className="row">
//                 <div className="col-lg-6 mb-3 border-bottom">
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Legal Name: </span>{' '}
//                       {schoolData?.legal_name || 'N/A'}
//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Email: </span>{' '}
//                       {schoolData?.email || 'N/A'}
//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">YOE: </span>{' '}
//                       {schoolData?.year_of_establishment || 'N/A'}
//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Address: </span>{' '}
//                       {schoolData?.address || 'N/A'}
//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Website: </span>{' '}
//                       {schoolData?.website_url || 'N/A'}
//                     </label>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 mb-3 border-bottom">
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Accreditation: </span>{' '}
//                       {schoolData?.accreditation_no || 'N/A'}
//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Phone Number: </span>{' '}
//                       {schoolData?.phone_number || 'N/A'}
//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Location: </span>{' '}
//                       {schoolData?.city || 'N/A'} {schoolData?.state}

//                     </label>
//                   </div>
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Pincode: </span>{' '}
//                       {schoolData?.pincode || 'N/A'}
//                     </label>
//                   </div>
//                   {/* <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Office Address: </span>{' '}
//                       {schoolData?.office_address}
//                     </label>
//                   </div> */}
//                      {/* <div className="col-lg-3"></div> */}
        

//                 </div>
//                 <div className="col-lg-12">
//               <div className="row">
//                 <div className="col-lg-12 mb-3">
//                   <div className="form-group">
//                     <label className="mont-font fw-500 font-xsss">
//                       <span className="fw-600 ">Description: </span>{' '}
//                       {schoolData?.description || 'N/A'}
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//               </div>
//             </div>
         
//           </div>
//         </ContentCardWrapper>
//       )}
//     </div>
//   );
// }

// Show.propTypes = {
//   title: PropTypes.string.isRequired,
// };

// export default Show;

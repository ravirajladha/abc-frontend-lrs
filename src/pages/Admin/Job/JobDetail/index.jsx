import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import No_image from '@/assets/images/no_image.png';
import { ContentHeader, ContentLoader } from '@/components/common';

import { Tab, Tabs } from 'react-bootstrap';

const memberList = [
  {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'John Steere ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Mohannad Zitoun ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Hendrix Stamp ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Mohannad Zitoun ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'John Steere ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
];
const liveList = [
  {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    email: 'support@gmail.com',
    status: 'LIVE',
    statusColor: 'bg-danger',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'John Steere ',
    email: 'support@gmail.com',
    status: 'OFFLINE',
    statusColor: 'bg-dark',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Mohannad Zitoun ',
    email: 'support@gmail.com',
    status: 'LIVE',
    statusColor: 'bg-danger',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    email: 'support@gmail.com',
    status: 'OFFLINE',
    statusColor: 'bg-dark',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Hendrix Stamp ',
    email: 'support@gmail.com',
    status: 'LIVE',
    statusColor: 'bg-danger',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Mohannad Zitoun ',
    email: 'support@gmail.com',
    status: 'LIVE',
    statusColor: 'bg-danger',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'John Steere ',
    email: 'support@gmail.com',
    status: 'LIVE',
    statusColor: 'bg-danger',
    bgimage: 'course.png',
  },
];

const channelList = [
  {
    imageUrl: 'user.png',
    title: 'Mobile Product Design',
    des: 'Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!',
    tag1: 'FULL TIME',
    tag2: 'DESINER',
    tag3: '30 MIN',
  },
  {
    imageUrl: 'user.png',
    title: 'HTML Developer',
    des: 'Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!',
    tag1: '',
    tag2: 'DESINER',
    tag3: '30 MIN',
  },
  {
    imageUrl: 'user.png',
    title: 'Advanced CSS and Sass',
    des: 'Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!',
    tag1: 'FULL TIME',
    tag2: 'DEVELOPER',
    tag3: '21 HOUR',
  },
  {
    imageUrl: 'user.png',
    title: 'Modern React with Redux',
    des: 'Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!',
    tag1: 'HALF TIME',
    tag2: 'DESINER',
    tag3: '5 HOUNRS',
  },
  {
    imageUrl: 'user.png',
    title: 'Node JS',
    des: 'Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!',
    tag1: 'HALF TIME',
    tag2: 'CODER',
    tag3: '45 MIN',
  },
  {
    imageUrl: 'user.png',
    title: 'Mobile Product Design',
    des: 'Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!',
    tag1: 'FULL TIME',
    tag2: 'DESINER',
    tag3: '30 MIN',
  },
];
const badgeList = [
  {
    imageUrl: 'user.png',
    title: 'Bronze User',
    des: 'Learn new secrets to creating awesome Microsoft Access databases',
    tag: 'UNLOCK',
    per: '100',
  },
  {
    imageUrl: 'user.png',
    title: 'Platinum  User',
    des: 'Learn new secrets to creating awesome Microsoft Access databases',
    tag: '95 / 100',
    per: '95',
  },
  {
    imageUrl: 'user.png',
    title: 'Ultra Powered',
    des: 'Learn new secrets to creating awesome Microsoft Access databases',
    tag: '90 / 100',
    per: '90',
  },
  {
    imageUrl: 'user.png',
    title: 'Bronze User',
    des: 'Learn new secrets to creating awesome Microsoft Access databases',
    tag: '85 / 100',
    per: '85',
  },
  {
    imageUrl: 'user.png',
    title: 'Gold User',
    des: 'Learn new secrets to creating awesome Microsoft Access databases',
    tag: 'UNLOCK',
    per: '82',
  },
  {
    imageUrl: 'user.png',
    title: 'Silver User',
    des: 'Learn new secrets to creating awesome Microsoft Access databases',
    tag: 'UNLOCK',
    per: '98',
  },
];

const courseList = [
  {
    imageUrl: 'course.png',
    title: 'Complete Python Bootcamp From Zero to Hero in Python ',
    price: '2400',
    tag: 'Python',
    lesson: '32 ',
    status: 'alert-warning text-warning',
  },
  {
    imageUrl: 'course.png',
    title: 'Complete Python Bootcamp From Zero to Hero in Python ',
    price: '40',
    tag: 'Desinger',
    lesson: '24 ',
    status: 'alert-danger text-danger',
  },
  {
    imageUrl: 'course.png',
    title: 'Java Programming Masterclass for Developers',
    price: '60',
    tag: 'Bootstrap',
    lesson: '14 ',
    status: 'alert-success text-success',
  },
  {
    imageUrl: 'course.png',
    title: 'The Data Science Course Complete Data Science ',
    price: '370',
    tag: 'Develop',
    lesson: '23 ',
    status: 'alert-danger text-danger',
  },
  {
    imageUrl: 'course.png',
    title: 'Complete Python Bootcamp From Zero to Hero in Python ',
    price: '450',
    tag: 'Desinger',
    lesson: '24 ',
    status: 'alert-danger text-danger',
  },
  {
    imageUrl: 'course.png',
    title: 'Fundamentals for Scrum Master and Agile Projects ',
    price: '670',
    tag: 'Python',
    lesson: '32 ',
    status: 'alert-warning text-warning',
  },
  {
    imageUrl: 'course.png',
    title: 'Automate the Boring Stuff with Python Programming',
    price: '760',
    tag: 'Bootstrap',
    lesson: '14 ',
    status: 'alert-primary text-primary',
  },
  {
    imageUrl: 'course.png',
    title: 'The Data Science Course Complete Data Science ',
    price: '370',
    tag: 'Develop',
    lesson: '23 ',
    status: 'alert-danger text-danger',
  },
];

const bulletins = [
  {
    type: 'telephonicRound',
    title: 'Telephonic Round with HR',
    dateTime: '2024-07-20T10:00',
    contactNumber: '123-456-7890',
    message:
      'Please be prepared for a telephonic round with our HR department.',
  },
  {
    type: 'interviewSchedule',
    title: 'Technical Interview',
    dateTime: '2024-07-21T14:00',
    platform: 'Zoom',
    message:
      'Join the Zoom meeting for your technical interview using the following link.',
  },
  {
    type: 'informationNotification',
    title: 'New Course Announcement',
    message:
      'We are excited to announce a new course on Data Science starting next month.',
  },
  {
    type: 'documentSubmission',
    title: 'Document Submission Deadline',
    deadline: '2024-07-25T17:00',
    message: 'Please submit all required documents by the mentioned deadline.',
  },
  {
    type: 'followUpReminder',
    title: 'Follow-Up Reminder',
    dateTime: '2024-07-26T11:00',
    message:
      'This is a reminder for your follow-up meeting with the project manager.',
  },
  {
    type: 'feedbackRequest',
    title: 'Feedback Request',
    deadline: '2024-07-30T18:00',
    message:
      'Kindly provide your feedback on the recent project by the given deadline.',
  },
];

const dummyLogs = [
    { date: '2024-07-15', status: 'Applied', changedBy: 'Admin' },
    { date: '2024-07-16', status: 'In Progress', changedBy: 'Admin' },
    { date: '2024-07-17', status: 'Interview Scheduled', changedBy: 'Admin' },
  ];
import Logo from '@/assets/images/logo-transparent.png';

function JobDetail({}) {
  return (
    <>
      <ContentHeader
        title="Job Detail"
        // backLink={props.isAdmin ? '/admin/jobs' : '/recruiter/jobs'}
      />
      <>
        {/* <div className="px-2">
      <div className="course-details pb-lg--12 pt-4 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="middle-sidebar-left"> */}

        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3 nav nav-tabs profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
        >
          <Tab eventKey="profile" title="Profile">
            <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
              <div
                className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden mb-3"
                style={{
                  backgroundImage: `url("https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=996&t=st=1727762357~exp=1727762957~hmac=2e241eb832a5774342c27a655bf1d02b8daf30255e62b13ad6bb61de1428ce3d")`,
                }}
              >
                <div className="card-body p-sm-5 p-4 bg-black-08">
                  <div className="clearfix"></div>
                  <div className="row">
                    <div className="col-lg-12 pl-xl-5 pt-xl-1">
                      <figure className="avatar ml-0 mb-4 position-relative w100 z-index-1">
                        <img
                          src={Logo}
                          alt="avatar"
                          className="float-right p-1 bg-white rounded-circle w-100"
                        />
                      </figure>
                    </div>
                    <div className="col-xl-4 col-lg-6 pl-xl-5 pb-xl-5 pb-3">
                      <h4 className="fw-700 font-md text-white mt-3 mb-1">
                        Amazon
                        <i className="ti-check font-xssss btn-round-xs bg-success text-white ml-1"></i>
                      </h4>
                      <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-0">
                        <i className="feather-codepen mr-2"></i> DFT Engineer
                      </span>
                      <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                      <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-1">
                        <i className="feather-map mr-2"></i> Bangalore,
                        Hyderabad, Visakhapatnam, Any Location
                      </span>
                      <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-1">
                        <i className="feather-check mr-2"></i> Verified
                      </span>
                    </div>
                    <div className="col-xl-4 mt-4"></div>
                    <div className="col-xl-4 col-lg-6 d-block ">
                      <h6 className=" text-white fw-700 lh-1 mr-3">
                        Rs. 400,000 - Rs. 900,000
                      </h6>
                      <h4 className="text-white font-sm fw-600 mt-0 lh-3">
                        Full Time
                      </h4>
                      <h4 className="text-white font-sm fw-600 mt-0 lh-3">
                        Job Posted: 2024-07-27
                      </h4>
                      <h4 className="text-white font-sm fw-600 mt-0 lh-3">
                        Valid Till: 2024-07-27
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body mb-lg-3 pb-0">
                <h2 className="fw-400 font-lg d-block">
                  <b>Job Description</b>
                </h2>
              </div>
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-xl-12">
                    <p className="font-xssss fw-600 lh-28 text-grey-500 pl-0">
                      Junior level to lead level - 2 Years to 12 Years
                    </p>
                    <ul>
                      <li>DFT implementation and verification</li>
                      <li>
                        Implementation tools like Mentor Tessent Fastscan,
                        Testkompress or Synopsys DFT compiler, and Tetramax
                      </li>
                      <li>
                        Sound knowledge of ATPG/Scan, coverage analysis, EDT
                        compression, etc.
                      </li>
                      <li>Memory BIST implementation and verification</li>
                      <li>
                        Sound debug skills to debug simulation failures at
                        RTL-level and gate-level
                      </li>
                      <li>
                        Exposure to Static timing in DFT modes to debug
                        constraint issues and review/analyze timing reports
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body mb-lg-3 pb-0">
                <h2 className="fw-400 font-lg d-block">
                  <b>Desired Candidate Profile</b>
                </h2>
              </div>
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-xl-12">
                    <p className="font-xssss fw-600 lh-28 text-grey-500 pl-0">
                      Key skills: ATPG/Scan, MBIST, Scan insertion, Scan
                      stimulation
                    </p>
                    <p className="font-xssss fw-600 lh-28 text-grey-500 pl-0">
                      Tools: Mentor Tessent Fastscan, Testkompress or Synopsys
                      DFT compiler, and Tetramax
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tab>

        
          <Tab eventKey="bdage" title="BULLETIN">
            <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
              <div className="card-body mb-lg-3 pb-0">
                <h2 className="fw-400 font-lg d-block">
                  <b>Bulletin</b>
                  {/* <a href="" className="float-right">
                    <i className="feather-edit text-grey-500 font-xs"></i>
                  </a> */}
                </h2>
              </div>
              <div className="card-body pb-0">
                <div className="row">
                  {bulletins.map((bulletin, index) => (
                    <div
                      className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4"
                      key={index}
                    >
                      <div className="card w-100 p-0 shadow-xss border-0 rounded-lg overflow-hidden mr-1 course-card">
                        <div className="card-body pt-0">
                          <h4 className="fw-700 font-xss mt-3 lh-28 mt-0">
                            {bulletin.title}
                          </h4>
                          <div className="font-xssss text-grey-500 fw-600 ml-0 mt-2">
                            {bulletin.type === 'telephonicRound' && (
                              <>
                                <p>
                                  Date and Time:{' '}
                                  {new Date(bulletin.dateTime).toLocaleString()}
                                </p>
                                <p>Contact Number: {bulletin.contactNumber}</p>
                                <p>Message: {bulletin.message}</p>
                              </>
                            )}
                            {bulletin.type === 'interviewSchedule' && (
                              <>
                                <p>
                                  Date and Time:{' '}
                                  {new Date(bulletin.dateTime).toLocaleString()}
                                </p>
                                <p>Platform: {bulletin.platform}</p>
                                <p>Message: {bulletin.message}</p>
                              </>
                            )}
                            {bulletin.type === 'informationNotification' && (
                              <>
                                <p>Message: {bulletin.message}</p>
                              </>
                            )}
                            {bulletin.type === 'documentSubmission' && (
                              <>
                                <p>
                                  Submission Deadline:{' '}
                                  {new Date(bulletin.deadline).toLocaleString()}
                                </p>
                                <p>Message: {bulletin.message}</p>
                              </>
                            )}
                            {bulletin.type === 'followUpReminder' && (
                              <>
                                <p>
                                  Date and Time:{' '}
                                  {new Date(bulletin.dateTime).toLocaleString()}
                                </p>
                                <p>Message: {bulletin.message}</p>
                              </>
                            )}
                            {bulletin.type === 'feedbackRequest' && (
                              <>
                                <p>
                                  Feedback Deadline:{' '}
                                  {new Date(bulletin.deadline).toLocaleString()}
                                </p>
                                <p>Message: {bulletin.message}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="status" title="Status">
            <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
              <div className="card-body mb-lg-3 pb-0">
                <h2 className="fw-400 font-lg d-block">
                  <b>Status</b>
                </h2>
              </div>
              <div className="card-body pb-0">
          
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body p-4">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">Status Logs</h4>
                <div className="table-responsive">
                  <table className="table table-admin mb-0">
                    <thead className="bg-greylight rounded-10">
                      <tr>
                        <th className="border-0" scope="col">Date</th>
                        <th className="border-0" scope="col">Status</th>
                        <th className="border-0" scope="col">Changed By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyLogs.length > 0 ? (
                        dummyLogs.map((log, index) => (
                          <tr key={index}>
                            <td>{log.date}</td>
                            <td>{log.status}</td>
                            <td>{log.changedBy}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No logs available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
              </div>
            </div>
          </Tab>
          {/* <Tab eventKey="friends" title="FRIENDS">
            <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
              <div className="card-body mb-lg-3 pb-0">
                <h2 className="fw-400 font-lg d-block">
                  My <b>Friend</b>
                  <a href="" className="float-right">
                    <i className="feather-edit text-grey-500 font-xs"></i>
                  </a>
                </h2>
              </div>
              <div className="card-body pb-0">
                <div className="row">
                  {memberList.map((value, index) => (
                    <div
                      className="col-xxxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4"
                      key={index}
                    >
                      <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                        <div
                          className="card-body position-relative h100 bg-gradiant-bottom bg-image-cover bg-image-center"
                          style={{
                            backgroundImage: `url(assets/images/${value.bgimage})`,
                          }}
                        ></div>
                        <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                          <figure className="avatar ml-auto mr-auto mb-0 mt--6 position-relative w75 z-index-1">
                            <img
                              src={`assets/images/${value.imageUrl}`}
                              alt="avater"
                              className="float-right p-1 bg-white rounded-circle w-100"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-700 font-xsss mt-3 mb-1">
                            {value.name}
                          </h4>
                          <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                            {value.email}
                          </p>
                          <ul className="text-center d-block mt-3 list-inline ml-2 mr-2 mb-3">
                            <li className="mr-1 list-inline-item">
                              <a
                                href=""
                                className="btn-round-md bg-facebook"
                              >
                                <i className="font-xs ti-facebook text-white"></i>
                              </a>
                            </li>
                            <li className="mr-1 list-inline-item">
                              <a
                                href=""
                                className="btn-round-md bg-twiiter"
                              >
                                <i className="font-xs ti-twitter-alt text-white"></i>
                              </a>
                            </li>
                            <li className="mr-1 list-inline-item">
                              <a
                                href=""
                                className="btn-round-md bg-linkedin"
                              >
                                <i className="font-xs ti-linkedin text-white"></i>
                              </a>
                            </li>
                            <li className="mr-0 list-inline-item">
                              <a
                                href=""
                                className="btn-round-md bg-instagram"
                              >
                                <i className="font-xs ti-instagram text-white"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab> */}
        
        </Tabs>
        {/* </div>
              </div>
            </div>
          </div>
        </div>
    </div> */}
      </>
    </>
  );
}

// Show.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default JobDetail;

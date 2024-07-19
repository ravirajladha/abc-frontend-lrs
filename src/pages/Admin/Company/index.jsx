import React, { useState, useEffect } from 'react';
import { ContentHeader } from '@/components/common';
import DefaultProfileImage from '@/assets/images/default/user.png';
import AbcLogo from '@/assets/images/abc_logo.jpg';
import { Link, useParams } from 'react-router-dom';

const companies = [
  {
    id: 1,
    title: 'Tata Consultancy Services',
    subtitle: 'IT Services and Consulting',
    location: 'Mumbai, Maharashtra',
    imageUrl: AbcLogo,
    category: 'IT',
    description: 'TCS is a global leader in IT services, consulting, and business solutions.',
    tag1: 'Top IT',
    tag2: 'Consulting',
    tag3: 'Global',
  },
  {
    id: 2,
    title: 'Infosys',
    subtitle: 'Digital Services and Consulting',
    location: 'Bengaluru, Karnataka',
    imageUrl: AbcLogo,
    category: 'IT',
    description: 'Infosys provides next-generation digital services and consulting.',
    tag1: 'Tech',
    tag2: 'Innovation',
    tag3: 'Consulting',
  },
  {
    id: 3,
    title: 'Reliance Industries',
    subtitle: 'Conglomerate',
    location: 'Mumbai, Maharashtra',
    imageUrl: AbcLogo,
    category: 'Non-IT',
    description: 'Reliance Industries Limited is a Fortune 500 company and the largest private-sector corporation in India.',
    tag1: 'Diverse',
    tag2: 'Energy',
    tag3: 'Retail',
  },
  {
    id: 4,
    title: 'HDFC Bank',
    subtitle: 'Banking and Financial Services',
    location: 'Mumbai, Maharashtra',
    imageUrl: AbcLogo,
    category: 'Non-IT',
    description: "HDFC Bank is one of India's leading private sector banks.",
    tag1: 'Banking',
    tag2: 'Finance',
    tag3: 'Trust',
  },
  {
    id: 5,
    title: 'Wipro',
    subtitle: 'IT Services and Consulting',
    location: 'Bengaluru, Karnataka',
    imageUrl: AbcLogo,
    category: 'IT',
    description: 'Wipro is a leading global information technology, consulting, and business process services company.',
    tag1: 'Tech',
    tag2: 'Consulting',
    tag3: 'Innovation',
  },
];

const Companies = (props) => {
  console.log(props.isRecruiter, "props detail");
  const [activePopup, setActivePopup] = useState(null);

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.popup-menu') && !event.target.closest('.popup-toggle')) {
      console.log('Clicked outside, closing popup');
      setActivePopup(null);
    }
  };

  useEffect(() => {
    if (activePopup !== null) {
      document.addEventListener('click', handleOutsideClick);
      console.log('Added click listener');
    } else {
      document.removeEventListener('click', handleOutsideClick);
      console.log('Removed click listener');
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      console.log('Cleanup click listener');
    };
  }, [activePopup]);

  const togglePopup = (index) => {
    console.log('Toggle popup:', index);
    if (activePopup === index) {
      setActivePopup(null);
    } else {
      setActivePopup(index);
    }
  };

  const { isAdmin, isRecruiter, isStudent } = props;

  const getLink = () => {
    if (isAdmin) {
      return "/admin/jobs";
    } else if (isRecruiter) {
      return "/recruiter/jobs";
    } else if (isStudent) {
      return "/student/jobs";
    } else {
      return null;
    }
  };


  
  return (
    <>
    
    <ContentHeader
        title="Jobs"
        backLink={isAdmin ? '/admin/companies' : isRecruiter ? '/recruiter/companies' : null}
        buttons={!isStudent && [
          {
            link: 'create',
            text: 'Company',
          },
        ]}
      />
      <div className="row">
        {companies.map((company, index) => (
          <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
              <div className="position-relative">
                <a
                  href="#!"
                  className="position-absolute right-0 mr-4 top-0 mt-3 popup-toggle"
                  onClick={() => togglePopup(index)}
                >
                  <i className="ti-more text-grey-500 font-xs"></i>
                </a>
                {activePopup === index && (
                  <div
                    className="popup-menu position-absolute bg-white shadow-sm rounded-lg"
                    style={{
                      top: '40px',
                      right: '10px',
                      zIndex: 1000,
                      width: '150px',
                      border: '1px solid #ccc',
                      padding: '10px',
                    }}
                  >
                    <ul className="list-unstyled m-0 p-2">
                      <li className="p-2"><a href="#!" className=" pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block  mb-1">Show</a></li>
                      <li className="p-2"><a href="/companies/create" className="  pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block  mb-1">Edit</a></li>
                      <li className="p-2"><a href="#!" className="pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block  mb-1">Delete</a></li>
                    </ul>
                  </div>
                )}
              </div>
              <a
                href=""
                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
              >
                <img
                  src={`${company.imageUrl}`}
                  alt="icon"
                  className="p-1 w-100"
                />
              </a>
              <h4 className="fw-700 font-xs mt-4">{company.title}</h4>
              <p className="fw-500 font-xssss text-grey-500 mt-3">
                {company.description}
              </p>
              <div className="clearfix"></div>
              {company.tag1 && (
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                  {company.tag1}
                </span>
              )}
              {company.tag2 && (
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                  {company.tag2}
                </span>
              )}
              {company.tag3 && (
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                  {company.tag3}
                </span>
              )}
              <div className="clearfix"></div>
              <ul className="memberlist mt-4 mb-2">
                <li className="last-member">
                  <a
                    href=""
                    className="bg-greylight fw-600 text-grey-500 font-xssss ls-3"
                  >
                    +2
                  </a>
                </li>
                <li className="pl-4 w-auto">
                  <a
                    href="/admin/jobs/1/applications"
                    className="fw-500 text-grey-500 font-xssss"
                  >
                    Student apply
                  </a>
                </li>
              </ul>

              <Link 
        to={getLink()}
        className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current"
      >
        VIEW JOBS
      </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Companies;

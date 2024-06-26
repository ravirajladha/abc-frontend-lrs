import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import {
  fetchCaseStudy,
  fetchCaseStudyMobile,
  deleteCaseStudyElement,
} from '@/api/admin';
import '../../../../public/assets/css/doc.css';
import '../../../../public/assets/css/image.css';

import {
  BackButton,
  ContentFallback,
  ContentLoader,
} from '@/components/common';
import DarkButton from '@/components/common/DarkButton';
import DefaultProfileImage from '@/assets/images/default/user.png';

import { getUserDataFromLocalStorage } from '@/utils/services';
import Paragraph from '@/components/admin/case-study/viewElements/Paragraph';
import { Points } from '@/components/admin/case-study/viewElements';
import Appendices from '@/components/admin/case-study/viewElements/Appendices';

function Show({ title, isAdmin, isMobile }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { caseStudyId } = useParams();

  const [loading, setLoading] = useState(true);
  const [isNavOpen, setNavOpen] = useState(false);
  const [visibleModule, setVisibleModule] = useState(null);

  const [caseStudy, setCaseStudy] = useState([]);
  const [caseStudyModules, setCaseStudyModules] = useState([]);

  // Initialize enableEdit state with false
  const [enableEdit, setEnableEdit] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  // for nav dropdowsns
  const toggleSections = (moduleId) => {
    // Toggle the visibility of sections for the clicked module
    setVisibleModule((prevVisibleModule) =>
      prevVisibleModule === moduleId ? null : moduleId
    );
  };

  const fetchData = async () => {
    let response;

    try {
      if (isMobile) {
        response = await fetchCaseStudyMobile(caseStudyId);
      } else {
        response = await fetchCaseStudy(caseStudyId);
      }
      setCaseStudy(response.caseStudy);
      setCaseStudyModules(response.caseStudy.modules);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (elementId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this Element?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteCaseStudyElement(elementId);
          fetchData();
          console.log(response);
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };
  useEffect(() => {
    // const userData = JSON.parse(getUserDataFromLocalStorage());
    // if (userData.type == 0) {
    //   // Set enableEdit to true
    //   setEnableEdit(true);
    // }
    if (isAdmin) {
      setEnableEdit(true);
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {loading ? (
        <div className="vh-100 d-flex align-items-center">
          <ContentLoader />
        </div>
      ) : (
        <div className="doc-body doc-white-body">
          <ToastContainer position="top-center" autoClose={3000} closeOnClick />
          <nav
            id="nav-scroll"
            className="side-nav left-nav navbar-expand-lg nav bg-white"
          >
            <button
              className={`navbar-toggler ${
                isNavOpen ? '' : 'collapsed'
              } ml-auto`}
              onClick={toggleNav}
              type="button"
            >
              {isNavOpen ? (
                <i className="feather-x"></i> // Close icon
              ) : (
                <i className="feather-menu"></i> // Menu icon
              )}
            </button>
            <div
              className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}
              id="navbar-toggle"
            >
              <ul
                className="list-unstyled"
                id="main-collapse"
                style={{
                  margin: 0,
                  padding: 0,
                  height: '100%',
                  overflowY: 'auto',
                  transition: 'height 0.3s ease-in-out',
                }}
              >
                <div
                  className="d-flex align-items-center px-2"
                  style={{ borderBottom: '1px solid', height: '80px' }}
                >
                  <h4 className="font-xs fw-700">Contents</h4>
                </div>
                {caseStudyModules
                  ? caseStudyModules.map((module, moduleIndex) => (
                      <li
                        key={module.id}
                        className="mt-3"
                        style={{
                          borderBottom: '1px solid #ddd',
                          padding: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          onClick={() => toggleSections(module.id)}
                          style={{
                            fontWeight: 700,
                            fontSize: '14px',
                          }}
                        >
                          {module.title}
                        </div>

                        {visibleModule === module.id && (
                          <ul style={{ paddingLeft: '10px' }}>
                            {module.sections.map((section, sectionIndex) => (
                              <li key={section.id}>
                                <ScrollLink
                                  to={section.id}
                                  spy={true}
                                  smooth={true}
                                  offset={-70}
                                  duration={500}
                                  className="nav-link"
                                  style={{
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    color: '#555',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {section.title}
                                </ScrollLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))
                  : ''}
              </ul>
            </div>
          </nav>
          <div className="main-content main-header" style={{ paddingLeft: '300px' }}>
            <div className="middle-sidebar-header bg-white">
              <button className="header-menu"></button>
              <div className=" d-inline-block float-left mb-0 text-grey-900">
                <h1
                  style={{
                    letterSpacing: '2px',
                    fontSize: '25px',
                    fontWeight: '700',
                    userSelect: 'none',
                  }}
                >
                  &nbsp;ATOMS&nbsp;
                </h1>
              </div>
{/* ATOMS header */}

              <ul className="d-flex ml-auto right-menu-icon">
                <DarkButton />

                <li>
                  <Link to={'#'}>
                    <img
                      src={DefaultProfileImage}
                      alt="user"
                      className="w40 mt--1 rounded-circle bg-white"
                    />
                  </Link>
                </li>
                <li>
                  <span className="menu-search-icon"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-container">
            <div className="doc-container">
              <div className="d-flex justify-content-between align-items-center">
                <h4 id="getting-started" className="doc-main-title border-0">
                  {caseStudy.title}
                </h4>
                <BackButton className="mx-2" />
              </div>

              <div id="" className="doc-wrapper">
                <div className="doc-preview d-flex justify-content-center">
                  <img
                    src={baseUrl + caseStudy.image}
                    alt="preview"
                    className="introduction-img"
                    style={{ width: '60%', height: 'auto' }}
                  />
                </div>
              </div>
              {caseStudyModules
                ? caseStudyModules &&
                  caseStudyModules.map((module, moduleIndex) => (
                    <div key={moduleIndex}>
                      <h4 id="content" className="doc-main-title">
                        {module.title}
                      </h4>

                      {module.sections ? (
                        module.sections.map((section, sectionIndex) => (
                          <div
                            id={section.id}
                            className="doc-wrapper"
                            key={sectionIndex}
                          >
                            <div className="d-flex justify-content-center">
                              <h6 className="doc-title custom-h6">
                                {section.title}{' '}
                              </h6>
                            </div>

                            {section.elements
                              ? section.elements.map((element, j) => (
                                  <div key={j} className="position-relative">
                                    {element.case_study_element_type_id ===
                                      1 && (
                                      <Paragraph
                                        element={element}
                                        caseStudyId={caseStudyId}
                                        moduleId={module.id}
                                        sectionId={section.id}
                                        elementId={element.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.case_study_element_type_id ===
                                      2 && (
                                      <Points
                                        element={element}
                                        caseStudyId={caseStudyId}
                                        moduleId={module.id}
                                        sectionId={section.id}
                                        elementId={element.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.case_study_element_type_id ===
                                      4 && (
                                      <Appendices
                                        element={element}
                                        caseStudyId={caseStudyId}
                                        moduleId={module.id}
                                        sectionId={section.id}
                                        elementId={element.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                  </div>
                                ))
                              : ''}
                          </div>
                        ))
                      ) : (
                        <h2 className="fw-400 font-lg d-block">Loading ... </h2>
                      )}
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;

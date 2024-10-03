import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import BackButton from '@/components/common/BackButton';
import DarkButton from '@/components/common/DarkButton';
import DefaultProfileImage from '@/assets/images/default/user.png';

import { fetchEbook, fetchEbookMobile, deleteEbookElement } from '@/api/admin';
import '../../../../public/assets/css/doc.css';
import '../../../../public/assets/css/image.css';

import {
  Example,
  ExampleImagePractice,
  ExamplePractice,
  ExampleVideoPractice,
  Gif,
  Heading,
  Image_1,
  Image_10_1,
  Image_10_2,
  Image_10_3,
  Image_2_1,
  Image_2_2,
  Image_2_3,
  Image_2_4,
  Image_3_1,
  Image_3_2,
  Image_4_1,
  Image_4_2,
  Image_4_3,
  Image_5_1,
  Image_5_2,
  Image_6_1,
  Image_6_2,
  Image_6_3,
  Image_7_1,
  Image_7_2,
  Image_8_1,
  Image_8_2,
  MultipleButtons,
  Paragraph,
  Points,
  SingleButton,
  TextBox,
} from '@/components/admin/eBook/viewElements';
import { ContentFallback, ContentLoader } from '@/components/common';

import { getUserDataFromLocalStorage } from '@/utils/services';
//show the buttons for realted case study or report
function Show({ title, isAdmin, isMobile }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { ebookId, moduleId, sectionId } = useParams();

  const [loading, setLoading] = useState(true);
  const [isNavOpen, setNavOpen] = useState(false);
  const [visibleModule, setVisibleModule] = useState(null);

  const [ebook, setEbook] = useState([]);
  const [ebookModules, setEbookModules] = useState([]);

  // Initialize enableEdit state with false
  const [enableEdit, setEnableEdit] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  // for nav dropdowns
  const toggleSections = (moduleId) => {
    // Toggle the visibility of sections for the clicked module
    setVisibleModule((prevVisibleModule) =>
      prevVisibleModule === moduleId ? null : moduleId
    );
  };

  const fetchData = async () => {
    let response;
    try {
      // for mobile devices view calling another api without token and authentication
      if (isMobile) {
        response = await fetchEbookMobile(ebookId);
      } else {
        response = await fetchEbook(ebookId);
        console.log("res", response);
      }
      setEbook(response.ebook);
      setEbookModules(response.ebook.modules);
      console.warn(response.ebook);
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
          const response = await deleteEbookElement(elementId);
          fetchData();
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

  // scroll to the section selected while creating video
  useEffect(() => {
    const scrollIfNeeded = () => {
      if (sectionId) {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          toggleSections(moduleId);
          sectionElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If element not found, check again after a short delay
          setTimeout(scrollIfNeeded, 1000);
        }
      }
    };
    scrollIfNeeded();
  }, [sectionId, moduleId]);
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
            className="side-nav left-nav navbar-expand-lg nav bg-white "
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
                {ebookModules
                  ? ebookModules.map((module, moduleIndex) => (
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
                {ebook?.project_report_id && (
                  <Link
                    to={`${isMobile ? '/mobile' : ''}/project-reports/${ebook?.project_report_id}/preview`}
                    className="font-xsss fw-600 text-grey-900 d-block px-4 py-3 border mt-4"
                    target="_blank"
                  >
                    Project Report
                  </Link>
                )}
                {ebook?.case_study_id && (
                  <Link
                    to={`${isMobile ? '/mobile' : ''}/case-studies/${ebook?.case_study_id}/preview`}
                    className="font-xsss fw-600 text-grey-900 d-block px-4 py-3 border"
                    target="_blank"
                  >
                    Case Study
                  </Link>
                )}
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
{/* atoms header */}

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
                  {ebook.title}
                </h4>
                <BackButton />
              </div>

              <div id="" className="doc-wrapper">
                <div className="doc-preview d-flex justify-content-center">
                  <img
                    src={baseUrl + ebook.image}
                    alt="preview"
                    className="introduction-img"
                    style={{ width: '30%', height: 'auto' }}
                  />
                </div>
              </div>
              {ebookModules
                ? ebookModules &&
                  ebookModules.map((module, moduleIndex) => (
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
                                  <div key={j}>
                                    {element.ebook_element_type_id === 1 && (
                                      <Heading
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 2 && (
                                      <Paragraph
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 3 && (
                                      <Image_1
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 4 &&
                                      element.image_type === 'image_2_1' && (
                                        <Image_2_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 4 &&
                                      element.image_type === 'image_2_2' && (
                                        <Image_2_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 4 &&
                                      element.image_type === 'image_2_3' && (
                                        <Image_2_3
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 4 &&
                                      element.image_type === 'image_2_4' && (
                                        <Image_2_4
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 5 &&
                                      element.image_type === 'image_3_1' && (
                                        <Image_3_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 5 &&
                                      element.image_type === 'image_3_2' && (
                                        <Image_3_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 6 &&
                                      element.image_type === 'image_4_1' && (
                                        <Image_4_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 6 &&
                                      element.image_type === 'image_4_2' && (
                                        <Image_4_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 6 &&
                                      element.image_type === 'image_4_3' && (
                                        <Image_4_3
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 7 &&
                                      element.image_type === 'image_5_1' && (
                                        <Image_5_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 7 &&
                                      element.image_type === 'image_5_2' && (
                                        <Image_5_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 8 &&
                                      element.image_type === 'image_6_1' && (
                                        <Image_6_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 8 &&
                                      element.image_type === 'image_6_2' && (
                                        <Image_6_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 8 &&
                                      element.image_type === 'image_6_3' && (
                                        <Image_6_3
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 9 &&
                                      element.image_type === 'image_7_1' && (
                                        <Image_7_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 9 &&
                                      element.image_type === 'image_7_2' && (
                                        <Image_7_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 10 &&
                                      element.image_type === 'image_8_1' && (
                                        <Image_8_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 10 &&
                                      element.image_type === 'image_8_2' && (
                                        <Image_8_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 11 &&
                                      element.image_type === 'image_10_1' && (
                                        <Image_10_1
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 11 &&
                                      element.image_type === 'image_10_2' && (
                                        <Image_10_2
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 11 &&
                                      element.image_type === 'image_10_3' && (
                                        <Image_10_3
                                          element={element}
                                          ebookId={ebookId}
                                          moduleId={module.id}
                                          enableEdit={enableEdit}
                                          onDelete={handleDelete}
                                        />
                                      )}
                                    {element.ebook_element_type_id === 12 && (
                                      <Points
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 13 && (
                                      <Example
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 14 && (
                                      <Gif
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 15 && (
                                      <ExamplePractice
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 16 && (
                                      <ExampleVideoPractice
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 17 && (
                                      <ExampleImagePractice
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 18 && (
                                      <MultipleButtons
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 19 && (
                                      <TextBox
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
                                        enableEdit={enableEdit}
                                        onDelete={handleDelete}
                                      />
                                    )}
                                    {element.ebook_element_type_id === 20 && (
                                      <SingleButton
                                        element={element}
                                        ebookId={ebookId}
                                        moduleId={module.id}
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

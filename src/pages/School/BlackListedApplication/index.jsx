import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';

import {
  fetchApplications,
  updateApplicationStatus,
  updateWhatsappStatus,
  storeApplicationRemark,
  fetchOldApplications,
  updateOldApplicationStatus,
  updateOldApplicationWhatsappStatus,
  storeOldApplicationRemark,
} from '@/api/school';
import { getUserDataFromLocalStorage } from '@/utils/services';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/dataTables.buttons';
import '../Application/style.css';
import {
  ApplicationTable,
  OldApplicationTable,
} from '@/components/school/application';

function Application({ title }) {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);
  const [message, setMessage] = useState('1');

  // For remark
  const [currentApplicationId, setCurrentApplicationId] = useState('');
  const [remark, setRemark] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState('');

  const fetchData = async (selectedStatus = '5') => {
    try {
      const response = await fetchApplications(selectedStatus);
      setApplications(response.applications);
      initializeDataTable();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initializeDataTable = () => {
    $(tableRef.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0,
        rightColumns: 4,
      },
      dom: 'Bfrtip', // Add this line to enable the Buttons extension
      buttons: [
        'excelHtml5', // Excel button
        'csvHtml5', // CSV button
        'pdfHtml5', // PDF button
        // 'print', // Print button
      ],
    });
  };

  const isValidNumber = (number) => {
    return number && !number.includes('-') && number.length >= 10; // Adjust the conditions as needed
  };

  const changeApplicationStatus = async (applicationIndex, newStatus) => {
    const updatedApplications = [...applications];
    updatedApplications[applicationIndex].application_status = newStatus;
    const applicationId = updatedApplications[applicationIndex].id;
    try {
      const submissionData = new FormData();
      submissionData.append('application_id', applicationId);
      submissionData.append('new_status', newStatus);
      submissionData.append('updated_by', userData.id);

      const response = await updateApplicationStatus(submissionData);

      const updatedApplications = [...applications];
      updatedApplications[applicationIndex].application_status = newStatus;
      setApplications(updatedApplications);

      toast.success('Application status updated successfully', response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const whatsappMessage1 = encodeURIComponent(
    '*Dear Parents*\nGreetings from Agasthya Vidyanikethan!\n\nI am happy to welcome you to the 2024-25 school year! We are looking forward to a productive partnership with you to ensure our children can achieve their highest potential. We recognize that to be successful in school, our children need support from both home and school. We know a strong partnership with you will make a significant difference in your child’s education. As partners, we share the responsibility for our children’s success and want you to know that we will do our very best to carry out our responsibilities.\nPlease know more about from the Website link given below\nhttps://av.school\n\nTo Watch the Demo Content, please click on the below link\nhttps://player.vimeo.com/video/655228863\n\nRegards,\nTeam Agasthya Vidyanikethan'
  );

  const whatsappMessage2 = encodeURIComponent(
    "Dear Parents,\n\nGreetings from Agasthya Vidyanikethan!\n\nWe are glad to announce the launch of our new website www.av.school with the updated and much awaited academic and non academic details of our institution. We hereby look forward to a productive collaboration with you to ensure our children's goals to the highest potential. Together, let us share the responsibility of building a strong citizen for our country.\n\nFor general queries please fill in the below mentioned google form.\n\nhttps://forms.gle/iKK7Av8agTBZQ7LW6\n\nFor admission related queries visit the below link.\n\nhttps://www.av.school/application\n\nPlease visit the website for more information\n\nThanking You,\n\nAgasthya Vidyanikethan"
  );

  const handleWhatsappClick = (applicationIndex, contact) => {
    // Update the status
    changeWhatsappStatus(applicationIndex, message);
    if (message === '1') {
      console.warn(message);
      window.open(
        `https://api.whatsapp.com/send?text=${whatsappMessage1}&phone=${contact}`,
        '_blank',
        'width=800,height=600'
      );
    } else if (message === '2') {
      console.warn(message);
      window.open(
        `https://api.whatsapp.com/send?text=${whatsappMessage2}&phone=${contact}`,
        '_blank',
        'width=800,height=600'
      );
    }
  };
  const changeWhatsappStatus = async (applicationIndex, messageType) => {
    const newStatus = 1;
    const updatedApplications = [...applications];
    const applicationId = updatedApplications[applicationIndex].id;

    try {
      const submissionData = new FormData();
      submissionData.append('application_id', applicationId);
      submissionData.append('new_status', newStatus);
      submissionData.append('message_type', messageType);

      const response = await updateWhatsappStatus(submissionData);

      // Update the correct whatsapp_status based on messageType
      if (messageType === '1') {
        updatedApplications[applicationIndex].whatsapp_status = newStatus;
      } else {
        updatedApplications[applicationIndex].whatsapp_status_2 = newStatus;
      }
      setApplications(updatedApplications);

      toast.success(
        'Application whatsapp status updated successfully',
        response
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal1 = () => setModalOpen(false);
  const handleAddRemark = (applicationId) => {
    setCurrentApplicationId(applicationId);
    setModalOpen(true);
  };

  const storeRemark = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append('application_id', currentApplicationId);
    submissionData.append('remark', remark);

    try {
      if (!remark.trim()) {
        // Show toaster message for empty note
        return;
      } else {
        const response = await storeApplicationRemark(submissionData);
        toast.success('Remark added successfully', response);

        // Update the state with the new remark
        const updatedApplications = applications.map((app) =>
          app.id === currentApplicationId
            ? { ...app, remarks: [...app.remarks, { remark }] }
            : app
        );
        setApplications(updatedApplications);
        setModalOpen(false);
        setRemark('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function for old aplication table
  const [oldApplications, setOldApplications] = useState([]);
  const [loadingOld, setLoadingOld] = useState(true);
  const tableRefOld = useRef(null);
  const [messageOld, setMessageOld] = useState('1');

  // For remark
  const [currentApplicationIdOld, setCurrentApplicationIdOld] = useState('');
  const [remarkOld, setRemarkOld] = useState('');
  const [modalOpenOld, setModalOpenOld] = useState(false);

  const fetchDataOld = async (selectedStatus = '5') => {
    try {
      const response = await fetchOldApplications(selectedStatus);
      setOldApplications(response.applications);
      console.log(response);
      initializeDataTableOld();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingOld(false);
    }
  };

  const initializeDataTableOld = () => {
    $(tableRefOld.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0,
        rightColumns: 4,
      },
      dom: 'Bfrtip', // Add this line to enable the Buttons extension
      buttons: [
        'excelHtml5', // Excel button
        'csvHtml5', // CSV button
        'pdfHtml5', // PDF button
        // 'print', // Print button
      ],
    });
  };

  const changeApplicationStatusOld = async (applicationIndex, newStatus) => {
    const updatedApplications = [...oldApplications];
    updatedApplications[applicationIndex].application_status = newStatus;
    const applicationId = updatedApplications[applicationIndex].id;

    try {
      const submissionData = new FormData();
      submissionData.append('application_id', applicationId);
      submissionData.append('new_status', newStatus);
      submissionData.append('updated_by', userData.id);

      const response = await updateOldApplicationStatus(submissionData);

      const updatedApplications = [...oldApplications];
      updatedApplications[applicationIndex].application_status = newStatus;
      setOldApplications(updatedApplications);

      toast.success('Application status updated successfully', response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleWhatsappClickOld = (applicationIndex, contact) => {
    // Update the status
    changeWhatsappStatusOld(applicationIndex, message);
    if (message === '1') {
      console.warn(message);
      window.open(
        `https://api.whatsapp.com/send?text=${whatsappMessage1}&phone=${contact}`,
        '_blank',
        'width=800,height=600'
      );
    } else if (message === '2') {
      console.warn(message);
      window.open(
        `https://api.whatsapp.com/send?text=${whatsappMessage2}&phone=${contact}`,
        '_blank',
        'width=800,height=600'
      );
    }
  };
  const changeWhatsappStatusOld = async (applicationIndex, messageType) => {
    const newStatus = 1;
    const updatedApplications = [...oldApplications];
    const applicationId = updatedApplications[applicationIndex].id;

    try {
      const submissionData = new FormData();
      submissionData.append('application_id', applicationId);
      submissionData.append('new_status', newStatus);
      submissionData.append('message_type', messageType);

      const response = await updateOldApplicationWhatsappStatus(submissionData);

      // Update the correct whatsapp_status based on messageType
      if (messageType === '1') {
        updatedApplications[applicationIndex].whatsapp_status = newStatus;
      } else {
        updatedApplications[applicationIndex].whatsapp_status_2 = newStatus;
      }
      setOldApplications(updatedApplications);

      toast.success(
        'Application whatsapp status updated successfully',
        response
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModalOld = () => setModalOpenOld(false);
  const handleAddRemarkOld = (currentApplicationIdOld) => {
    setCurrentApplicationIdOld(currentApplicationIdOld);
    setModalOpenOld(true);
  };

  const storeRemarkOld = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append('application_id', currentApplicationIdOld);
    submissionData.append('remark', remarkOld);
    const remark = remarkOld;
    try {
      if (!remarkOld.trim()) {
        // Show toaster message for empty note
        return;
      } else {
        const response = await storeOldApplicationRemark(submissionData);
        toast.success('Remark added successfully', response);

        // Update the state with the new remark
        const updatedApplications = oldApplications.map((app) =>
          app.id === currentApplicationIdOld
            ? { ...app, old_remarks: [...app.old_remarks, { remark }] }
            : app
        );
        setOldApplications(updatedApplications);
        setModalOpenOld(false);
        setRemarkOld('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataOld();
  }, []);
  return (
    <div>
      <ContentHeader title="Black Listed" subtitle="Applications" />
      {loading ? (
        <ContentLoader />
      ) : (
        applications &&
        (applications.length > 0 ? (
          <ApplicationTable
            applications={applications}
            changeApplicationStatus={changeApplicationStatus}
            handleWhatsappClick={handleWhatsappClick}
            handleAddRemark={handleAddRemark}
            tableRef={tableRef}
            isValidNumber={isValidNumber}
            setMessage={setMessage}
          />
        ) : (
          ''
        ))
      )}
      {loadingOld ? (
        <ContentLoader />
      ) : (
        oldApplications &&
        (oldApplications.length > 0 ? (
          <OldApplicationTable
            applications={oldApplications}
            changeApplicationStatus={changeApplicationStatusOld}
            handleWhatsappClick={handleWhatsappClickOld}
            handleAddRemark={handleAddRemarkOld}
            tableRef={tableRefOld}
            isValidNumber={isValidNumber}
            setMessage={setMessage}
          />
        ) : (
          ''
        ))
      )}
      {applications &&
      applications.length === 0 &&
      oldApplications &&
      oldApplications.length === 0 ? (
        <ContentFallback />
      ) : null}

      <Modal show={modalOpen} onHide={closeModal1}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="font-xss fw-500 pt-2">Remarks</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {currentApplicationId &&
              applications
                .find((app) => app.id === currentApplicationId)
                ?.remarks.map((remark, index) => (
                  <React.Fragment key={index}>
                    <li className="font-xss fw-500 text-dark">
                      &#9642; {remark.remark}
                    </li>
                  </React.Fragment>
                ))}
          </ul>
          <div className="form-group icon-input mb-3">
            <i className="font-sm ti-email text-grey-500 pr-0"></i>
            <input
              type="text"
              name="note"
              className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
              placeholder="Enter Remark.."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-1">
            <button
              type="submit"
              className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
              onClick={storeRemark}
            >
              Save{' '}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={modalOpenOld} onHide={closeModalOld}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="font-xss fw-500 pt-2">Remarks</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {currentApplicationIdOld &&
              oldapplications
                .find((app) => app.id === currentApplicationIdOld)
                ?.old_remarks.map((remark, index) => (
                  <React.Fragment key={index}>
                    <li className="font-xss fw-500 text-dark">
                      &#9642; {remark.remark}
                    </li>
                  </React.Fragment>
                ))}
          </ul>

          <div className="form-group icon-input mb-3">
            <i className="font-sm ti-email text-grey-500 pr-0"></i>
            <input
              type="text"
              name="note"
              className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
              placeholder="Enter Remark.."
              value={remarkOld}
              onChange={(e) => setRemarkOld(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-1">
            <button
              type="submit"
              className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
              onClick={storeRemarkOld}
            >
              Save{' '}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Application;

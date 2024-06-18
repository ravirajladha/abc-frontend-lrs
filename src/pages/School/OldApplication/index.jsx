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
  fetchOldApplications,
  updateOldApplicationStatus,
  updateOldApplicationWhatsappStatus,
  storeOldApplicationRemark,
  sendWhatsappMessage,
  sendOldWhatsappBulkMessage,
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
import { OldApplicationTable } from '@/components/school/application';

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

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);
  const [selectedMessageType, setSelectedMessageType] = useState('');

  const fetchData = async (selectedStatus = null) => {
    try {
      const response = await fetchOldApplications(selectedStatus);
      setApplications(response.applications);
      ;
      initializeDataTable();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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

      const response = await updateOldApplicationStatus(submissionData);

      const updatedApplications = [...applications];
      updatedApplications[applicationIndex].application_status = newStatus;
      setApplications(updatedApplications);

      toast.success('Application status updated successfully', response);
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleWhatsappClick = async (applicationIndex, contact) => {
     // Update the status
     let messageType;
     if (message === '1') {
       messageType = 'announcement_website';
     } else if (message === '2') {
       messageType = 'weclome_message1';
     }
     const response = await sendWhatsappMessage(contact, messageType);
     await changeWhatsappStatus(applicationIndex, message);
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

      const response = await updateOldApplicationWhatsappStatus(submissionData);

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
        const response = await storeOldApplicationRemark(submissionData);
        toast.success('Remark added successfully', response);

        // Update the state with the new remark
        const updatedApplications = applications.map((app) =>
          app.id === currentApplicationId
            ? { ...app, old_remarks: [...app.old_remarks, { remark }] }
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

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearch = () => {
    // Call the API with the selected status
    setLoading(true);
    fetchData(selectedStatus);
  };

  
  // for bulk message sent

  // Function to handle checkbox click events for individual rows
  const handleCheckboxChange = (id, phoneNumber) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        // If already selected, remove it from the array
        return prevSelectedIds.filter((item) => item !== id);
      } else {
        // If not selected, add it to the array
        return [...prevSelectedIds, id];
      }
    });

    setSelectedPhoneNumbers((prevSelectedPhoneNumbers) => {
      phoneNumber = parseInt(phoneNumber, 10);
      if (prevSelectedPhoneNumbers.includes(phoneNumber)) {
        // If already selected, don't remove it, just return the array
        return prevSelectedPhoneNumbers.filter((item) => item !== phoneNumber);
      } else {
        // If not selected, add it to the array
        return [...prevSelectedPhoneNumbers, parseInt(phoneNumber, 10)];
      }
    });
  };

  // Function to handle "Select All" checkbox click event
  const handleSelectAllChange = () => {
    const allPhoneNumbers = applications.map((application) =>
      // parseInt(application.f_contact, 10)
      isValidNumber(application.f_contact)
                                ? parseInt(application.f_contact, 10)
                                : isValidNumber(application.m_contact)
                                ? parseInt(application.m_contact, 10)
                                : ''
    );
    setSelectedIds((prevSelectedIds) => {
      // If all IDs are already selected, clear the selection
      if (prevSelectedIds.length === applications.length) {
        return [];
      } else {
        // Otherwise, select all IDs
        return applications.map((application) => application.id);
      }
    });

    setSelectedPhoneNumbers((prevSelectedPhoneNumbers) => {
      // If all phone numbers are already selected, clear the selection
      if (prevSelectedPhoneNumbers.length === allPhoneNumbers.length) {
        return [];
      } else {
        // Otherwise, select all phone numbers
        return allPhoneNumbers;
      }
    });
  };

  const handleMessageTypeChange = (event) => {
    setSelectedMessageType(event.target.value);
  };
  const handleWhatsappBulk = async (data) => {
    let messageType;
    if (selectedMessageType === '1') {
      messageType = 'announcement_website';
    } else if (selectedMessageType === '2') {
      messageType = 'weclome_message1';
    } else if (selectedMessageType === '3') {
      messageType = 'acids_bases_andsalts_1';
    } else if (selectedMessageType === '4') {
      messageType = 'acids_bases_andsalts_2';
    }

    const formData = new FormData();
    formData.append(
      'selectedPhoneNumbers',
      JSON.stringify(selectedPhoneNumbers)
    );
    formData.append('selectedIds', JSON.stringify(selectedIds));

    const response = await sendOldWhatsappBulkMessage(messageType, formData);
    // Update WhatsApp status to 1 for matching application IDs
    const updatedStatusApplications = applications.map((application) => {
      if (selectedIds.includes(application.id)) {
        return { ...application, whatsappStatus: 1 };
      }
      return application;
    });

    // Call updateStatus function with updated applications
    setApplications(updatedStatusApplications);
    setSelectedPhoneNumbers([]);
    setSelectedIds([]);

    toast.success('Meassage Sent successfully!');
  };
  return (
    <div>
      <ContentHeader
        title="Old"
        subtitle="Applications"
        buttons={[
          {
            link: `upload`,
            text: 'Upload Applications',
          },
        ]}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card border-0 mt-0 rounded-lg shadow-sm mb-2">
            <div className="card-body p-2 px-4 pb-0">
              <div className="row">
                <div className="col-lg-4">
                  <select
                    className="form-control"
                    aria-label="Select status"
                    onChange={handleStatusChange}
                    value={selectedStatus}
                  >
                    <option className="bg-light text-dark" value="" disabled>
                      --select--
                    </option>
                    <option className="bg-light text-dark" value="0">
                      Pending
                    </option>
                    <option className="bg-light text-dark" value="1">
                      School visit scheduled
                    </option>
                    <option className="bg-light text-dark" value="2">
                      Approved
                    </option>
                    <option className="bg-light text-dark" value="3">
                      Admitted
                    </option>
                    <option className="bg-light text-dark" value="4">
                      Waiting List
                    </option>
                    <option className="bg-light text-dark" value="5">
                      Black List
                    </option>
                  </select>
                </div>
                <div className=" col-lg-2">
                  <button
                    className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase border-0"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
                <div className="col-lg-4">
                  <select
                    className="form-control"
                    aria-label="Select status"
                    onChange={handleMessageTypeChange}
                    value={selectedMessageType}
                  >
                    <option className="bg-light text-dark" value="" disabled>
                      --select--
                    </option>
                    <option className="bg-light text-dark" value="1">
                      Announcement
                    </option>
                    <option className="bg-light text-dark" value="2">
                      Welcome
                    </option>
                    <option className="bg-light text-dark" value="3">
                      10th-Acids,bases,salts-1
                    </option>
                    <option className="bg-light text-dark" value="4">
                      10th-Acids,bases,salts-2
                    </option>
                  </select>
                </div>
                <div className=" col-lg-2">
                  <button
                    className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase border-0"
                    onClick={handleWhatsappBulk}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {loading ? (
          <ContentLoader />
        ) : (
          applications &&
          (applications.length > 0 ? (
            <OldApplicationTable
              applications={applications}
              changeApplicationStatus={changeApplicationStatus}
              handleWhatsappClick={handleWhatsappClick}
              handleAddRemark={handleAddRemark}
              tableRef={tableRef}
              isValidNumber={isValidNumber}
              setMessage={setMessage}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectAllChange={handleSelectAllChange}
              selectedIds={selectedIds}
            />
          ) : (
            <ContentFallback />
          ))
        )}
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
    </div>
  );
}

export default Application;

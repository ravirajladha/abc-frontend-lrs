import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/dataTables.buttons';

import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { NavTab, ApplicationTable } from '@/components/admin/internship-admin';

import { getApplications } from '@/api/admin';

function Application() {
  const { internshipAdminId } = useParams();

  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState(null);

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
        'print', // Print button
      ],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplications(internshipAdminId);
        setApplications(data.applications);
        initializeDataTable();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching internship admin applications:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [internshipAdminId]);

  return (
    <div className="px-2">
      <ContentHeader
        title="Applications"
        buttons={[
          {
            link: `/admin/internship-admin/${internshipAdminId}/edit`,
            text: 'Edit Internship Admin Details',
            iconClassName: 'feather-edit mr-2',
          },
        ]}
        backLink={'/admin/internship-admin'}
      />
      <NavTab internshipAdminId={internshipAdminId} />
      {loading ? (
        <div className="row my-5">
          <ContentLoader />
        </div>
      ) : (
        applications &&
        (applications.length > 0 ? (
          <ContentCardWrapper>
            <ApplicationTable applications={applications} tableRef={tableRef} />
          </ContentCardWrapper>
        ) : (
          <ContentFallback />
        ))
      )}
    </div>
  );
}

export default Application;

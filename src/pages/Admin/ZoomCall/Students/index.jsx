import { fetchSessionAttendies } from '@/api/admin';
import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { formatDateTime } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv'; // Import CSVLink from react-csv
import { FaDownload } from 'react-icons/fa';

function Index({ title }) {
  const { zoomCallId } = useParams();

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchSessionAttendies(zoomCallId);
      setStudentList(response.students);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare CSV data headers and rows
  const csvHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Clicked At', key: 'clicked_at' },
  ];

  const csvData = studentList.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    clicked_at: formatDateTime(item.clicked_at),
  }));

  return (
    <div>
      <ContentHeader title={title} />
      {loading ? (
        <ContentLoader />
      ) : studentList && studentList.length > 0 ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body d-flex justify-content-between pt-4 px-4 pb-0">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">{title}</h4>
                <CSVLink
                  data={csvData}
                  headers={csvHeaders}
                  filename={`students_session_${zoomCallId}.csv`}
                  className="btn bg-primary text-white d-flex font-xsss fw-500 px-2 rounded-xl"
                >
                  CSV <FaDownload className="ml-2 mt-1 font-xssss" />
                </CSVLink>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-admin mb-0">
                    <thead className="bg-greylight rounded-10">
                      <tr>
                        <th className="border-0" scope="col">
                          #
                        </th>
                        <th className="border-0" scope="col">
                          Name
                        </th>
                        <th className="border-0" scope="col">
                          Email
                        </th>
                        <th className="border-0" scope="col">
                          Clicked At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{formatDateTime(item.clicked_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContentFallback />
      )}
    </div>
  );
}

export default Index;

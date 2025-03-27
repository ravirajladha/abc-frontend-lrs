import { useEffect, useState } from 'react';
import { ContentHeader, ContentLoader } from '@/components/common';
import { useParams } from 'react-router';
import { generateCertificate } from '@/api/student';

function CoursesCertificate({ title }) {
  const { courseId } = useParams();
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleGenerateCertificate = async () => {
    try {
      const response = await generateCertificate(courseId);
      setFilePath(response.filePath);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGenerateCertificate();
  }, [courseId]);

const handleDownload = async () => {
    try {
        // Ensure the filePath is available before trying to download
        if (!filePath) {
            console.error('No file path available for download');
            return;
        }

        // Call your backend to download the certificate
        const response = await fetch(`${baseUrl}api/download-certificate?filePath=${encodeURIComponent(filePath)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is OK (200-299)
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'certificate.jpg'; // Change to the appropriate file name
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up the URL object
        } else {
            // Log the error response for debugging
            const errorResponse = await response.json();
            console.error('Failed to download file:', errorResponse);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  if (loading) return <ContentLoader />;
  return (
    <div>
      <ContentHeader title={title} />
      <div className="d-flex justify-content-center">
        <img
          src={baseUrl + filePath}
          alt="Certificate"
          style={{ height: '70vh' }}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn bg-success text-white font-xss" onClick={handleDownload}>
         <i className='feather-download'></i> Download
        </button>
      </div>
    </div>
  );
}

export default CoursesCertificate;

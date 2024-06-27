import React from 'react';
import { useParams } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;
import { ContentHeader, ContentLoader } from '@/components/common';

const CertificateViewer = () => {
  const { imageUrl } = useParams();
  const certificateUrl = baseUrl + "uploads/pass/" + decodeURIComponent(imageUrl); 

  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch(certificateUrl, {
  //       mode: 'cors',
  //     });
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'certificate.jpg'; // Set the file name for the download
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url); // Clean up the URL object
  //   } catch (error) {
  //     console.error('Failed to download the image:', error);
  //   }
  // };

  return (
    <>
      <ContentHeader
        title="Internship Tasks"
        // buttons={[
        //   {
        //     link: `create`,
        //     text: 'New Mini Project',
        //   },
        // ]}
      />
      <div style={styles.container}>
        <img src={certificateUrl} alt="Certificate" style={styles.image} />
        {/* <button onClick={handleDownload} style={styles.button}>
          Download Certificate
        </button> */}
      </div>
    </>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Optional: To provide a dark background
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  button: {
    position: 'absolute',
    bottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50', // Button background color
    color: 'white', // Button text color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CertificateViewer;

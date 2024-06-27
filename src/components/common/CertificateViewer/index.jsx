import React from 'react';

const CertificateViewer = ({ certificateUrl }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = 'certificate.jpg'; // You can set the file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <img src={certificateUrl} alt="Certificate" style={styles.image} />
      <button onClick={handleDownload} style={styles.button}>
        Download Certificate
      </button>
    </div>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FileDownload = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    axios.get(`https://192.168.1.113:3000/userfiles/${userId}`)
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, [userId]);

  const handleDownload = async () => {
    if (!selectedFile) {
      console.error('No file selected for download');
      return;
    }

    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      const response = await axios.get(`https://192.168.1.113:3000/download/${userId}/${selectedFile}`, {
        responseType: 'blob',
      });

      const fileBlob = new Blob([response.data]);
      const fileURL = URL.createObjectURL(fileBlob);

      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', selectedFile);
      link.click();

      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`https://192.168.1.113:3000/userfiles/${userId}/${filename}`);

      // Remove the deleted file from the state
      setFiles(files.filter(file => file.filename !== filename));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <h2>File Download</h2>
      <ul>
        {files.map(file => (
          <li key={file.id} onClick={() => setSelectedFile(file.filename)}>
            {file.filename}
            <button onClick={() => handleDelete(file.filename)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleDownload} disabled={!selectedFile}>
        Download Selected File
      </button>
    </div>
  );
};

export default FileDownload;

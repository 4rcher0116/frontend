import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileDownload = ( userId ) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    axios.get(`http://172.20.10.5:3000/userfiles/${userId}`)
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const handleDownload = async () => {
    // ... (existing code for file download)

  };

  return (
    <div>
      <style>
        {`
          #fileDropdown {
            color: black;
          }
        `}
      </style>
      <h2>File Download</h2>
      <label htmlFor="fileDropdown">Select a file:</label>
      <select
        id="fileDropdown"
        onChange={(e) => setSelectedFile(e.target.value)}
      >
        <option value="" disabled>Select a file</option>
        {files.map(file => (
          <option key={file.id} value={file.name}>
            {file.name}
          </option>
        ))}
      </select>
      <button onClick={handleDownload} disabled={!selectedFile}>
        Download Selected File
      </button>
    </div>
  );
};

export default FileDownload;

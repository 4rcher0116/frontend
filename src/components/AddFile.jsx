import React, { useState } from 'react';
import axios from 'axios';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`http://172.20.10.5:3000/upload/${userId}`, formData)
      .then(response => {
        console.log('File uploaded successfully');
        // Add logic for success, e.g., show a success message
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        // Add logic for error handling
      });
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadFile;


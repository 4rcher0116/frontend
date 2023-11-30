import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListFiles({ userId }) {
  const [files, setFiles] = useState([]);
  const apiKey = '$2b$10$rCsDXl9WU0uHkF6x61AN.u0w9DDG4BSVN3MX1Dy4NN/qrFI7GABgO';


  useEffect(() => {
    
    axios.get(`https://192.168.1.113:3000/userfiles/${userId}`, {
      headers : {
        'api-key':apiKey
      }
    })
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>List of Files for User {userId}</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.filename}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListFiles;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListFiles({ userId }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get(`http://172.20.10.5:3000/userfiles/${userId}`)
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


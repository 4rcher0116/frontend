import React from 'react';
import UploadFile from './components/AddFile';
import ListFiles from './components/ListFiles';
import FileDownload from './components/DownloadFile';

function App() {
  const userId = '2'; // Replace with your user ID

  return (
    <div>
      <UploadFile />
      <ListFiles userId={userId} />
      <FileDownload userId = {userId} />
    </div>
  );
}

export default App;


import React from 'react';

const ImportingFiles = ({ handleFileUpload }: any) => {
  return (
    <div className='border border-blue-900 w-56 flex flex-col'>
      <p>PUTTING SONGS HERE</p>
      <input type='file' onChange={handleFileUpload} />
    </div>
  );
};

export default ImportingFiles;

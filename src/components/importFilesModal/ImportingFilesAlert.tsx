import React from 'react';

interface ImportingFilesAlertProps {
  message: string;
}

const ImportingFilesAlert: React.FC<ImportingFilesAlertProps> = ({
  message,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur'>
      <p className='text-2xl p-4 rounded-lg  shadow-lg text-white'>{message}</p>
    </div>
  );
};

export default ImportingFilesAlert;

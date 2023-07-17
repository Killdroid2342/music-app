import React from 'react';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-center text-2xl'>Error 404</h1>
      <p className='text-center text-2xl '>Page Not Found</p>
      <p className='mt-2'>
        Hey there user. Something went wrong. Try relaunching page {':)'}
      </p>
    </div>
  );
};

export default NotFound;

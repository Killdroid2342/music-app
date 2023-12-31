import React from 'react';

const ViewProfileModal = ({ userProfileModal, setUserProfileModal }: any) => {
  const closeModal = () => {
    setUserProfileModal(false);
  };
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black'>
      <div className='bg-white p-8 rounded-lg overflow-auto max-w-md w-full'>
        <button
          className='absolute top-4 right-4 text-white'
          onClick={closeModal}
        >
          X
        </button>
        <h1 className='text-black text-center'>USER PROFILE NAME GOES HERE</h1>
        <img src='' alt='Img goes here' className='text-black text-center' />
      </div>
    </div>
  );
};

export default ViewProfileModal;

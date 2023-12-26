import React, { useState } from 'react';

const EditProfileModal = ({
  setProfileModal,
  updateProfileData,
  currentProfileData,
}: any) => {
  const [description, setDescription] = useState('');
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const closeModal = () => {
    setProfileModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
  };

  const handleProfileData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userProfileData = {
      description: description,
      profileImage: profileFile
        ? URL.createObjectURL(profileFile)
        : currentProfileData.profileImage,
    };

    updateProfileData(userProfileData);

    setProfileModal(false);
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
        <form className='flex flex-col' onSubmit={handleProfileData}>
          <label className='mb-2 text-lg font-semibold text-gray-800'>
            Change Description
          </label>
          <input
            className='p-2 border border-gray-300 rounded-md mb-4 text-black'
            placeholder='Write a new description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className='mb-2 text-lg font-semibold text-gray-800'>
            Change Image
          </label>
          <input
            type='file'
            className='p-2 border border-gray-300 rounded-md mb-4'
            accept='image/*'
            onChange={handleFileUpload}
          />

          <input
            type='submit'
            value='Submit'
            className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

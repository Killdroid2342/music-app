import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import EditProfileModal from '../components/EditProfileModal';
import Nav from '../components/Nav';

const Profile = () => {
  const [profileModal, setProfileModal] = useState(false);
  const [clientUsername, setClientUsername] = useState('');
  const [profileData, setProfileData] = useState({
    description: 'This is the default description',
    profileImage: '/pfpimage.png',
  });

  const usernameJWT = () => {
    const getJWT = Cookies.get('UserjwtToken');
    if (getJWT) {
      const decodedTokenUsername = (decodeToken(getJWT) as { username: string })
        .username;
      setClientUsername(decodedTokenUsername);
    } else return;
  };

  useEffect(() => {
    usernameJWT();
  }, []);

  const editProfile = () => {
    setProfileModal(true);
  };

  const updateProfileData = (newData: any) => {
    setProfileData({
      ...profileData,
      ...newData,
    });
  };

  return (
    <>
      <Nav clientUsername={clientUsername} />
      <div className='container mx-auto my-8 p-8 bg-white shadow-lg rounded-md'>
        <h1 className='text-center text-3xl font-bold mb-6 text-gray-700'>
          Profile
        </h1>
        <div className='flex flex-col items-center'>
          <img
            src={profileData.profileImage}
            alt='pfp image'
            className='w-40 h-40 rounded-full mb-4'
          />
          <p className='text-lg font-semibold text-gray-700'>
            Account Name: {clientUsername}
          </p>
          <p className='text-sm text-gray-500 p-3'>Added Friends: 100</p>
          <p className='text-sm text-gray-700 mb-6'>
            Description: {profileData.description}
          </p>
          <button
            onClick={editProfile}
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Edit Profile
          </button>
        </div>

        {profileModal && (
          <EditProfileModal
            setProfileModal={setProfileModal}
            updateProfileData={updateProfileData}
            currentProfileData={profileData}
          />
        )}
      </div>
    </>
  );
};

export default Profile;

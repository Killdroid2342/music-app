import { useState } from 'react';
import AccountSettingsModal from './SavedSongs/AccountSettings/AccountSettingsModal';
import { useNavigate } from 'react-router-dom';

const Nav = ({ clientUsername }: any) => {
  const [isAccountSettingsModalOpen, setAccountSettingsModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const openSettings = () => {
    setAccountSettingsModalOpen(true);
  };

  return (
    <div className='flex flex-col items-center bg-neutral-700 border border-white'>
      <h2 className='font-bold text-lg my-2'>Account: {clientUsername}</h2>
      <div className='flex flex-row'>
        <p
          onClick={openSettings}
          className='text-center border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
        >
          Account Settings
        </p>
        <p
          onClick={() => navigate('/social')}
          className='text-center border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
        >
          Social
        </p>
        <p
          onClick={() => navigate('/main')}
          className='text-center border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
        >
          Music Page
        </p>
        <p
          onClick={() => navigate('/friends')}
          className='text-center border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
        >
          Friends
        </p>
        <p
          onClick={() => navigate('/Profile')}
          className='text-center border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
        >
          Profile
        </p>
      </div>
      {isAccountSettingsModalOpen && (
        <AccountSettingsModal
          setAccountSettingsModalOpen={setAccountSettingsModalOpen}
          clientUsername={clientUsername}
        />
      )}
    </div>
  );
};

export default Nav;

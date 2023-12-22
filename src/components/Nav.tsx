import React, { useState } from 'react';
import AccountSettingsModal from './SavedSongs/AccountSettings/AccountSettingsModal';

const Nav = ({ clientUsername }: any) => {
  const [isAccountSettingsModalOpen, setAccountSettingsModalOpen] =
    useState(false);
  const openSettings = () => {
    setAccountSettingsModalOpen(true);
  };
  return (
    <div className='flex flex-col justify-center'>
      <h2 className='font-bold text-lg text-center'>
        Account: {clientUsername}
      </h2>

      <p
        onClick={openSettings}
        className='text-center border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
      >
        Account Settings
      </p>
      <p className='text-center border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'>
        Nav
      </p>
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

import Nav from '../components/Nav';
import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
const Social = () => {
  const [clientUsername, setClientUsername] = useState('');
  console.log(clientUsername);
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
  });
  return (
    <div className='min-h-screen flex flex-col'>
      <Nav clientUsername={clientUsername} />
      <h1 className='text-center text-3xl mt-5 mb-5 font-bold'>
        Search For Users
      </h1>
      <form
        action=''
        className='mt-4 flex flex-col items-center justify-center'
      >
        <input
          type='text'
          placeholder='Search For Users'
          className='p-3 w-72 rounded-3xl bg-neutral-700 transition-all duration-700 focus:border-white'
        />
      </form>
    </div>
  );
};

export default Social;

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
      <div className='flex-1 flex items-center justify-center'>
        <form
          action=''
          className='mt-4 flex flex-col items-center justify-center'
        >
          <input
            type='text'
            placeholder='Search For Users'
            className='border border-red-900 p-2'
          />
        </form>
      </div>
    </div>
  );
};

export default Social;

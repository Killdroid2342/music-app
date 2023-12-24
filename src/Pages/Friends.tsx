import Nav from '../components/Nav';
import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
const Friends = () => {
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
      <h1 className='text-center'>Here are the people you added</h1>
    </div>
  );
};

export default Friends;

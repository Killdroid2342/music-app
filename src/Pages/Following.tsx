import Nav from '../components/Nav';
import { useState, useEffect } from 'react';
const { VITE_API_URL } = import.meta.env;

import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import axios from 'axios';

const Following = () => {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });

  const [clientUsername, setClientUsername] = useState('');

  console.log(clientUsername);

  const usernameJWT = () => {
    const getJWT = Cookies.get('UserjwtToken');
    if (getJWT) {
      const decodedTokenUsername = (decodeToken(getJWT) as { username: string })
        .username;
      setClientUsername(decodedTokenUsername);
    } else {
      console.log('error getting JWT');
    }
  };

  useEffect(() => {
    usernameJWT();
  }, [clientUsername]);

  return (
    <>
      <Nav clientUsername={clientUsername} />
      <h1 className='text-center text-3xl mt-5 mb-5 font-bold'>
        Here are the people you follow
      </h1>
      {/* to get the amount you find the length of how many accounts you follow */}
      <p>Accounts you follow</p>
      {/* MAP OUT ACCOUNTS YOU FOLLOW AND FILTER DEPENDING ON CLIENTUSERNAME */}
    </>
  );
};

export default Following;

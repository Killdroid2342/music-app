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
  const [followingAmount, setFollowingAmount] = useState<any>({
    following: 0,
  });
  console.log(clientUsername);
  console.log(followingAmount);

  const getFollowingAmount = async () => {
    try {
      const res = await instance.post('/user/getfollowercount', {
        username: clientUsername,
      });
      setFollowingAmount(res.data);
    } catch (error) {
      console.error('Error fetching following amount:', error);
    }
  };

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
    getFollowingAmount();
  }, [clientUsername]);

  return (
    <>
      <Nav clientUsername={clientUsername} />
      <h1 className='text-center text-3xl mt-5 mb-5 font-bold'>
        Here are the people you follow
      </h1>
      <p>Following: {followingAmount[0]?.following}</p>
      <p>Accounts you follow</p>
    </>
  );
};

export default Following;

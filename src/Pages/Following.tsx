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
  const [followingAmount, setFollowingAmount] = useState();
  console.log(clientUsername);
  const getFollowingAmount = async () => {
    const res = await instance.post('/user/getfollowercount', {
      username: clientUsername,
    });
    setFollowingAmount(res.data);
  };
  console.log(followingAmount);
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
    // getFollowingAmount();
  });
  useEffect(() => {}, []);
  return (
    <>
      <Nav clientUsername={clientUsername} />
      <h1 className='text-center text-3xl mt-5 mb-5 font-bold'>
        Here are the people you follow
      </h1>
      {/* <p>{followingAmount[0].followers}</p> */}
    </>
  );
};

export default Following;

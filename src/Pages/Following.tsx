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
  const [lengthOfFollowers, setLengthOfFollowers] = useState(0);
  const [following, setFollowing] = useState([{}]);

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

  const FollowingUsers = async () => {
    try {
      const res = await instance.get(`/user/following-users/${clientUsername}`);

      setFollowing(res.data);
      setLengthOfFollowers(following.length);
    } catch (error) {
      console.error('Error fetching following users', error);
    }
  };

  useEffect(() => {
    usernameJWT();
    if (clientUsername) {
      FollowingUsers();
    }
  }, [clientUsername]);

  return (
    <>
      <Nav clientUsername={clientUsername} />
      <h1 className='text-center text-3xl mt-5 mb-5 font-bold'>
        Here are the people you follow
      </h1>
      <p className='text-center text-2xl'>
        Accounts you follow: {lengthOfFollowers}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
        {following.map((following: any, key: any) => (
          <div key={key} className='bg-gray-200 p-4 rounded-md'>
            <p className='text-center text-lg font-semibold text-neutral-900 p-4'>
              {following.target_account}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Following;

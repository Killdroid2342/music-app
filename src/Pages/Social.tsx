import Nav from '../components/Nav';
import { useState, useEffect } from 'react';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import ViewProfileModal from '../components/ViewProfileModal';

interface Users {
  username: string;
}

const Social = () => {
  const [clientUsername, setClientUsername] = useState('');
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [followingUsers, setFollowingUsers] = useState({});
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });

  const usernameJWT = () => {
    const getJWT = Cookies.get('UserjwtToken');
    if (getJWT) {
      const decodedTokenUsername = (decodeToken(getJWT) as { username: string })
        .username;
      setClientUsername(decodedTokenUsername);
    }
  };

  useEffect(() => {
    usernameJWT();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchValue(value);
    if (value) {
      const res = await instance.post('/user/search', {
        searchItem: value,
      });
      setAllUsers(res.data);
    } else {
      setAllUsers([]);
    }
  };

  const openUserProfileModal = () => {
    setUserProfileModal(true);
  };
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
          value={searchValue}
          onChange={handleChange}
          placeholder='Search For Users'
          className='p-3 w-72 rounded-3xl bg-neutral-700 transition-all duration-700 focus:border-white'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
          {allUsers.map((item, index) => (
            <div key={index} className='bg-gray-200 p-4 rounded-md'>
              <p className='text-center text-lg font-semibold text-neutral-900 p-4'>
                {item.username}
              </p>
              <img src='' alt='IMG GOES HERE' />
              <div className='flex flex-col justify-evenly'>
                <input
                  type='button'
                  className='text-center font-semibold text-neutral-900 border border-neutral-700 p-2 m-2 rounded-lg cursor-pointer'
                />
                <p
                  className='text-center text-black cursor-pointer'
                  onClick={openUserProfileModal}
                >
                  View Profile
                </p>
              </div>
            </div>
          ))}
        </div>
      </form>
      {userProfileModal && (
        <ViewProfileModal
          userProfileModal={userProfileModal}
          setUserProfileModal={setUserProfileModal}
        />
      )}
    </div>
  );
};

export default Social;

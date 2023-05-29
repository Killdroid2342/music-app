import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

export default function SavedSongs({ handleSongClick, songs }: any) {
  const [clientUsername, setClientUsername] = useState('');

  const navigate = useNavigate();
  const backToHome = () => {
    Cookies.remove('UserjwtToken');
    navigate('/');
  };
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
    <div className='border border-white flex flex-col bg-neutral-700 text-center p-2'>
      <h2 className='font-bold text-lg'>Account: {clientUsername}</h2>
      <h2
        onClick={backToHome}
        className='border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
      >
        Log Out
      </h2>
      <h2 className='text-xl font-bold'>This is your Queue</h2>
      {songs.map((song: any, index: any) => (
        <p
          key={index}
          onClick={() => handleSongClick(song)}
          className='cursor-pointer text-black bg-white font-bold border border-neutral-900 rounded-lg'
        >
          {song.name}
        </p>
      ))}
    </div>
  );
}

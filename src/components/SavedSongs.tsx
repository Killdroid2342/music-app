import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

export default function SavedSongs({ handleSongClick, songs }: any) {
  const navigate = useNavigate();
  const backToHome = () => {
    Cookies.remove('UserjwtToken');
    navigate('/');
  };
  const usernameJWT = () => {
    const getJWT = Cookies.get('UserjwtToken');
    const decodedToken = decodeToken(getJWT);
    console.log(getJWT);
    console.log(decodedToken);
  };
  useEffect(() => {
    usernameJWT();
  });
  return (
    <div className='border border-white flex flex-col bg-neutral-700 text-center p-2'>
      <h2>Account: {}</h2>
      <h2 onClick={backToHome} className='border border-white'>
        Log Out
      </h2>
      <h2 className='text-xl font-bold'>This is your Queue</h2>
      {songs.map((song: any, index: any) => (
        <p
          key={index}
          onClick={() => handleSongClick(song)}
          className='cursor-pointer text-black bg-white font-bold'
        >
          {song.name}
        </p>
      ))}
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect } from 'react';
const { VITE_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_API_URL,
});
export default function SavedSongs({
  clientUsername,
  songs,
  choosingSong,
  removeSong,
}: any) {
  const navigate = useNavigate();
  const backToHome = () => {
    Cookies.remove('UserjwtToken');
    navigate('/');
  };
  const gettingSongs = async (username: any) => {
    if (username) {
      const res = await instance.post(`songs/get-songs`, {
        clientUsername: username,
      });
      console.log(res);
    }
  };

  useEffect(() => {
    gettingSongs(clientUsername);
  }, [clientUsername]);
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
      {songs.map((song: any, index: number) => (
        <div className='flex justify-center items-center mt-5' key={index}>
          <p
            className='border cursor-pointer p-2 text-center'
            onClick={() => choosingSong(song.musicFileName)}
          >
            {song.songName}
          </p>
          <p
            className='border cursor-pointer p-2 ml-2 text-center'
            onClick={() => removeSong(index)}
          >
            x
          </p>
        </div>
      ))}
    </div>
  );
}

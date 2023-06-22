import React from 'react';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export default function SavedSongs({ clientUsername, backToHome, songs }: any) {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });

  const handleSongClick = async (songName: string) => {
    try {
      const res = await instance.get(`/song/:${encodeURIComponent(songName)}`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

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
        <p
          className='border cursor-pointer'
          key={index}
          onClick={() => handleSongClick(song.songName)}
        >
          {song.songName}
        </p>
      ))}
    </div>
  );
}

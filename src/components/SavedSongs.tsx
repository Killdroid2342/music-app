import React, { useState } from 'react';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export default function SavedSongs({ clientUsername, backToHome, songs }: any) {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });

  const [currentSong, setCurrentSong] = useState<HTMLAudioElement | null>(null);

  const handleSongClick = async (musicFileName: string) => {
    if (currentSong) {
      currentSong.pause();
      currentSong.currentTime = 0;
    }

    try {
      const audio = new Audio(
        `${VITE_API_URL}/songs/song/${encodeURIComponent(musicFileName)}`
      );
      setCurrentSong(audio);
      audio.play();
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
          onClick={() => handleSongClick(song.musicFileName)}
        >
          {song.songName}
        </p>
      ))}
    </div>
  );
}

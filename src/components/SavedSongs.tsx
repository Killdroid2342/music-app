import React, { useState } from 'react';
import axios from 'axios';

export default function SavedSongs({
  clientUsername,
  backToHome,
  songs,
  choosingSong,
}: any) {
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
          onClick={() => choosingSong(song.musicFileName)}
        >
          {song.songName}
        </p>
      ))}
    </div>
  );
}

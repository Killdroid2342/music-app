import React from 'react';

export default function SavedSongs({ handleSongClick, songs }: any) {
  return (
    <div className='border border-white flex flex-col bg-neutral-700 text-center p-2'>
      <h2>Account: {'ADMIN'}</h2>
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

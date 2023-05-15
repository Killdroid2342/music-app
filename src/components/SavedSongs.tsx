import React from 'react';

export default function SavedSongs({ handleSongClick, songs }: any) {
  return (
    <div className='border border-white flex flex-col bg-neutral-700 text-center'>
      <h2>This is your Queue</h2>
      {songs.map((song: any, index: any) => (
        <p
          key={index}
          onClick={() => handleSongClick(song)}
          className='cursor-pointer border border-red-900 text-black bg-white font-bold'
        >
          {song.name}
        </p>
      ))}
    </div>
  );
}

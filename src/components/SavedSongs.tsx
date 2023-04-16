import React from 'react';

export default function SavedSongs({ handleSongClick, songs }: any) {
  return (
    <div className='border border-white'>
      <p>Uploaded Songs Here</p>
      <div className='border border-white'></div>
      <div className='flex flex-col'>
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
      <div className='w-full border border-green-900 mt-5'></div>
      <p>Create Playlist</p>
    </div>
  );
}

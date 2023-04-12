import React from 'react';

const SavedSongs = ({ handleSongClick, songs }: any) => {
  return (
    <div className='border border-white'>
      <p>SONGS HERE</p>
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
      <div className='w-full border border-white'></div>
    </div>
  );
};

export default SavedSongs;

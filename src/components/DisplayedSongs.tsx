import React from 'react';

const DisplayedSongs = ({ setCurrentSong, audioRef, currentSong }: any) => {
  return (
    <div className='border-dashed border border-purple-900 h-3/5 w-3/5 mt-4'>
      {currentSong?.dataUrl ? (
        <audio
          ref={audioRef}
          controls={false}
          onEnded={() => setCurrentSong(null)}
          onError={() => setCurrentSong(null)}
        >
          <source src={currentSong.dataUrl} type='audio/mpeg' />
        </audio>
      ) : (
        <p>IMG</p>
      )}
    </div>
  );
};

export default DisplayedSongs;

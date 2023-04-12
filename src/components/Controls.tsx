import React from 'react';

const Controls = ({
  handleVolumeChange,
  handlePlayPauseClick,
  isPlaying,
  handleSkipBackwardClick,
  handleSkipForwardClick,
}: any) => {
  return (
    <>
      <div className='border border-white w-full flex flex-row justify-evenly'>
        <div className='border border-red-900 p-3 cursor-pointer flex flex-col'>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            onChange={handleVolumeChange}
          />
          Music Volume
        </div>

        <div className='flex flex-row border border-blue-400'>
          <p className='border border-blue-900 p-3 cursor-pointer'>{'<<'}</p>
          <p
            className='border border-blue-900 p-3 cursor-pointer'
            onClick={handlePlayPauseClick}
          >
            {'No Songs' ? <>{isPlaying ? '▐▐' : ' ▶ '}</> : 'Song Name'}
          </p>
          <p className='border border-blue-900 p-3 cursor-pointer'>{'>>'}</p>
        </div>
        <div className='flex flex-row border border-green-400'>
          <p
            className='border border-green-900 p-3 cursor-pointer'
            onClick={handleSkipBackwardClick}
          >
            Back 10
          </p>
          <p
            className='border border-green-900 p-3 cursor-pointer'
            onClick={handleSkipForwardClick}
          >
            Forward 10
          </p>
        </div>
      </div>
      <div className='border border-purple-900 w-full text-center mt-20'>
        Progress Bar
      </div>
    </>
  );
};

export default Controls;

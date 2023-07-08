import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Controls({
  isPlaying,
  audioRef,
  currentSong,
  songs,
  progress,
  handleVolumeChange,
  volume,
  handlePreviousSongClick,
  handlePlayPauseClick,
  handleNextSongClick,
  handleRestartSongClick,
}: any) {
  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 border border-white w-full flex flex-row justify-evenly bg-neutral-700 rounded-lg'>
        <ProgressBar
          progress={progress}
          currentSong={currentSong}
          audioRef={audioRef}
        />
        <div className='border border-white p-3 flex flex-col rounded-lg'>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            onChange={handleVolumeChange}
            className='cursor-pointer'
          />
          <p className='text-center mt-2'>Music Volume: {volume}</p>
        </div>

        <div className='flex flex-row'>
          <p
            className='border border-white p-3 cursor-pointer rounded-lg'
            onClick={handlePreviousSongClick}
          >
            {currentSong && songs.length > 1 ? '⏮' : '⏮'}
          </p>
          <p
            className='border border-white p-3 cursor-pointer rounded-lg'
            onClick={handlePlayPauseClick}
          >
            {currentSong ? (isPlaying ? '⏸' : '▶️') : '⏸'}
          </p>
          <p
            className='border border-white p-3 cursor-pointer rounded-lg'
            onClick={handleNextSongClick}
          >
            ⏭
          </p>
        </div>

        <div className='flex flex-row'>
          <p
            className='border border-white p-3 cursor-pointer rounded-lg'
            onClick={handleRestartSongClick}
          >
            🔄
          </p>
        </div>
      </div>
    </>
  );
}

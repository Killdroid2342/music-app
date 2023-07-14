import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Controls({
  isPlaying,
  audioRef,
  currentSong,
  songs,
  progress,
  volume,
  setIsPlaying,
  setVolume,
  setCurrentSong,
}: any) {
  const handleRestartSongClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const handlePlayPauseClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setVolume(volume);
  };
  const handlePreviousSongClick = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song: any) => song === currentSong);
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[previousIndex]);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    }
    console.log(currentSong);
  };
  const handleNextSongClick = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song: any) => song === currentSong);
      const previousIndex = (currentIndex + 1 + songs.length) % songs.length;
      setCurrentSong(songs[previousIndex]);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    }
    console.log(currentSong);
  };
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

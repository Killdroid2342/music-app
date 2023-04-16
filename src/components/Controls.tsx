import React from 'react';

export default function Controls({
  isPlaying,
  audioRef,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  songs,
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

  const handleSkipBackwardClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleSkipForwardClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
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
  };
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
          <p
            className='border border-blue-900 p-3 cursor-pointer'
            onClick={handlePreviousSongClick}
          >
            {currentSong && songs.length > 1
              ? 'Previous Song'
              : 'No Previous Song'}
          </p>
          <p
            className='border border-blue-900 p-3 cursor-pointer'
            onClick={handlePlayPauseClick}
          >
            {currentSong ? (isPlaying ? '▐▐' : ' ▶ ') : 'No Songs'}
          </p>
          <p
            className='border border-blue-900 p-3 cursor-pointer'
            onClick={handleNextSongClick}
          >
            {currentSong && songs.length > 1 ? 'Next Song' : 'No Next Song'}
          </p>
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
          <p
            className='border border-green-900 p-3 cursor-pointer'
            onClick={handleRestartSongClick}
          >
            Restart Song
          </p>
        </div>
      </div>
    </>
  );
}

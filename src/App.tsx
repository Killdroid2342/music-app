import React, { useState, useRef } from 'react';

interface Song {
  name: string;
  dataUrl: string;
}

export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string | undefined;
      if (!result) return;

      const newSong: Song = {
        name: file.name,
        dataUrl: result,
      };
      setSongs([...songs, newSong]);
    };
    reader.readAsDataURL(file);
  };

  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
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

  return (
    <>
      <h1 className='text-center text-3xl font-bold font-mono'>Music Player</h1>
      <div className='flex flex-row h-screen'>
        <div className='border border-white'>
          <p>SONGS HERE</p>
          <div className='border border-white'></div>
          <div className='flex flex-col'>
            {songs.map((song, index) => (
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
        <div className='border border-red-900 w-10/12 flex flex-col justify-center items-center'>
          <p className='mt-4'>{currentSong?.name ?? 'Song Name'}</p>
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
          <div className='border border-white w-full flex flex-row justify-evenly'>
            <div className='border border-red-900 p-3 cursor-pointer'>
              Music Volume
            </div>

            <div className='flex flex-row border border-blue-400'>
              <p className='border border-blue-900 p-3 cursor-pointer'>
                {'<<'}
              </p>
              <p
                className='border border-blue-900 p-3 cursor-pointer'
                onClick={handlePlayPauseClick}
              >
                {currentSong ? <>{isPlaying ? '▐▐' : ' ▶ '}</> : 'Song Name'}
              </p>
              <p className='border border-blue-900 p-3 cursor-pointer'>
                {'>>'}
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
            </div>
          </div>
          <div className='border border-purple-900 w-full text-center mt-20'>
            Music bar
          </div>
        </div>
        <div className='border border-blue-900 w-56 flex flex-col'>
          <p>PUTTING SONGS HERE</p>
          <input type='file' onChange={handleFileUpload} />
        </div>
      </div>
    </>
  );
}

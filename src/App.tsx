import React, { useState, useRef } from 'react';
import SavedSongs from './components/SavedSongs';
import Controls from './components/Controls';
import ImportingFiles from './components/ImportingFiles';

interface Song {
  name: string;
  dataUrl: string;
}

export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);

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
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
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
        <SavedSongs handleSongClick={handleSongClick} songs={songs} />
        <div className='border border-red-900 w-10/12 flex flex-col justify-center items-center'>
          <p className='mt-4 text-2xl'>{currentSong?.name ?? 'Song Name'}</p>

          {currentSong?.dataUrl ? (
            <audio
              ref={audioRef}
              controls={false}
              onEnded={() => setCurrentSong(null)}
              onError={() => setCurrentSong(null)}
              onTimeUpdate={() => {
                if (audioRef.current) {
                  const progress =
                    (audioRef.current.currentTime / audioRef.current.duration) *
                    100;
                  setProgress(progress);
                }
              }}
            >
              <source src={currentSong.dataUrl} type='audio/mpeg' />
            </audio>
          ) : null}

          <Controls
            handleVolumeChange={handleVolumeChange}
            handlePlayPauseClick={handlePlayPauseClick}
            isPlaying={isPlaying}
            handleSkipBackwardClick={handleSkipBackwardClick}
            handleSkipForwardClick={handleSkipForwardClick}
          />
          <div
            className='border border-purple-900 w-full text-center mt-20'
            style={{
              backgroundColor: '#FFF', // Set the background color to a shade of red
              height: '10px', // Set the height of the progress bar
              width: '100%', // Set the width to 100%
              position: 'relative', // Set the position to relative
            }}
          >
            <div
              style={{
                position: 'absolute', // Set the position to absolute
                top: 0,
                bottom: 0,
                left: 0,
                backgroundColor: '#8B0000', // Set the background color to a lighter shade of red
                width: `${progress}%`, // Set the width to the percentage of progress made
              }}
            ></div>
          </div>
        </div>
        <ImportingFiles handleFileUpload={handleFileUpload} />
      </div>
    </>
  );
}

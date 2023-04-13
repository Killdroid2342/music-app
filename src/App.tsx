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
          <Controls
            handleVolumeChange={handleVolumeChange}
            handlePlayPauseClick={handlePlayPauseClick}
            isPlaying={isPlaying}
            handleSkipBackwardClick={handleSkipBackwardClick}
            handleSkipForwardClick={handleSkipForwardClick}
          />
        </div>
        <ImportingFiles handleFileUpload={handleFileUpload} />
      </div>
    </>
  );
}

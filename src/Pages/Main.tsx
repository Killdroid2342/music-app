import React, { useState, useRef } from 'react';
import SavedSongs from '../components/SavedSongs';
import Controls from '../components/Controls';
import ImportingFiles from '../components/ImportingFiles';
import ProgressBar from '../components/ProgressBar';
import Nav from '../components/Nav';

export interface Song {
  name: string;
  dataUrl: string;
}

export default function Main(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  return (
    <>
      <h1 className='text-center text-3xl font-bold font-mono'>Music Player</h1>
      <Nav />

      <div className='flex flex-row'>
        <SavedSongs handleSongClick={handleSongClick} songs={songs} />
        <div className='border border-red-900 w-10/12 flex flex-col justify-center items-center'>
          <p className='text-2xl mt-40 h-96'>
            {currentSong?.name ?? 'Select Song'}
          </p>
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
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            songs={songs}
          />
          <ProgressBar
            progress={progress}
            currentSong={currentSong}
            audioRef={audioRef}
          />
        </div>
        <ImportingFiles songs={songs} setSongs={setSongs} />
      </div>
    </>
  );
}

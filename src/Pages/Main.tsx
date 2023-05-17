import React, { useState, useRef } from 'react';
import SavedSongs from '../components/SavedSongs';
import Controls from '../components/Controls';
import ImportingFiles from '../components/ImportingFiles';
import ProgressBar from '../components/ProgressBar';

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
      <div className='flex flex-row'>
        <ImportingFiles
          songs={songs}
          setSongs={setSongs}
          handleSongClick={handleSongClick}
        />
        <div className='h-screen w-10/12 flex flex-col justify-center items-center'>
          <p className='text-2xl'>{currentSong?.name ?? 'Select Song'}</p>

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
            progress={progress}
          />
        </div>

        <SavedSongs handleSongClick={handleSongClick} songs={songs} />
      </div>
    </>
  );
}

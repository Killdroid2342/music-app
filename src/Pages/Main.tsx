import { useState, useRef, useEffect } from 'react';
import SavedSongs from '../components/SavedSongs/SavedSongs';
import Controls from '../components/Controls';
import ImportingFiles from '../components/ImportingFiles';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';

export interface Song {
  pause(): unknown;
  currentTime: number;
  dataUrl: string;
  songname: string;
  UUID: string;
}

export default function Main(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [clientUsername, setClientUsername] = useState('');
  const [volume, setVolume] = useState(1);
  const [songname, setSongName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const isLoggedIn = !!clientUsername;

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSongName(name);
  };

  const usernameJWT = () => {
    const getJWT = Cookies.get('UserjwtToken');
    if (getJWT) {
      const decodedTokenUsername = (decodeToken(getJWT) as { username: string })
        .username;
      setClientUsername(decodedTokenUsername);
    } else return;
  };

  useEffect(() => {
    usernameJWT();
  });

  const choosingSong = async (UUID: string) => {
    try {
      const chosenSong = songs.find((song: Song) => {
        return UUID === song.UUID;
      });
      if (!chosenSong) {
        throw new Error('No song found');
      }
      setCurrentSong(chosenSong);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className='flex flex-row'>
        <ImportingFiles
          songs={[]}
          setSongs={setSongs}
          clientUsername={clientUsername}
          songname={songname}
          handleNameInput={handleNameInput}
          message={message}
          file={file}
          setFile={setFile}
          setMessage={setMessage}
          currentSong={currentSong}
          config={config}
          isLoggedIn={isLoggedIn}
        />
        <div className='h-screen w-10/12 flex flex-col justify-center items-center'>
          <p className='text-2xl'>
            {currentSong ? currentSong.songname : 'Select Song'}
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
            progress={progress}
            setVolume={setVolume}
            volume={volume}
          />
        </div>
        <SavedSongs
          clientUsername={clientUsername}
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          choosingSong={choosingSong}
          setSongs={setSongs}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </>
  );
}

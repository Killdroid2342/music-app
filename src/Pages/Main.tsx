import { useState, useRef, useEffect } from 'react';
import SavedSongs from '../components/SavedSongs';
import Controls from '../components/Controls';
import ImportingFiles from '../components/ImportingFiles';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import Auth from '../hooks/Auth';
const { VITE_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_API_URL,
});
export interface Song {
  pause(): unknown;
  currentTime: number;
  name: string;
  dataUrl: string;
  songName: string;
  musicFileName: string;
}

window.history.pushState(null, '', window.location.href);

window.onpopstate = function () {
  window.history.go(1);
};

export default function Main(): JSX.Element {
  Auth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [clientUsername, setClientUsername] = useState('');
  const [volume, setVolume] = useState(1);
  const [songName, setSongName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSongName(name);
  };

  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
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

  const choosingSong = async (musicFileName: string) => {
    if (currentSong) {
      currentSong.pause();
      currentSong.currentTime = 0;
    }

    try {
      const audio = new Audio(
        `${VITE_API_URL}/songs/song/${encodeURIComponent(musicFileName)}`
      );
      const song: Song = {
        songName: songName,
        pause: () => audio.pause(),
        currentTime: audio.currentTime,
        name: musicFileName,
        dataUrl: audio.src,
        musicFileName: '',
      };
      setCurrentSong(song);
    } catch (e) {
      console.log(e);
    }
  };

  const removeSong = async (index: number) => {
    const songToRemove = songs[index];
    if (songToRemove) {
      try {
        await instance.delete(
          `/songs/song/${encodeURIComponent(songToRemove.musicFileName)}`
        );
        setSongs((prevSongs) => prevSongs.filter((_, i) => i !== index));
      } catch (e) {
        console.log(e);
      }
    } else return;
  };
  return (
    <>
      <div className='flex flex-row'>
        <ImportingFiles
          songs={[]}
          setSongs={setSongs}
          clientUsername={clientUsername}
          songName={songName}
          handleNameInput={handleNameInput}
          message={message}
          file={file}
          setFile={setFile}
          setMessage={setMessage}
          currentSong={currentSong}
          config={config}
        />
        <div className='h-screen w-10/12 flex flex-col justify-center items-center'>
          <p className='text-2xl'>
            {currentSong ? currentSong.songName : 'Select Song'}
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
          handleSongClick={handleSongClick}
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          choosingSong={choosingSong}
          removeSong={removeSong}
        />
      </div>
    </>
  );
}

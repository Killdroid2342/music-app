import { useState, useRef, useEffect } from 'react';
import SavedSongs from '../components/SavedSongs';
import Controls from '../components/Controls';
import ImportingFiles from '../components/ImportingFiles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
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
}

window.history.pushState(null, '', window.location.href);

window.onpopstate = function () {
  window.history.go(1);
};

export default function Main(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [clientUsername, setClientUsername] = useState('');
  const [volume, setVolume] = useState(0);
  const [songName, setSongName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSongName(name);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (songName === '') {
      alert('ENTER NAME');
      return;
    }

    if (!file) {
      alert('CHOOSE YOUR MP3 FILE');
      return;
    }

    if (!file.type.startsWith('audio/')) {
      alert('This is not an audio file. Choose an audio file');
      return;
    }

    const formData = new FormData();
    formData.append('files', file);
    formData.append('songName', songName);
    formData.append('username', clientUsername);

    try {
      const { data } = await instance.post(
        '/songs/upload-song',
        formData,
        config
      );

      const musicFileName = data.musicFileName;
      console.log(musicFileName);
      setMessage(data.message);

      if (data.message === 'You have successfully uploaded song :)') {
        const newSong = {
          songName: songName,
          musicFileName: musicFileName,
          dataUrl: URL.createObjectURL(file),
        };
        setSongs((prevSongs: any[]) => [...prevSongs, newSong]);
        console.log(newSong);
        console.log(newSong.songName);
        console.log(songName);
      }

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (e) {
      console.log(e);
    }
    console.log(currentSong);
  };
  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const navigate = useNavigate();
  const backToHome = () => {
    Cookies.remove('UserjwtToken');
    navigate('/');
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
      console.log(currentSong);
    }
    console.log(currentSong);

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
      };
      setCurrentSong(song);
    } catch (e) {
      console.log(e);
    }
  };
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

  // submitting form
  return (
    <>
      <div className='flex flex-row'>
        <ImportingFiles
          songs={[]}
          setSongs={setSongs}
          clientUsername={clientUsername}
          songName={songName}
          handleNameInput={handleNameInput}
          handleFileUpload={handleFileUpload}
          handleSubmit={handleSubmit}
          message={message}
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
            handleVolumeChange={handleVolumeChange}
            volume={volume}
            handlePreviousSongClick={handlePreviousSongClick}
            handlePlayPauseClick={handlePlayPauseClick}
            handleNextSongClick={handleNextSongClick}
            handleRestartSongClick={handleRestartSongClick}
          />
        </div>

        <SavedSongs
          clientUsername={clientUsername}
          backToHome={backToHome}
          handleSongClick={handleSongClick}
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          choosingSong={choosingSong}
        />
      </div>
    </>
  );
}

import axios from 'axios';
import { useEffect } from 'react';
import { Song } from '../../Pages/Main';
const { VITE_API_URL } = import.meta.env;

const reformatSongs = (songs: any): Song[] => {
  let formattedSongs: Song[] = songs.map((song: any) => {
    const audio = new Audio(
      `https://killdroid2342musicfiles.s3.amazonaws.com/${song.UUID}`
    );

    return {
      songname: song.songname,
      pause: audio.pause,
      currentTime: audio.currentTime,
      dataUrl: audio.src,
      UUID: song.UUID,
    } as Song;
  });

  return formattedSongs;
};

const instance = axios.create({
  baseURL: VITE_API_URL,
});
export default function SavedSongs({
  clientUsername,
  songs,
  choosingSong,
  setMessage,
  setSongs,
}: any) {
  const gettingSongs = async (username: string) => {
    if (username) {
      const res = await instance.post(`songs/get-songs`, {
        clientUsername: username,
      });
      let userSongs = res.data.filter(
        (song: any) => song.username === username
      );
      userSongs = reformatSongs(userSongs);
      setSongs(userSongs);
    }
  };

  const removeSong = async (index: number) => {
    const songToRemove = songs[index];
    if (songToRemove) {
      try {
        const { data } = await instance.delete(
          `/songs/song/${encodeURIComponent(songToRemove.UUID)}`
        );
        setMessage(data.message);
        setTimeout(() => {
          setMessage('');
        }, 3000);
        setSongs((prevSongs: any[]) => prevSongs.filter((_, i) => i !== index));
      } catch (e) {
        console.log(e);
      }
    } else return;
  };

  useEffect(() => {
    gettingSongs(clientUsername);
  }, [clientUsername]);
  return (
    <div className='border border-white flex flex-col bg-neutral-700 text-center h-full overflow-y-auto'>
      <h2 className='text-xl font-bold'>This is your Queue</h2>
      {songs.map((song: any, index: number) => (
        <div className='flex justify-center items-center mt-5' key={index}>
          <p
            className='border cursor-pointer p-2 text-center'
            onClick={() => choosingSong(song.UUID)}
          >
            {song.songname}
          </p>
          <p
            className='border cursor-pointer p-2 ml-2 text-center'
            onClick={() => removeSong(index)}
          >
            x
          </p>
        </div>
      ))}
    </div>
  );
}

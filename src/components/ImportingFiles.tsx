import React, { useEffect, useState } from 'react';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export default function ImportingFiles({
  songs,
  setSongs,
  clientUsername,
}: any) {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });

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
      setMessage(data.message);

      if (data.message === 'You have successfully uploaded song :)') {
        const newSong = {
          songName: songName,
          musicFileName: musicFileName,
          dataUrl: URL.createObjectURL(file),
        };
        setSongs((prevSongs: any[]) => [...prevSongs, newSong]);
        console.log(newSong);
      }

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='border border-white p-2 w-56 flex flex-col bg-neutral-700'>
      <p className='font-bold mb-2 text-center text-xl'>Upload Songs Here</p>
      <form method='POST' action='' encType='multipart/form-data'>
        <input
          type='text'
          placeholder='Song Name'
          value={songName}
          onChange={handleNameInput}
          className='text-center border-2 border-white px-3 py-2 rounded-lg mb-2 cursor-pointer flex items-center justify-center bg-blur bg-black/80'
        />
        <input
          type='file'
          accept='audio/mpeg, audio/wav, audio/x-wav, audio/ogg'
          className='text-center border-2 border-white px-3 py-2 rounded-lg mb-2 cursor-pointer flex items-center justify-center bg-blur bg-black/80 w-full'
          onChange={handleFileUpload}
          name='files'
        />
        <input
          type='submit'
          className='text-center border-2 border-white px-3 py-2 rounded-lg mb-2 cursor-pointer flex items-center justify-center bg-blur bg-black/80 w-full'
          onClick={handleSubmit}
        />
      </form>
      <p className='font-bold text-2xl'>{message}</p>
    </div>
  );
}

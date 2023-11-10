import React, { useEffect, useState } from 'react';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export default function ImportingFiles({
  songname,
  handleNameInput,
  message,
  file,
  setFile,
  clientUsername,
  setMessage,
  setSongs,
  config,
  songs,
}: any) {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  console.log(songs);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const UUID = Date.now().toString();

    console.log('new UUID', UUID);
    if (songname === '') {
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
    formData.append('songname', songname);
    formData.append('username', clientUsername);
    formData.append('UUID', UUID);

    console.log(formData);
    try {
      const { data } = await instance.post(
        '/songs/upload-song',
        formData,
        config
      );
      console.log(config, 'THIS IS CONFIG');
      console.log(data, 'THIS IS DATA');

      setMessage(data.message);

      if (data.message === 'You have successfully uploaded song :)') {
        const newSong = {
          songname: songname,
          UUID: UUID,
          dataUrl: URL.createObjectURL(file),
        };
        console.log(newSong.dataUrl);
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
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  return (
    <div className='border border-white p-2 w-56 flex flex-col bg-neutral-700'>
      <p className='font-bold mb-2 text-center text-xl'>Upload Songs Here</p>
      <form method='POST' action='' encType='multipart/form-data'>
        <input
          type='text'
          placeholder='Song Name'
          value={songname}
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

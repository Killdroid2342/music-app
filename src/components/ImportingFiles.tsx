import React, { useState } from 'react';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;
import ImportingFilesAlert from './importFilesModal/ImportingFilesAlert';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
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
  isLoggedIn,
}: any) {
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [showFileAlert, setShowFileAlert] = useState(false);
  const [showTypeAlert, setShowTypeAlert] = useState(false);
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const naviagte = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (songname === '') {
      setShowNameAlert(true);
      setTimeout(() => {
        setShowNameAlert(false);
      }, 2000);
    }

    if (!file) {
      setShowFileAlert(true);
      setTimeout(() => {
        setShowFileAlert(false);
      }, 2000);
      return;
    }

    if (!file.type.startsWith('audio/')) {
      setShowTypeAlert(true);
      setTimeout(() => {
        setShowTypeAlert(false);
      }, 2000);
      return;
    }

    const formData = new FormData();
    formData.append('files', file);
    formData.append('songname', songname);
    formData.append('username', clientUsername);

    try {
      const { data } = await instance.post(
        '/songs/upload-song',
        formData,
        config
      );

      setMessage(data.message);

      if (data.message === 'You have successfully uploaded song :)') {
        const newSong = {
          songname: songname,
          dataUrl: URL.createObjectURL(file),
          UUID: data.UUID,
        };

        setSongs((prevSongs: any[]) => [...prevSongs, newSong]);
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
      {isLoggedIn ? (
        <div>
          {showNameAlert && (
            <ImportingFilesAlert message='Please enter a song name.' />
          )}
          {showFileAlert && (
            <ImportingFilesAlert message='Please choose an MP3 file.' />
          )}
          {showTypeAlert && (
            <ImportingFilesAlert message='Please choose an audio file.' />
          )}
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
          <Nav clientUsername={clientUsername} />
        </div>
      ) : (
        <p onClick={() => naviagte('/')} className='text-center cursor-pointer'>
          Please Click Here to upload Songs
        </p>
      )}
    </div>
  );
}

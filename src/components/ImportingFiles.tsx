import React, { useState } from 'react';
import { Song } from '../App';

const ImportingFiles = ({ songs, setSongs }: any) => {
  const [songName, setSongName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  const handleNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const name = event.target.value;
    setSongName(name);
  };

  const handleSubmit = (): void => {
    if (songName === '') {
      alert('ENTER NAME');
      return;
    }

    if (!file) {
      alert('CHOOSE YOUR MP3 FILE');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string | undefined;
      if (!result) return;

      const newSong: Song = {
        name: songName,
        dataUrl: result,
      };
      setSongs([...songs, newSong]);
      setSuccessMessage(` You have uploaded: "${songName}" :)`);
      setSongName('');
      setFile(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='border border-blue-900 w-56 flex flex-col'>
      <p>Upload Songs Here</p>
      <input
        type='text'
        placeholder='Song Name'
        value={songName}
        onChange={handleNameInput}
        className='text-black'
      />
      <input type='file' onChange={handleFileUpload} />
      <button className='border' onClick={handleSubmit}>
        Submit
      </button>
      {successMessage && <p className='text-green-500'>{successMessage}</p>}
    </div>
  );
};

export default ImportingFiles;

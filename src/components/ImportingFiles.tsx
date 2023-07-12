import React, { useEffect, useState } from 'react';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export default function ImportingFiles({
  songName,
  handleNameInput,
  handleFileUpload,
  handleSubmit,
  message,
}: any) {
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

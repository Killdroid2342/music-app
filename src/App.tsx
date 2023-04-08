import React from 'react';

export default function App() {
  return (
    <>
      <h1 className='text-center text-3xl font-bold font-mono'>Music Player</h1>
      <div className='flex flex-row h-screen'>
        <div className='border border-white'>
          <p>SONGS HERE</p>
          <div className='border border-white'></div>
          <div className='flex flex-col mt-10'>
            <h2>Songs Available</h2>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
            <p>Demo</p>
          </div>
          <div className='w-full border border-white'></div>
        </div>
        <div className='border border-red-900 w-10/12 flex flex-col justify-center items-center'>
          <p className='mt-4'>Song Name</p>
          <div className='border-dashed border border-purple-900 h-3/5 w-3/5 mt-4'>
            <p>IMG</p>
          </div>
          <div className='border border-white w-full flex flex-row justify-evenly'>
            <div className='border border-red-900'>Music Up/Down</div>
            <div className='flex flex-row border border-blue-400'>
              <p className='border border-blue-900'>{'<'}</p>
              <p className='border border-blue-900'>{'||'}</p>
              <p className='border border-blue-900'>{'>'}</p>
            </div>
            <div className='flex flex-row border border-green-400'>
              <p className='border border-green-900'>Back 10</p>

              <p className='border border-green-900'>Forward 10</p>
            </div>
          </div>
        </div>
        <div className='border border-blue-900 w-56'>
          <p>PUTTING SONGS HERE</p>
          <button className='border border-slate-300'>Choose file</button>
        </div>
      </div>
    </>
  );
}

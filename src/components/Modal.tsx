import React from 'react';

export default function Modal(props: any) {
  return (
    <div className='fixed inset-0 flex justify-center z-50  '>
      <p className='m-20 text-2xl text-neutral-800'>
        <span className='p-4 rounded-lg backdrop-blur bg-black/60 shadow-lg text-white'>
          {props.responseMessage}
        </span>
      </p>
    </div>
  );
}

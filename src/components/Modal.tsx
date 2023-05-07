import React from 'react';

export default function Modal(props: any) {
  return (
    <div className='flex justify-center items-center'>
      <p className='w-40 text-2xl'>{props.responseMessage}</p>
    </div>
  );
}

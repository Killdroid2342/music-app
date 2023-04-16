import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <form action='' className='flex flex-col border border-red-900 w-40'>
        <input
          type='text'
          className='border border-green-900 text-black'
          placeholder='Create Username'
        />
        <input
          type='password'
          className='border border-blue-900 text-black'
          placeholder='Create Password '
        />

        <button className='border border-white p-4'>Create Account</button>
      </form>
      <Link to='/'>Login</Link>
    </div>
  );
};

export default Register;

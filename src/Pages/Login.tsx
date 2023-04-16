import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <form action='' className='flex flex-col border border-red-900 w-40'>
        <input
          type='text'
          className='border border-green-900 text-black'
          placeholder='Enter Username'
        />
        <input
          type='password'
          className='border border-blue-900 text-black'
          placeholder='Enter Password '
        />
        <button>Log In</button>
      </form>
      <p>Have not got an account? Click the sign up button Below</p>
      <Link to='/register'>Sign-Up</Link>
    </div>
  );
};

export default Login;

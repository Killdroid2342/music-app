import React from 'react';

const Register = ({ handleRegisterSubmit, handleRegisterInputChange }: any) => {
  return (
    <div className='flex justify-center h-screen bg-screen'>
      <div className='my-auto p-4 w-96 rounded-lg bg-black bg-opacity-20 border border-white'>
        <h1 className='text-2xl my-8 text-hawkes-blue-500 text-center'>
          Register
        </h1>
        <form className='py-2' onSubmit={handleRegisterSubmit}>
          <div className='flex flex-col mx-auto w-fit'>
            <label htmlFor='' aria-hidden='true'>
              Username
            </label>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={handleRegisterInputChange}
              className='text-black'
            />
          </div>
          <div className='flex flex-col mx-auto w-fit'>
            <label htmlFor='' className='text-sm text-hawkes-blue-500'>
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleRegisterInputChange}
              className='text-black'
            />
          </div>
          <div className='flex flex-col mx-auto w-fit'>
            <input
              type='submit'
              value='Register'
              className='btn mt-6 cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

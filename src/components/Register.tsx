import React from 'react';

const Register = ({ handleRegisterSubmit, handleRegisterInputChange }: any) => {
  return (
    <div className='register'>
      <form className='form' onSubmit={handleRegisterSubmit}>
        <label htmlFor='chk' aria-hidden='true'>
          Register
        </label>
        <input
          className='input'
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleRegisterInputChange}
        />
        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleRegisterInputChange}
        />
        <input type='submit' value='Register' className='regButton' />
      </form>
    </div>
  );
};

export default Register;

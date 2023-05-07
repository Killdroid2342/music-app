import React from 'react';

const Login = ({ handleLoginSubmit, handleLoginInputChange }: any) => {
  return (
    <div className='login'>
      <form className='form' onSubmit={handleLoginSubmit}>
        <label htmlFor='chk' aria-hidden='true'>
          Log in
        </label>
        <input
          className='input'
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleLoginInputChange}
        />
        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleLoginInputChange}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;

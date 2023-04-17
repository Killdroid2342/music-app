import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className='main'>
        <input type='checkbox' id='chk' aria-hidden='true' />
        <div className='login'>
          <form className='form'>
            <label htmlFor='chk' aria-hidden='true'>
              Log in
            </label>
            <input
              className='input'
              type='email'
              name='email'
              placeholder='Email'
              required
            />
            <input
              className='input'
              type='password'
              name='pswd'
              placeholder='Password'
              required
            />
            <button type='submit'>Log in</button>
          </form>
        </div>

        <div className='register'>
          <form className='form'>
            <label htmlFor='chk' aria-hidden='true'>
              Register
            </label>
            <input
              className='input'
              type='text'
              name='txt'
              placeholder='Username'
              required
            />
            <input
              className='input'
              type='email'
              name='email'
              placeholder='Email'
              required
            />
            <input
              className='input'
              type='password'
              name='pswd'
              placeholder='Password'
              required
            />
            <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

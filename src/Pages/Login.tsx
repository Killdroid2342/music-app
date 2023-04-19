import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
  });

  function handleLoginSubmit(e: any) {
    e.preventDefault();
    console.log(loginData);
  }

  function handleLoginInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleRegisterSubmit(e: any) {
    e.preventDefault();
    console.log(registerData);
  }

  function handleRegisterInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <div className='main'>
        <input type='checkbox' id='chk' aria-hidden='true' />
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
            <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

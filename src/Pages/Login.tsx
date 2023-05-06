import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';

export default function Login() {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
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

  async function handleRegisterSubmit(e: any) {
    e.preventDefault();
    console.log(registerData);
    const res = await instance.post(
      'http://localhost:3000/user/register-user',
      {
        username: registerData.username,
        password: registerData.password,
      }
    );
    console.log(res);
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
            <input type='submit' value='Register' />
          </form>
        </div>
      </div>
    </>
  );
}

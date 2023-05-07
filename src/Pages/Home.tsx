import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Home() {
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

  const [modal, setModal] = useState(false);

  function handleLoginSubmit(e: React.ChangeEvent<HTMLInputElement>) {
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

  async function handleRegisterSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(registerData);
    const res = await instance.post(
      'http://localhost:3000/user/register-user',
      {
        username: registerData.username,
        password: registerData.password,
      }
    );

    // alert message
    setModal(res.data.message);
    setTimeout(() => {
      setModal(false);
    }, 1200);
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
      <div>
        <div className='w-40 text-center text-2xl'>{modal}</div>
      </div>
      <div className='main'>
        <input type='checkbox' id='chk' aria-hidden='true' />
        <Login
          handleLoginSubmit={handleLoginSubmit}
          handleLoginInputChange={handleLoginInputChange}
        />
        <Register
          handleRegisterSubmit={handleRegisterSubmit}
          handleRegisterInputChange={handleRegisterInputChange}
        />
      </div>
    </>
  );
}

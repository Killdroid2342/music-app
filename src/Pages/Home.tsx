import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';
import Login from '../components/Login';
import Register from '../components/Register';
import Modal from '../components/Modal';

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
      {modal !== false ? <Modal responseMessage={modal} /> : ''}

      <div className='flex'>
        <Login />
        <Register
          handleRegisterSubmit={handleRegisterSubmit}
          handleRegisterInputChange={handleRegisterInputChange}
        />
      </div>
    </>
  );
}

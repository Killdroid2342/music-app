import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';
import Login from '../components/Login';
import Register from '../components/Register';
import Modal from '../components/Modal';
import Cookies from 'js-cookie';

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
  const [form, setForm] = useState('Register');

  const navigate = useNavigate();

  const tokenVal = Cookies.get('UserjwtToken');

  const changeForm = () => {
    if (form === 'Register') {
      setForm('Login');
    } else {
      setForm('Register');
    }
  };
  async function handleRegisterSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const res = await instance.post('/user/register-user', {
      username: registerData.username,
      password: registerData.password,
    });
    setModal(res.data.message);
    setTimeout(() => {
      setModal(false);
    }, 1200);
  }

  async function handleLoginSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const res = await instance.post('/user/login-user', {
      username: loginData.username,
      clientpassword: loginData.password,
    });
    Cookies.set('UserjwtToken', res.data.token);

    setModal(res.data.message);
    setTimeout(() => {
      setModal(false);
    }, 1200);
  }

  async function handleAuth() {
    const res = await instance.post('/auth/validate-token', {
      token: tokenVal,
    });
    if (res.data.message === 'correct token') {
      navigate('/main');
    } else {
      return;
    }
  }

  useEffect(() => {
    handleAuth();
  }, []);

  function handleLoginInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleRegisterInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className='background'>
      {modal !== false ? <Modal responseMessage={modal} /> : ''}

      <div className='flex flex-col'>
        {form === 'Register' ? (
          <Login
            handleLoginSubmit={handleLoginSubmit}
            handleLoginInputChange={handleLoginInputChange}
            changeForm={changeForm}
            form={form}
          />
        ) : (
          <Register
            handleRegisterSubmit={handleRegisterSubmit}
            handleRegisterInputChange={handleRegisterInputChange}
            changeForm={changeForm}
            form={form}
          />
        )}
      </div>
    </div>
  );
}

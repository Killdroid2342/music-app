import axios from 'axios';
import React, { useState } from 'react';
const { VITE_API_URL } = import.meta.env;

const Register = ({ changeForm, form }: any) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
  });
  const [modal, setModal] = useState(false);
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  function handleRegisterInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
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
  return (
    <div className='flex justify-center h-screen'>
      <div className='my-auto p-4 w-96 rounded-lg border-2 border-black backdrop-blur bg-black/60'>
        <h1 className='text-2xl my-8 text-hawkes-blue-500 text-center font-bold'>
          Register
        </h1>
        <form className='py-2' onSubmit={handleRegisterSubmit}>
          <div className='flex flex-col mx-auto w-fit'>
            <label className='text-lg py-2 '>Username</label>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={handleRegisterInputChange}
              className='p-2 rounded-md text-black border border-black'
              required
            />
          </div>
          <div className='flex flex-col mx-auto w-fit'>
            <label className='text-lg py-2 pt-5'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleRegisterInputChange}
              className='p-2 rounded-md text-black border border-black'
              required
            />
          </div>
          <div className='flex flex-col mx-auto w-fit'>
            <input
              type='submit'
              value='Register'
              className='mt-10 text-xl cursor-pointer border-2 border-white p-3 rounded-lg'
            />
          </div>
        </form>
        <p
          onClick={changeForm}
          className='text-center mt-10 font-bold cursor-pointer'
        >{`Go To ${form}`}</p>
      </div>
    </div>
  );
};

export default Register;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Cookies from 'js-cookie';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

const Login = ({ form, changeForm }: any) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [modal, setModal] = useState(false);
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  function handleLoginInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    if (res.data.message === 'Correct details. Welcome') {
      setTimeout(() => {
        navigate('/main');
      }, 3000);
    } else return;
  }
  return (
    <>
      {modal !== false ? <Modal responseMessage={modal} /> : ''}
      <div className='flex justify-center h-screen'>
        <div className='my-auto p-4 w-96 rounded-lg border-2 border-black backdrop-blur bg-black/60'>
          <h1 className='text-2xl my-8 text-hawkes-blue-500 text-center font-bold'>
            Login
          </h1>
          <form className='py-2' onSubmit={handleLoginSubmit}>
            <div className='flex flex-col mx-auto w-fit'>
              <label className=' text-lg py-2'>Username</label>
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={handleLoginInputChange}
                className='p-2 rounded-md text-black border border-black'
                required
              />
            </div>
            <div className='flex flex-col mx-auto w-fit'>
              <label className=' text-lg py-2 pt-5 '>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleLoginInputChange}
                className='p-2 rounded-md text-black border border-black'
                required
              />
            </div>
            <div className='flex flex-col mx-auto w-fit'>
              <input
                type='submit'
                value='Login'
                className='mt-10 text-xl cursor-pointer border-2 border-white p-3 rounded-lg'
              />
            </div>
          </form>
          <p
            onClick={changeForm}
            className='text-center mt-10 font-bold cursor-pointer'
          >{`Go To ${form}`}</p>
          <p
            onClick={() => navigate('/main')}
            className='text-center mt-10 font-bold cursor-pointer'
          >
            Do not want to login? Click Here
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

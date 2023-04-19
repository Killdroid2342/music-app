import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  function handleInput(e: any) {
    e.preventDefault();
    console.log(loginData);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <div className='main'>
        <input type='checkbox' id='chk' aria-hidden='true' />
        <div className='login'>
          <form className='form' onSubmit={handleInput}>
            <label htmlFor='chk' aria-hidden='true'>
              Log in
            </label>
            <input
              className='input'
              type='text'
              name='username'
              placeholder='Username'
              onChange={handleInputChange}
            />
            <input
              className='input'
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleInputChange}
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

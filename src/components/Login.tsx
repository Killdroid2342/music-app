import React from 'react';

const Login = ({
  handleLoginSubmit,
  handleLoginInputChange,
  form,
  changeForm,
}: any) => {
  return (
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
      </div>
    </div>
  );
};

export default Login;

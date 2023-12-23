import { useState } from 'react';

import Login from '../components/Login';
import Register from '../components/Register';

export default function Home() {
  const [form, setForm] = useState('Register');

  const changeForm = () => {
    if (form === 'Register') {
      setForm('Login');
    } else {
      setForm('Register');
    }
  };

  return (
    <div className='background'>
      <div className='flex flex-col'>
        {form === 'Register' ? (
          <Login changeForm={changeForm} form={form} />
        ) : (
          <Register changeForm={changeForm} form={form} />
        )}
      </div>
    </div>
  );
}

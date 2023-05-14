import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='border border-white rounded-2xl text-center mb-5'>
      <ul className='justify-evenly'>
        <Link to={'/upload'} className='mr-40'>
          Upload Songs
        </Link>
        <Link to={'/'} className=''>
          Sign Out
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;

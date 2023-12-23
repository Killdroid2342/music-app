import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center h-screen'>
      <p onClick={() => navigate('/social')} className='p-5 text-2xl'>
        Social
      </p>
      <p onClick={() => navigate('/main')} className='p-5 text-2xl'>
        Music Page
      </p>
    </div>
  );
};

export default Navigation;

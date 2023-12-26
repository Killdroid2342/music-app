import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;

const AccountSettingsModal = ({
  setAccountSettingsModalOpen,
  clientUsername,
}: any) => {
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const closeModal = () => {
    setAccountSettingsModalOpen(false);
  };
  const backToHome = () => {
    Cookies.remove('UserjwtToken');
    navigate('/');
  };
  const deleteAccount = async () => {
    try {
      await instance.post('/user/delete-user', { username: clientUsername });
      backToHome();
    } catch (error) {
      console.error(error);
    }
  };
  const goToProfile = () => {
    navigate('/profile');
    setAccountSettingsModalOpen(false);
  };
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black'>
        <div className='bg-white p-4 rounded-lg overflow-auto max-h-96'>
          <button
            className='mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg'
            onClick={closeModal}
          >
            X
          </button>
          <p
            onClick={backToHome}
            className='border-2 border-black text-black rounded-2xl p-2 m-2 cursor-pointer font-bold'
          >
            Log Out
          </p>
          <p
            onClick={deleteAccount}
            className='border-2 border-black text-black rounded-2xl p-2 m-2 cursor-pointer font-bold'
          >
            Delete User
          </p>
          <p
            onClick={goToProfile}
            className='border-2 border-black text-black rounded-2xl p-2 m-2 cursor-pointer font-bold'
          >
            Profile
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountSettingsModal;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const { VITE_API_URL } = import.meta.env;

function Auth() {
  const [user, setUser] = useState('');
  const Nav = useNavigate();
  const checkToken = async () => {
    const cookieVal = Cookies.get('UserjwtToken');
    if (cookieVal !== undefined) {
      const instance = axios.create({ baseURL: VITE_API_URL });
      const res = await instance.post('/auth/validate-token', {
        isAuth: cookieVal,
      });
      if (res.data.isAuth == false) {
        Nav('/');
      }
      setUser(res.data.isAuth);
    } else {
      Nav('/');
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return user;
}
export default Auth;

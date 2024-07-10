import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';

import { authService } from '@/utils/services';
import { reset } from '@/store/authSlice';

function LogOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBlurred, setIsBlurred] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsBlurred(true);
    try {
      const response = await authService.logout();
      if (response) {
        dispatch(reset());
        toast.success('Logout Successful');
        navigate('/login');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsBlurred(false);
    }
  };

  return (
    <a
      onClick={handleLogout}
      className=""
    >
      <i className="feather-log-out font-xl text-white"></i>
    </a>
  );
}

export default LogOutButton;

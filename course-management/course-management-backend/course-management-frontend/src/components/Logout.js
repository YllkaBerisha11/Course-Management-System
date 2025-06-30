import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user');
    if (onLogout) onLogout();  // Fshi user state në App
    navigate('/login');
  }, [navigate, onLogout]);

  return null;
};

export default Logout;

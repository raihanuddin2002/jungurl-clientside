import { useContext } from 'react';
import { Auth } from '../context/AuthContext/AuthContext';

const useAuth = () => {
    return useContext(Auth);
};

export default useAuth;
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  console.log(useAuth)
  return authInfo;
};

export default useAuth;

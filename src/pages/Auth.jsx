import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState(initialMode);

  return mode === 'signup' ? <SignUp /> : <Login />;
};

export default Auth;

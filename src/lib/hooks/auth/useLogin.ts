import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  authTokenAtom,
  currentUserAtom,
} from '../../../global/atoms/AuthAtoms';
import { EMAIL_REGEX } from '../../../global/constants/utils';
import { loginApiReq } from '../../../api/requests/auth/auth-api-requests';
import { isLoginError, LoginErrorType } from '../../../api/types/auth';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../../../api/requests/profile/profile-api-requests';

let currentRefreshTimeout: NodeJS.Timeout | null = null;

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );

  const navigate = useNavigate();

  const [_, setAuthToken] = useRecoilState(authTokenAtom);
  const [__, setCurrentUser] = useRecoilState(currentUserAtom);

  const validatePassword = () => {
    let error = undefined;
    if (password.length < 6) {
      error = 'Password must have at least 6 characters';
    } else if (!password.match(/[a-z]/)) {
      error = 'Password must have at least one lowercase letter';
    } else if (!password.match(/[A-Z]/)) {
      error = 'Password must have at least one uppercase letter';
    } else if (!password.match(/\d/)) {
      error = 'Password must have at least one digit';
    } else if (!password.match(/[^\w\d]/)) {
      error = 'Password must have at least one non alphanumeric character';
    }

    setPasswordError(error);
    return !error;
  };

  const validateEmail = () => {
    const isValid = !!email.match(EMAIL_REGEX);
    setEmailError(isValid ? undefined : 'Invalid email');
    return isValid;
  };

  const signIn = async () => {
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();

    if (isPasswordValid && isEmailValid) {
      const res = await loginApiReq({ email, password });
      if (isLoginError(res)) {
        switch (res.type) {
          case LoginErrorType.INTERNAL_SERVER_ERROR: {
            //Set error on both fields, but show the message only on one
            setEmailError(res.message);
            setPasswordError('');
            break;
          }
          case LoginErrorType.UNKNOWN: {
            //Set error on both fields, but show the message only on one
            setEmailError(res.message);
            setPasswordError('');
            break;
          }
          case LoginErrorType.USER_NOT_FOUND: {
            setEmailError(res.message);
            break;
          }
          case LoginErrorType.WRONG_PASSWORD: {
            setPasswordError(res.message);
            break;
          }
        }
      } else {
        setAuthToken({
          token: res.accessToken,
          refresh: res.refreshToke,
        });

        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refresh', res.refreshToke);

        const profile = await getCurrentUser(res.accessToken);
        setCurrentUser(profile);

        // Periodically refresh the profile to check for notifications
        currentRefreshTimeout = setInterval(async () => {
          const profile = await getCurrentUser(res.accessToken);
          setCurrentUser(profile);
        }, 1000 * 60);

        navigate('/');
      }
    }
  };

  const signOut = () => {
    setCurrentUser(undefined);
    setAuthToken(undefined);
    if (currentRefreshTimeout) {
      clearInterval(currentRefreshTimeout);
    }
    navigate('/');
  };

  return {
    email,
    password,
    setPassword,
    setEmail,
    emailError,
    passwordError,
    signIn,
    signOut,
  };
}

import { useRecoilState } from 'recoil';
import {
  authTokenAtom,
  currentUserAtom,
} from '../../../global/atoms/AuthAtoms';
import { useEffect } from 'react';
import {
  LOCAL_STORAGE_REFRESH_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from '../../../global/constants/auth';
import useLogin from './useLogin';

export default function useRememberMe() {
  const [_, setAuthToken] = useRecoilState(authTokenAtom);

  const { fetchCurrentUser } = useLogin();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const refresh = localStorage.getItem(LOCAL_STORAGE_REFRESH_KEY);
    if (token && refresh) {
      fetchCurrentUser(token).then(() => {
        setAuthToken({
          token,
          refresh,
        });
      });
    }
  }, []);
}

import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import {
  authTokenAtom,
  currentUserAtom,
} from '../../../global/atoms/AuthAtoms';
import { useMutation } from 'react-query';
import {
  loginApiReq,
  registerApiReq,
} from '../../../api/requests/auth/auth-api-requests';
import { isLoginError, LoginBody, RegisterBody } from '../../../api/types/auth';

export default function useAuthCallbacks() {
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  /**
   * Registers a user
   * @Returns a list of errors
   */
  const register = useCallback(async (registerBody: RegisterBody) => {
    try {
      await registerApiReq(registerBody);
    } catch (e) {
      if (typeof e === 'string') {
        return [e];
      } else {
        return e;
      }
    }
  }, []);

  /**
   * Logs in the user
   * @Returns the current user if successful
   * @Throws the error that occurred if failed
   */
  const login = useCallback(
    async (loginData: LoginBody) => {
      const res = await loginApiReq(loginData);
      if (!isLoginError(res)) {
        setAuthToken({ token: res.accessToken, refresh: res.refreshToke });
        //TODO:Get the current user
      } else {
        throw res;
      }
    },
    [setAuthToken],
  );

  return {
    login,
    register,
  };
}

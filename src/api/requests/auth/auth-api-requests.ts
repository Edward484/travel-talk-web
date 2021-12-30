import { postRequest } from '../../utils/QueryClient';
import {
  LoginBody,
  LoginError,
  LoginErrorType,
  LoginResponse,
  RegisterBody,
} from '../../types/auth';
import axios from 'axios';

export async function registerApiReq(registerData: RegisterBody) {
  try {
    await postRequest('/Auth/register', registerData);
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const { data } = e.response;
      throw data;
    }
  }
}

export async function loginApiReq(
  loginData: LoginBody,
): Promise<LoginResponse | LoginError> {
  try {
    return await postRequest<LoginResponse, LoginBody>(
      '/Auth/login',
      loginData,
    );
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 404: {
          return {
            message: e.response.data.message,
            type: LoginErrorType.USER_NOT_FOUND,
          };
        }
        case 400: {
          return {
            message: e.response.data.message,
            type: LoginErrorType.WRONG_PASSWORD,
          };
        }
        case 500: {
          return {
            message: 'There was an error. Try again!',
            type: LoginErrorType.INTERNAL_SERVER_ERROR,
          };
        }
        default: {
          return {
            message: 'There was an error. Try again!',
            type: LoginErrorType.UNKNOWN,
          };
        }
      }
    } else {
      return {
        message: 'There was an error. Try again!',
        type: LoginErrorType.UNKNOWN,
      };
    }
  }
}

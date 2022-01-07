export type RegisterBody = {
  email: string;
  password: string;
  username: string;
};

export type RegisterError = string | { code: string; description: string }[];

export function isRegisterError(e: any): e is RegisterError {
  return (
    typeof e === 'string' ||
    (Array.isArray(e) && e.length > 0 && e[0].code !== undefined)
  );
}

export type LoginBody = {
  email: string;
  password: string;
};

export enum LoginErrorType {
  WRONG_PASSWORD,
  USER_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNKNOWN,
}

export type LoginResponse = {
  accessToken: string;
  refreshToke: string;
};

export type LoginError = {
  type: LoginErrorType;
  message: string;
};

export function isLoginError(e: any): e is LoginError {
  return !!(e as LoginError).type && (e as LoginError).message !== undefined;
}

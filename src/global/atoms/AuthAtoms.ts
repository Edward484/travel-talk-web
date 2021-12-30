import { atom } from 'recoil';
import { User } from '../../models/user';

export const CURRENT_USER_ATOM_KEY = 'current-user';
export const TOKEN_ATOM_KEY = 'api-token';

type AuthToken = {
  token: string;
  refresh: string;
};

export const currentUserAtom = atom<User | undefined>({
  key: CURRENT_USER_ATOM_KEY,
  default: undefined,
});

export const authTokenAtom = atom<AuthToken | undefined>({
  key: TOKEN_ATOM_KEY,
  default: undefined,
});

import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../../../global/atoms/AuthAtoms';

export default function useIsLoggedIn() {
  const authState = useRecoilValue(authTokenAtom);
  if (!authState) {
    return false;
  }
  return !!authState.token;
}

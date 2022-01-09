import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../../global/atoms/AuthAtoms';

export default function useIsLoggedIn() {
  const authState = useRecoilValue(authTokenAtom);
  console.log(authState);
  if (!authState) {
    return false;
  }
  return !!authState.token;
}

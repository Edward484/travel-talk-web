import { useQuery as useOgQuery } from 'react-query';
import { getRequest, queryClient } from '../utils/QueryClient';
import { authTokenAtom } from '../../global/atoms/AuthAtoms';
import { useRecoilValue } from 'recoil';
import { useCallback, useMemo } from 'react';

export default function useQuery<TData>(endpoint: string, key: string | any[]) {
  const authTokenData = useRecoilValue(authTokenAtom);
  const {
    data: axiosData,
    error,
    isError,
    isLoading,
    refetch,
  } = useOgQuery(key, () => getRequest<TData>(endpoint, authTokenData?.token));

  const data = useMemo(() => axiosData?.data, [axiosData]);
  const mutate = useCallback(
    (mutation: TData | ((prevData: TData | undefined) => TData)) => {
      queryClient.setQueryData<TData>(key, data => {
        if (typeof mutation === 'function') {
          return (mutation as Function)(data);
        } else {
          return mutation;
        }
      });
    },
    [axiosData],
  );

  return {
    axiosData,
    data,
    error,
    isError,
    isLoading,
    refetch,
    mutate,
  };
}

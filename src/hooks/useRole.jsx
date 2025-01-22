import { useQuery } from '@tanstack/react-query';
import { useAxiosPublic } from './axios/useAxios';
import useAuth from './useAuth';

const useRole = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const { data: currentUserRole, isPending: roleLoading } = useQuery({
    queryKey: ['currentUserRole', user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/role/${user?.email}`);
      return data;
    },
    enabled: !loading && !!user,
  });

  return { currentUserRole, roleLoading };
};

export default useRole;

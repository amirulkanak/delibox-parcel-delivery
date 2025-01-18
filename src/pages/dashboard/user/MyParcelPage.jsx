import { useQuery } from '@tanstack/react-query';
import MyParcelTable from './MyParcelTable';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import LoadingSpinner from '@/components/LoadingSpinner';

const MyParcelPage = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/bookedParcel/all');
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={30} />
      </div>
    );

  return (
    <section>
      <MyParcelTable parcelsData={parcels} />
    </section>
  );
};

export default MyParcelPage;

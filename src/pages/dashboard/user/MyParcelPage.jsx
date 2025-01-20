import { useQuery } from '@tanstack/react-query';
import MyParcelTable from './MyParcelTable';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MyParcelPage = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/bookedParcel/user-parcels');
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
      {parcels.length === 0 && (
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-2xl font-bold">No parcels found</h2>
          {/* Book parcel button to navigate */}
          <Button className="mt-4 bg-clr-primary/80 hover:bg-clr-primary text-clr-primary-text">
            <Link to={'/dashboard/book-parcel'}>Book Parcel</Link>
          </Button>
        </div>
      )}
      {parcels.length !== 0 && (
        <MyParcelTable parcelsData={parcels} refetch={refetch} />
      )}
    </section>
  );
};

export default MyParcelPage;

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useAxiosPublic } from '@/hooks/axios/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner';

const TopDeliveryManSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: deliveryMen, isLoading } = useQuery({
    queryKey: ['topDeliveryMen'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/users/top-delivery-man');
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );

  return (
    <section className="pt-20 pb-28 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-20">
          Top Delivery Men at <span className="text-indigo-500">Delibox</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryMen &&
            deliveryMen.map((man, _id) => (
              <Card
                key={_id}
                className="shadow-md hover:shadow-lg transition duration-300">
                <CardHeader className="flex flex-col items-center">
                  <img
                    src={man.photo}
                    alt={man.name}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <CardTitle className="text-xl font-bold">
                    {man.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <p className="text-gray-700">
                      Parcels Delivered:{' '}
                      <span className="font-bold">{man.deliveredParcel}</span>
                    </p>
                    <p className="text-gray-700">
                      Average Rating:{' '}
                      <span className="font-bold text-yellow-500">
                        {man.averageReview} ★
                      </span>
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TopDeliveryManSection;

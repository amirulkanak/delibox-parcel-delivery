import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessagesSquare, ShieldCheck, Truck } from 'lucide-react';
import CountUp from 'react-countup';
import LoadingSpinner from './LoadingSpinner';
import { useAxiosPublic } from '@/hooks/axios/useAxios';
import { useQuery } from '@tanstack/react-query';

const FeaturesSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: totalData, isLoading } = useQuery({
    queryKey: ['totalData'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/user-parcel/total');
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
    <section className="pt-28 pb-14 bg-[#f5f7fa]">
      <div className="container mx-auto px-6">
        {/* Features */}
        <h2 className="text-4xl font-bold text-center mb-20">
          Trusted{' '}
          <span className="underline underline-offset-4">Experience</span>
          <span className="text-clr-primary">.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Feature Card 1 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary/30 transition duration-300">
            <CardHeader>
              <div className="flex items-center justify-center bg-indigo-500 text-white rounded-full w-16 h-16 mb-4">
                <ShieldCheck size={40} />
              </div>
              <CardTitle className="text-xl">Parcel Safety</CardTitle>
              <CardDescription className="text-lg">
                Your parcels are handled with care, ensuring secure and safe
                delivery every time.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 2 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary/30 transition duration-300">
            <CardHeader>
              <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-16 h-16 mb-4">
                <Truck size={40} />
              </div>
              <CardTitle className="text-xl">Super Fast Delivery</CardTitle>
              <CardDescription className="text-lg">
                Enjoy blazing fast delivery speeds, making sure your parcel
                arrives on time.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 3 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary/30 transition duration-300">
            <CardHeader>
              <div className="flex items-center justify-center bg-yellow-500 text-white rounded-full w-16 h-16 mb-4">
                <MessagesSquare size={40} />
              </div>
              <CardTitle className="text-xl">24/7 Support</CardTitle>
              <CardDescription className="text-lg">
                Our support team is available around the clock to assist with
                your delivery needs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Statistics */}
        <p
          className="text-center text-xl mb-8 text-gray-600
        ">
          Our team has a wealth of experience in managing parcels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary transition duration-300 text-center p-6">
            <CardTitle className="text-2xl font-bold">
              Total Parcels Booked
            </CardTitle>
            <p className="text-4xl font-extrabold text-indigo-500">
              <CountUp end={totalData.totalBookedParcel} duration={2} />
            </p>
          </Card>

          {/* Stat Card 2 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary transition duration-300 text-center p-6">
            <CardTitle className="text-2xl font-bold">
              Total Parcels Delivered
            </CardTitle>
            <p className="text-4xl font-extrabold text-green-500">
              <CountUp end={totalData.totalDeliveredParcel} duration={2} />
            </p>
          </Card>

          {/* Stat Card 3 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary transition duration-300 text-center p-6">
            <CardTitle className="text-2xl font-bold">Total Users</CardTitle>
            <p className="text-4xl font-extrabold text-yellow-500">
              <CountUp end={totalData.totalUser} duration={2} />
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

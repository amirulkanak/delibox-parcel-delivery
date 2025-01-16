import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { MessagesSquare, ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const FeaturesSection = () => {
  // Simulating API Data (Replace with actual API calls)
  const [stats, setStats] = useState({
    parcelsBooked: 0,
    parcelsDelivered: 0,
    users: 0,
  });

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setStats({
        parcelsBooked: 120345,
        parcelsDelivered: 113678,
        users: 45237,
      });
    }, 1000); // Simulate network delay
  }, []);

  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="container mx-auto px-6">
        {/* Features */}
        <h2 className="text-5xl font-bold text-center mb-12">
          Trusted Experience<span className="text-clr-primary">.</span>
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
              <CountUp end={stats.parcelsBooked} duration={2} />
            </p>
          </Card>

          {/* Stat Card 2 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary transition duration-300 text-center p-6">
            <CardTitle className="text-2xl font-bold">
              Total Parcels Delivered
            </CardTitle>
            <p className="text-4xl font-extrabold text-green-500">
              <CountUp end={stats.parcelsDelivered} duration={2} />
            </p>
          </Card>

          {/* Stat Card 3 */}
          <Card className="shadow-md hover:shadow-lg hover:bg-clr-primary transition duration-300 text-center p-6">
            <CardTitle className="text-2xl font-bold">Total Users</CardTitle>
            <p className="text-4xl font-extrabold text-yellow-500">
              <CountUp end={stats.users} duration={2} />
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

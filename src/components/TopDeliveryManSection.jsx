import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

const TopDeliveryManSection = () => {
  const [deliveryMen, setDeliveryMen] = useState([
    {
      name: 'John Doe',
      image: '/path-to-image1.jpg',
      parcelsDelivered: 150,
      averageRating: 4.8,
    },
    {
      name: 'Jane Smith',
      image: '/path-to-image2.jpg',
      parcelsDelivered: 135,
      averageRating: 4.7,
    },
    {
      name: 'Alex Johnson',
      image: '/path-to-image3.jpg',
      parcelsDelivered: 120,
      averageRating: 4.5,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedData = [
        {
          name: 'John Doe',
          image: '/path-to-image1.jpg',
          parcelsDelivered: 150,
          averageRating: 4.8,
        },
        {
          name: 'Jane Smith',
          image: '/path-to-image2.jpg',
          parcelsDelivered: 135,
          averageRating: 4.7,
        },
        {
          name: 'Alex Johnson',
          image: '/path-to-image3.jpg',
          parcelsDelivered: 120,
          averageRating: 4.5,
        },
      ];

      // Sort based on parcels delivered and average rating
      fetchedData.sort(
        (a, b) =>
          b.parcelsDelivered - a.parcelsDelivered ||
          b.averageRating - a.averageRating
      );

      setDeliveryMen(fetchedData);
    }, 1000);
  }, []);

  return (
    <section className="py-28 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Top Delivery Men at <span className="text-indigo-500">Delibox</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryMen.map((man, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition duration-300">
              <CardHeader className="flex flex-col items-center">
                <img
                  src={man.image}
                  alt={man.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <CardTitle className="text-xl font-bold">{man.name}</CardTitle>
                <CardDescription className="mt-2">
                  <p className="text-gray-700">
                    Parcels Delivered:{' '}
                    <span className="font-bold">{man.parcelsDelivered}</span>
                  </p>
                  <p className="text-gray-700">
                    Average Rating:{' '}
                    <span className="font-bold text-yellow-500">
                      {man.averageRating.toFixed(1)} ★
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

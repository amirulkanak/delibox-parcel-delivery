import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Gift,
  FileText,
  Package,
  Watch,
  Smartphone,
  SquareMousePointer,
} from 'lucide-react';

const ParcelTypeSection = () => {
  return (
    <section className="pt-20 pb-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold">
          What We Can <span className="underline underline-offset-4">Send</span>
          <span className="text-clr-primary">?</span>
        </h2>
        <p className="text-lg mt-8">
          We handle a wide range of deliveries with care and security. Send
          anything from gifts to electronics!
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {parcelTypes.map((item) => (
          <Card
            key={item.title}
            className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-col items-center">
              <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full">
                {item.icon}
              </div>
              <CardTitle className="mt-4">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Parcel Types Data
const parcelTypes = [
  {
    title: 'Gift',
    icon: <Gift size={40} />,
    description:
      'Send surprises and gifts to your loved ones, safely and quickly.',
  },
  {
    title: 'Document',
    icon: <FileText size={40} />,
    description: 'Securely deliver important documents anywhere, anytime.',
  },
  {
    title: 'Package',
    icon: <Package size={40} />,
    description: 'Ship parcels of all sizes with ease and reliability.',
  },
  {
    title: 'Accessories',
    icon: <Watch size={40} />,
    description: 'Deliver fashion accessories, watches, and more hassle-free.',
  },
  {
    title: 'Electronics',
    icon: <Smartphone size={40} />,
    description: 'Send gadgets and electronics safely with secure handling.',
  },
  {
    title: 'Others',
    icon: <SquareMousePointer size={40} />,
    description: 'Deliver miscellaneous items with care and security.',
  },
];
export default ParcelTypeSection;

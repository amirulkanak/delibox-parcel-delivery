import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <section className="bg-indigo-500 text-white py-16 px-6 md:py-20 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Deliver Smarter with <span className="text-yellow-400">Delibox</span>
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl mb-6">
          Manage your parcel deliveries efficiently and securely. Join thousands
          of satisfied customers today!
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            className={cn(
              'bg-yellow-400 text-indigo-500 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition'
            )}>
            <Link to={'/login'}> Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;

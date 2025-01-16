import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <section className="relative h-[50.625rem] w-full bg-cover bg-center bg-hero-pattern">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#091B32] to-clr-primary2/10"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Heading */}
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Welcome to <span className="text-clr-primary">Delibox</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 text-white opacity-90">
          Your trusted parcel management service. Delivering excellence, one
          package at a time.
        </p>

        {/* Search Bar */}
        <div className="flex items-center max-w-md w-full bg-white border-none rounded-full overflow-hidden">
          <Input
            type="text"
            placeholder="Track your parcel..."
            className="w-full px-4 py-2 text-gray-800 border-none focus:ring-0"
          />
          <Button className="bg-clr-primary2 hover:bg-clr-primary hover:text-clr-primary-text text-white px-6 py-2 rounded-none">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Header;

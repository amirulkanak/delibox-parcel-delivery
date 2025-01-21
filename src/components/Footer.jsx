import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Github, Linkedin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith('/dashboard');
  return (
    <footer
      className={
        isDashboardPath
          ? 'hidden'
          : 'mt-auto bg-gray-900 text-white py-12 px-6 md:px-12'
      }>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Delibox</h3>
          <p className="text-sm text-gray-400 mb-4">
            Revolutionizing parcel delivery with fast, secure, and reliable
            services. Let’s make deliveries smarter!
          </p>
          <div className="flex space-x-4">
            <Link
              to={'https://bd.linkedin.com/in/amirulalamkanak'}
              className="text-gray-400 hover:text-white transition">
              <Linkedin size={20} />
            </Link>
            <Link
              to={'https://github.com/amirulkanak'}
              className="text-gray-400 hover:text-white transition">
              <Github size={20} />
            </Link>
            <Link
              to={'https://facebook.com/amirulalamkanak'}
              className="text-gray-400 hover:text-white transition">
              <Facebook size={20} />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <span className="hover:text-white transition">Home</span>
            </li>
            <li>
              <span className="hover:text-white transition">About</span>
            </li>
            <li>
              <span className="hover:text-white transition">Services</span>
            </li>
            <li>
              <span className="hover:text-white transition">Contact</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for updates and exclusive offers.
          </p>
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-gray-300 placeholder-gray-500 border-gray-700"
            />
            <Button
              variant="primary"
              className="bg-indigo-500 hover:bg-indigo-600">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-800 pt-4 text-sm text-gray-500 text-center">
        Designed and developed by{' '}
        <Link
          to="https://github.com/amirulkanak"
          className="italic hover:text-white transition underline">
          Amirul Kanak
        </Link>{' '}
        © {new Date().getFullYear()} Delibox. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

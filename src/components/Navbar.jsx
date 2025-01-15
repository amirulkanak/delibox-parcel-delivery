import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Bell, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const user = {
  name: 'John Doe',
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        controls.start({ y: 10 });
        setScrolled(true);
      } else {
        controls.start({ y: 20 });
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <motion.div
      initial={{ y: 10 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={`fixed w-full ${scrolled ? 'top-1' : 'top-5'}`}
      style={{ zIndex: 50 }}>
      <nav className="max-width-wrapper z-50 rounded-[0.5rem] text-white h-[5.6875rem] px-5 bg-gradient-to-r from-clr-primary-text from-75% to-[#636C3F] to-100% flex items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-4">
          <h1 className="text-4xl font-bold font-outfit bg-gradient-to-r text-transparent bg-clip-text from-white to-yellow-500">
            Deli
            <span>
              b<PackageOpen className="inline text-inherit text-yellow-400" />x
            </span>
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          <Button variant="ghost" className="text-xl font-medium">
            Home
          </Button>

          {/* Notification */}
          <Bell size={20} />

          {/* User Section */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.profilePicture}
                    alt="Profile Picture"
                  />
                  <AvatarFallback className="bg-transparent border border-white">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 text-clr-primary-text">
                <DropdownMenuLabel className="text-slate-500 text-md">
                  {user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full text-left">
                    Dashboard
                  </Link>
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  Logout
                  <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="lg"
              className="bg-clr-primary text-clr-primary-text text-lg font-bold"
              asChild>
              <Link to={'/login'}>Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;

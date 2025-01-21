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
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useAuth();
  const { toast } = useToast();
  const controls = useAnimation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        controls.start({ y: 8 });
        setScrolled(true);
      } else {
        controls.start({ y: 16 });
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const handleLogout = () => {
    logOut();
    toast({
      title: 'Logout Successful',
      description: 'See you soon!',
    });
  };

  const isDashboardPath = location.pathname.startsWith('/dashboard');

  const NavbarComponent = isDashboardPath ? 'div' : motion.div;

  return (
    <NavbarComponent
      {...(!isDashboardPath && {
        initial: { y: 8 },
        animate: controls,
        transition: { duration: 0.5 },
      })}
      className={`${
        isDashboardPath
          ? 'bg-gradient-to-r from-clr-primary-text from-75% to-[#636C3F] to-100%'
          : scrolled
          ? 'fixed w-full top-1'
          : 'fixed w-full top-5'
      }`}
      style={{ zIndex: isDashboardPath ? 'auto' : 50 }}>
      <nav
        className={`max-width-wrapper rounded-[0.5rem] text-white px-5 py-3 sm:py-8 flex flex-col sm:flex-row gap-y-2 items-center justify-between ${
          !isDashboardPath &&
          'bg-gradient-to-r from-clr-primary-text from-75% to-[#636C3F] to-100%'
        }`}>
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-yellow-500' : 'text-white'
              }>
              Home
            </NavLink>
          </Button>

          {/* Notification */}
          <Bell size={20} />

          {/* User Section */}
          {user?.displayName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photoURL} alt="Profile Picture" />
                  <AvatarFallback className="bg-transparent border border-white">
                    {user?.displayName[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 text-clr-primary-text">
                <DropdownMenuLabel className="text-slate-500 text-md">
                  {user?.displayName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full text-left">
                    Dashboard
                  </Link>
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                  <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="lg"
              className="bg-clr-primary text-clr-primary-text hover:bg-white text-lg font-bold"
              asChild>
              <Link to={'/login'}>Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </NavbarComponent>
  );
};

export default Navbar;

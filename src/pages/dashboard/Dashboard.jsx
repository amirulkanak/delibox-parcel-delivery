import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import useRole from '@/hooks/useRole';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarMenu from './SideMenu';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUserRole, roleLoading } = useRole();
  const { user, logOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  // Dynamically change the document title based on the user role
  document.title = `${
    currentUserRole?.role === 'deliveryMan'
      ? 'Delivery Man'
      : currentUserRole?.role.charAt(0).toUpperCase() +
        currentUserRole?.role.slice(1)
  }'s dashboard | Delibox`;

  const handleLogout = () => {
    logOut();
    toast({
      title: 'Logout Successful',
      description: 'See you soon!',
    });
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'bg-gray-800 text-white flex flex-col transition-all duration-300',
            collapsed ? 'w-16 items-center' : 'w-64'
          )}>
          {/* Toggle Button */}
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setCollapsed((prev) => !prev)}>
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </Button>
          </div>

          {/* Menu */}
          {!roleLoading && (
            <div className="p-4">
              <SidebarMenu
                userType={currentUserRole.role}
                collapsed={collapsed}
              />
            </div>
          )}

          {/* User Profile */}
          <div className="mt-auto flex items-center p-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.photoURL} alt="User Avatar" />
                    <AvatarFallback>
                      {user?.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className=" flex flex-col items-start">
                      <p className="text-sm font-medium">{user?.displayName}</p>
                      <p className="text-sm font-medium">{user?.email}</p>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-clr-primary2 min-w-20 p-4 rounded-lg flex flex-col gap-5"
                side="right"
                align="end"
                sideOffset={4}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Button variant="ghost" onClick={handleLogout}>
                    <LogOut />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 min-h-[calc(100vh-var(--navbar-height))] bg-gray-100">
          {currentUserRole?.role !== 'admin' &&
            location.pathname === '/dashboard' && (
              <div className="mt-4 flex flex-col items-center justify-center min-h-[50svh] gap-4">
                <h2 className="text-center text-2xl">Welcome to</h2>
                <h2 className="text-xl font-bold">Delibox Dashboard</h2>
              </div>
            )}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;

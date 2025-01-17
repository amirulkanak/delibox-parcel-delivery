import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './SideMenu';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = {
    type: 'user', // user type: user, deliveryMan, admin
    email: 'ak@gmail.com',
  };
  return (
    <>
      <div className="py-16 bg-gray-800"></div>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'bg-gray-800 text-white min-h-screen flex flex-col transition-all duration-300',
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
          <div className="p-4">
            <SidebarMenu userType={user.type} collapsed={collapsed} />
          </div>

          {/* User Profile */}
          <div className="mt-auto flex items-center p-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src="/path-to-user-avatar.jpg"
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div>
                      <p className="text-sm font-medium">{user.email}</p>
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
                  <Button variant="ghost">
                    <User />
                    My Profile
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Button variant="ghost">
                    <LogOut />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;

import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Package, List, User, Users, BarChart } from 'lucide-react'; // Import icons
import { Tooltip } from 'react-tooltip';

const SidebarMenu = ({ userType, collapsed }) => {
  // Menu items based on user type
  const menus = {
    user: [
      {
        name: 'Book a Parcel',
        route: '/dashboard/book-parcel',
        icon: <Package size={20} />,
      },
      {
        name: 'My Parcels',
        route: '/dashboard/my-parcels',
        icon: <List size={20} />,
      },
      {
        name: 'My Profile',
        route: '/dashboard/my-profile',
        icon: <User size={20} />,
      },
    ],
    deliveryMan: [
      {
        name: 'My Delivery List',
        route: '/dashboard/delivery-list',
        icon: <List size={20} />,
      },
      {
        name: 'My Reviews',
        route: '/dashboard/my-reviews',
        icon: <BarChart size={20} />,
      },
    ],
    admin: [
      {
        name: 'All Parcels',
        route: '/dashboard/all-parcels',
        icon: <Package size={20} />,
      },
      {
        name: 'All Users',
        route: '/dashboard/all-users',
        icon: <Users size={20} />,
      },
      {
        name: 'All Delivery Men',
        route: '/dashboard/all-delivery-men',
        icon: <User size={20} />,
      },
      {
        name: 'Statistics',
        route: '/dashboard',
        icon: <BarChart size={20} />,
      },
    ],
  };

  return (
    <ul>
      {menus[userType]?.map((menu, index) => (
        <li key={index} className="mb-4">
          <NavLink
            to={menu.route}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-2 rounded text-sm font-medium transition-colors',
                isActive
                  ? 'bg-clr-primary2/50 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              )
            }
            data-tooltip-id="index"
            data-tooltip-content={collapsed ? menu.name : undefined} // Tooltip when collapsed
          >
            <span className="mr-3">{menu.icon}</span>
            {!collapsed && menu.name}
          </NavLink>
        </li>
      ))}
      {/* Tooltip */}
      {collapsed && <Tooltip id="index" effect="solid" place="right" />}
    </ul>
  );
};

export default SidebarMenu;

import LoadingSpinner from '@/components/LoadingSpinner';
import useRole from '@/hooks/useRole';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const { currentUserRole, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return currentUserRole.role === 'user' ? (
    children
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default UserRoute;

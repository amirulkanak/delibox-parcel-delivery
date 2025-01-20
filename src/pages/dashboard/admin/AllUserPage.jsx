import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

const AllUserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const { toast } = useToast();

  const {
    data: allUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allUser'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users/user/all');
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={30} />
      </div>
    );

  // Pagination
  const usersPerPage = 5;
  const paginatedUsers = allUser.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  const totalPages = Math.ceil(allUser.length / usersPerPage);

  const handleMakeDeliveryMan = async (userId) => {
    const { data } = await axiosSecure.patch(`/users/update/role/${userId}`, {
      role: 'deliveryMan',
    });

    if (data.modifiedCount > 0) {
      toast({
        description: 'User role updated successfully',
      });
      refetch();
    }
  };
  const handleMakeAdmin = async (userId) => {
    const { data } = await axiosSecure.patch(`/users/update/role/${userId}`, {
      role: 'admin',
    });

    if (data.modifiedCount > 0) {
      toast({
        description: 'User role updated successfully',
      });
      refetch();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Parcels Booked</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.photo} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {user.name}
                      <Badge variant="custom" size="sm" className="ml-2">
                        {user.role === 'admin'
                          ? 'Admin'
                          : user.role === 'deliveryMan'
                          ? 'Delivery Man'
                          : 'User'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.phone === 'not available' ? (
                  <Badge variant="secondary">Not Available</Badge>
                ) : (
                  user.phone
                )}
              </TableCell>
              <TableCell>{user.bookedParcel}</TableCell>
              <TableCell>{user.totalSpent} Tk</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleMakeDeliveryMan(user._id)}
                  disabled={user.role === 'deliveryMan'}>
                  Make Delivery Man
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleMakeAdmin(user._id)}
                  disabled={user.role === 'admin'}>
                  Make Admin
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </Button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <Button
          variant="ghost"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllUserPage;

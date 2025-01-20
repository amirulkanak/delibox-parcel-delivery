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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MapView from './MapView';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import useRole from '@/hooks/useRole';
import { useToast } from '@/hooks/useToast';

const DeliveryListPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { currentUserRole } = useRole();
  const axiosSecure = useAxiosSecure();
  const { toast } = useToast();

  const {
    data: deliveryParcelData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/bookedParcel/deliveryMan/${currentUserRole.userId}`
      );
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={30} />
      </div>
    );

  const handleCancel = async (id) => {
    const { data } = await axiosSecure.patch(`/bookedParcel/cancel/${id}`);

    if (data.modifiedCount > 0) {
      toast({
        description: 'Parcel canceled successfully',
      });
      refetch();
    }
  };

  const handleDeliver = async (id) => {
    const { data } = await axiosSecure.patch(`/bookedParcel/deliver/${id}`);

    if (data.modifiedCount > 0) {
      toast({
        description: 'Parcel deliver successfully',
      });
      refetch();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen overflow-auto">
      <h1 className="text-2xl font-bold mb-4">My Delivery List</h1>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booked User</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Approximate Delivery Date</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveryParcelData.map((parcel) => (
            <TableRow key={parcel._id}>
              <TableCell>
                <p className="font-medium">{parcel.user.name}</p>
                <p className="text-sm text-gray-500">{parcel.user.phone}</p>
              </TableCell>
              <TableCell>
                {new Date(parcel.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(parcel.approximateDeliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <p className="font-medium">{parcel.receiverDetails.name}</p>
                <p className="text-sm text-gray-500">
                  {parcel.receiverDetails.phone}
                </p>
                <p className="text-sm text-gray-500">
                  {parcel.receiverDetails.address}
                </p>
              </TableCell>
              <TableCell className="space-x-2">
                {/* View Location Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setSelectedLocation({
                          latitude: parcel.receiverDetails.latitude,
                          longitude: parcel.receiverDetails.longitude,
                        })
                      }>
                      View Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="text-center">
                    <DialogHeader>
                      <DialogTitle>Receiver&apos;s Location</DialogTitle>
                    </DialogHeader>
                    {selectedLocation && (
                      <MapView
                        latitude={selectedLocation.latitude}
                        longitude={selectedLocation.longitude}
                      />
                    )}
                  </DialogContent>
                </Dialog>

                {/* Cancel Button */}
                <Button
                  variant="destructive"
                  disabled={
                    parcel.status === 'delivered' ||
                    parcel.status === 'cancelled'
                  }
                  onClick={() => handleCancel(parcel._id)}>
                  Cancel
                </Button>

                {/* Deliver Button */}
                <Button
                  disabled={
                    parcel.status === 'delivered' ||
                    parcel.status === 'cancelled'
                  }
                  onClick={() => handleDeliver(parcel._id)}>
                  Deliver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeliveryListPage;

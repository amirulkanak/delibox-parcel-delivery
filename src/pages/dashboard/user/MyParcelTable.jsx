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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import CancelAlertDialog from '../CancelAlertDialog';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import { useToast } from '@/hooks/useToast';
import GiveReviewModal from './GiveReviewModal';
import useAuth from '@/hooks/useAuth';

const MyParcelTable = ({ parcelsData, refetch }) => {
  const [filter, setFilter] = useState('');
  const axiosSecure = useAxiosSecure();
  const { toast } = useToast();
  const { user } = useAuth();
  const currentUser = {
    name: user?.displayName,
    photo: user?.photoURL,
  };

  // Filtered parcels
  const filteredParcels = parcelsData.filter((parcel) =>
    filter ? parcel.status.toLowerCase() === filter.toLowerCase() : true
  );

  const handleCancel = async (id) => {
    const { data } = await axiosSecure.patch(`/bookedParcel/cancel/${id}`);

    if (data.modifiedCount > 0) {
      toast({
        description: 'Parcel booking canceled successfully',
      });
      refetch();
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    const { data } = await axiosSecure.post('/review/add', reviewData);
    if (data.acknowledged) {
      toast({
        title: 'Success',
        description: 'Review submitted successfully',
      });
    }
  };

  const handlePay = () => {
    toast({
      title: 'Payment',
      description: 'Payment feature is not available yet',
    });
  };

  return (
    <div className="container p-6 bg-gray-50 min-h-screen min-w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <Label>Status:</Label>
        <Input
          type="text"
          placeholder="e.g., pending, delivered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parcel Type</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Approximate Delivery Date</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Delivery Men ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParcels.map((parcel) => (
            <TableRow key={parcel._id}>
              <TableCell>{parcel.parcelDetails.parcelType}</TableCell>
              <TableCell>
                {new Date(parcel.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {parcel.status === 'cancelled' ? (
                  '- - -'
                ) : parcel.approximateDeliveryDate === 'processing' ? (
                  <Badge variant="secondary">Processing</Badge>
                ) : (
                  new Date(parcel.approximateDeliveryDate).toLocaleDateString()
                )}
              </TableCell>
              <TableCell>
                {new Date(parcel.bookedDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {parcel.status === 'cancelled' ? (
                  '- - -'
                ) : parcel.deliveryMenID === 'processing' ? (
                  <Badge variant="secondary">Processing</Badge>
                ) : (
                  parcel.deliveryMenID
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    parcel.status === 'pending'
                      ? 'outline'
                      : parcel.status === 'delivered'
                      ? 'default'
                      : parcel.status === 'On the way'
                      ? 'secondary'
                      : 'destructive'
                  }>
                  {/* capitalize */}
                  {parcel.status.charAt(0).toUpperCase() +
                    parcel.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                {/* Update Button */}
                <Button disabled={parcel.status !== 'pending'}>
                  <Link to={`/dashboard/update-parcel/${parcel._id}`}>
                    Update
                  </Link>
                </Button>

                {/* Cancel Button */}
                <CancelAlertDialog onConfirm={() => handleCancel(parcel._id)}>
                  <Button
                    variant="destructive"
                    disabled={parcel.status !== 'pending'}>
                    Cancel
                  </Button>
                </CancelAlertDialog>

                {/* Review Button */}
                {parcel.status === 'delivered' && (
                  <GiveReviewModal
                    user={currentUser}
                    deliveryManId={parcel.deliveryMenID}
                    onSubmit={handleReviewSubmit}
                  />
                )}

                {/* Pay Button */}
                {parcel.status === 'delivered' || (
                  <Button
                    disabled={parcel.status === 'canceled'}
                    onClick={handlePay}
                    className="bg-clr-primary/80 hover:bg-clr-primary text-clr-primary-text">
                    Pay
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyParcelTable;

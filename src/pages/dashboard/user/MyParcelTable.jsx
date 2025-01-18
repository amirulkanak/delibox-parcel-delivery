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

// Sample data from the backend

const MyParcelTable = ({ parcelsData }) => {
  const [filter, setFilter] = useState('');
  const [parcels, setParcels] = useState(parcelsData);

  // Filtered parcels
  const filteredParcels = parcels.filter((parcel) =>
    filter ? parcel.status.toLowerCase() === filter.toLowerCase() : true
  );

  const handleUpdate = (id) => {
    console.log(`Updating parcel with ID: ${id}`);
  };

  const handleCancel = (id) => {
    console.log(`Cancelling parcel with ID: ${id}`);
  };

  const handleReview = (id) => {
    console.log(`Reviewing parcel with ID: ${id}`);
  };

  const handlePay = (id) => {
    console.log(`Paying for parcel with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
              <TableCell>{parcel.deliveryDate}</TableCell>
              <TableCell>
                {parcel.approximateDeliveryDate === 'Not Assigned' ? (
                  <Badge variant="secondary">Not Assigned</Badge>
                ) : (
                  new Date(parcel.approximateDeliveryDate).toLocaleDateString()
                )}
              </TableCell>
              <TableCell>
                {new Date(parcel.bookedDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {parcel.deliveryMenID === 'Not Assigned' ? (
                  <Badge variant="secondary">Not Assigned</Badge>
                ) : (
                  parcel.deliveryMenID
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    parcel.status === 'pending'
                      ? 'default'
                      : parcel.status === 'delivered'
                      ? 'success'
                      : 'warning'
                  }>
                  {parcel.status}
                </Badge>
              </TableCell>
              <TableCell className="space-x-2">
                {/* Update Button */}
                <Button
                  disabled={parcel.status !== 'pending'}
                  onClick={() => handleUpdate(parcel._id)}>
                  Update
                </Button>

                {/* Cancel Button */}
                <Button
                  variant="destructive"
                  disabled={parcel.status !== 'pending'}
                  onClick={() => handleCancel(parcel._id)}>
                  Cancel
                </Button>

                {/* Review Button */}
                {parcel.status === 'delivered' && (
                  <Button
                    variant="secondary"
                    onClick={() => handleReview(parcel._id)}>
                    Review
                  </Button>
                )}

                {/* Pay Button */}
                <Button
                  onClick={() => handlePay(parcel._id)}
                  className="bg-clr-primary/80 hover:bg-clr-primary text-clr-primary-text">
                  Pay
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyParcelTable;

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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/useToast';
import { DialogClose } from '@radix-ui/react-dialog';

const AllParcelPage = () => {
  const [searchRange, setSearchRange] = useState({ from: '', to: '' });
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null);
  const [approximateDeliveryDate, setApproximateDeliveryDate] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { toast } = useToast();

  const {
    data: allParcelAndDeliveryMen,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allParcelAndDeliveryMen'],
    queryFn: async () => {
      const [parcelsResponse, deliveryMenResponse] = await Promise.all([
        axiosSecure.get('/bookedParcel/admin/all'),
        axiosSecure.get('/users/deliveryMan'),
      ]);

      const parcelsData = parcelsResponse.data;
      const deliveryMenData = deliveryMenResponse.data;

      setFilteredParcels(parcelsData);

      return { parcelsData, deliveryMenData };
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={30} />
      </div>
    );

  // Search by date range
  const handleSearch = () => {
    if (searchRange.from && searchRange.to) {
      const fromDate = new Date(searchRange.from);
      const toDate = new Date(searchRange.to);

      const filtered = allParcelAndDeliveryMen.parcelsData.filter((parcel) => {
        const deliveryDate = new Date(parcel.deliveryDate);
        return deliveryDate >= fromDate && deliveryDate <= toDate;
      });

      setFilteredParcels(filtered);
    } else {
      setFilteredParcels(allParcelAndDeliveryMen.parcelsData);
    }
  };

  // Handle assigning a delivery man and date
  const handleAssign = async (parcelId) => {
    if (!selectedDeliveryMan || !approximateDeliveryDate) {
      toast({
        title: 'Error',
        description: 'Please select a delivery date and delivery Man',
      });
      return;
    }

    const { data } = await axiosSecure.patch(
      `/bookedParcel/assign/${parcelId}`,
      {
        status: 'On the way',
        deliveryManID: selectedDeliveryMan,
        approximateDeliveryDate,
      }
    );
    if (data.modifiedCount > 0) {
      refetch();
      toast({
        title: 'Success',
        description: 'Delivery Assigned Successfully',
      });
      setApproximateDeliveryDate(null);
      setSelectedDeliveryMan(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Parcels</h1>

      {/* Search System */}
      <div className="flex items-end gap-4 mb-6">
        <div>
          <Label>From</Label>
          <Input
            type="date"
            value={searchRange.from}
            onChange={(e) =>
              setSearchRange({ ...searchRange, from: e.target.value })
            }
          />
        </div>
        <div>
          <Label>To</Label>
          <Input
            type="date"
            value={searchRange.to}
            onChange={(e) =>
              setSearchRange({ ...searchRange, to: e.target.value })
            }
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User&apos;s Name</TableHead>
            <TableHead>User&apos;s Phone</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParcels.map((parcel) => (
            <TableRow key={parcel._id}>
              <TableCell>{parcel.user.name}</TableCell>
              <TableCell>{parcel.user.phone}</TableCell>
              <TableCell>
                {new Date(parcel.bookedDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(parcel.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{parcel.price} Tk</TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {parcel.status}
                </Badge>
              </TableCell>
              <TableCell>
                {/* Manage Button with Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Manage</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Delivery Man</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Select Delivery Man */}
                      <div>
                        <Label>Delivery Man</Label>
                        <Select
                          onValueChange={(value) =>
                            setSelectedDeliveryMan(value)
                          }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Delivery Man" />
                          </SelectTrigger>
                          <SelectContent>
                            {allParcelAndDeliveryMen.deliveryMenData.map(
                              (man) => (
                                <SelectItem key={man._id} value={man._id}>
                                  {man.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Approximate Delivery Date */}
                      <div>
                        <Label>Approximate Delivery Date</Label>
                        <Input
                          type="date"
                          value={approximateDeliveryDate}
                          onChange={(e) =>
                            setApproximateDeliveryDate(e.target.value)
                          }
                        />
                      </div>

                      {/* Assign Button */}
                      <DialogClose asChild>
                        <Button onClick={() => handleAssign(parcel._id)}>
                          Assign
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllParcelPage;

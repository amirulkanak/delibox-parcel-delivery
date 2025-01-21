import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAxiosSecure } from '@/hooks/axios/useAxios';

const AllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allDeliveryMen, isLoading } = useQuery({
    queryKey: ['alldeliveryMan'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users/delivery-man/all');
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={30} />
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Delivery Men</h1>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Delivery Man</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Parcels Delivered</TableHead>
            <TableHead>Average Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDeliveryMen.map((man) => (
            <TableRow key={man._id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={man.photo} alt={man.name} />
                    <AvatarFallback>{man.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {man.name}
                      <Badge variant="custom" size="sm" className="ml-2">
                        Delivery Man
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{man.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {man.phone === 'not available' ? (
                  <Badge variant="secondary">Not Available</Badge>
                ) : (
                  man.phone
                )}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{man.deliveredParcel}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{man.averageReview} ★</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllDeliveryMen;

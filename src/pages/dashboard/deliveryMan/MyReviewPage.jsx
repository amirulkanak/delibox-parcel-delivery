import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import useRole from '@/hooks/useRole';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';

const MyReviewPage = () => {
  const { currentUserRole } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: allReviews, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/reviews/deliveryMan/${currentUserRole.userId}`
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      {/* No Reviews */}
      {!allReviews || allReviews.length === 0 ? (
        <div className="">
          <p className="text-gray-700">No reviews yet</p>
        </div>
      ) : null}

      {/* Reviews Grid */}
      {allReviews && allReviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((review) => (
            <Card
              key={review._id}
              className="shadow-md hover:shadow-lg transition bg-gradient-to-b from-sky-400/50 to-sky-200">
              <CardHeader className="flex items-center gap-4">
                {/* User's Avatar */}
                <Avatar>
                  <AvatarImage src={review.userImage} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div>
                  <CardTitle>{review.userName}</CardTitle>
                  <CardDescription className="text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Review Content */}
              <CardContent>
                {/* Rating */}
                <div className="mb-2">
                  <Badge variant="outline">{review.rating} ★</Badge>
                </div>

                {/* Feedback */}
                <p className="text-gray-700">{review.feedback}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviewPage;

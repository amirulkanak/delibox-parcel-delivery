import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

// Sample Reviews Data
const reviews = [
  {
    id: 1,
    name: 'Jhon Doe',
    image: 'https://i.ibb.co/RYm32bX/user1.jpg',
    rating: 5,
    feedback:
      'Amazing service! My parcel was delivered on time without any hassle.',
    date: '2025-01-21',
  },
  {
    id: 2,
    name: 'Alice Johnson',
    image: 'https://i.ibb.co/YtpRQms/user2.jpg',
    rating: 4,
    feedback: 'Great experience! Customer support was very responsive.',
    date: '2025-01-18',
  },
  {
    id: 3,
    name: 'Michael Smith',
    image: 'https://i.ibb.co.com/wJRD6N5/user6.jpg',
    rating: 5,
    feedback: 'Fast and secure delivery. Highly recommended!',
    date: '2025-01-15',
  },
];

const ReviewSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold">
          What Our Customers{' '}
          <span className="underline underline-offset-4">Say</span>
          <span className="text-clr-primary">.</span>
        </h2>
        <p className="text-lg mt-12">
          Real reviews from our happy customers who trust Delibox for their
          parcel deliveries.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto mb-20">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="w-20 h-20 border-4 border-indigo-500 shadow">
                <AvatarImage src={review.image} alt={review.name} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{review.name}</CardTitle>
              <p className="text-sm text-gray-500">{review.date}</p>
            </CardHeader>
            <CardContent className="text-center">
              {/* Star Ratings */}
              <div className="flex justify-center mb-2">
                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-gray-700">{review.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;

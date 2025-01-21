import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';

const GiveReviewModal = ({ user, deliveryManId, onSubmit }) => {
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ratingNum = Number(rating);
    if (ratingNum < 0.1 || ratingNum > 5) {
      toast({ description: 'Rating must be between 0.1 and 5' });
      return;
    }

    const reviewData = {
      userName: user.name,
      userImage: user.photo,
      deliveryManId,
      rating: ratingNum,
      feedback,
    };
    onSubmit(reviewData);
    setFeedback('');
    setRating('');
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          className="bg-clr-primary/80 hover:bg-clr-primary text-clr-primary-text"
          variant="outline">
          Review
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Give Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User's Name and Image */}
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.photo} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Label>User&apos;s Name</Label>
              <Input value={user.name} readOnly className="bg-gray-100" />
            </div>
          </div>

          {/* Delivery Man ID */}
          <div>
            <Label>Delivery Man&apos;s ID</Label>
            <Input value={deliveryManId} readOnly className="bg-gray-100" />
          </div>

          {/* Rating Input */}
          <div>
            <Label>Rating (out of 5)</Label>
            <Input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter a rating between 1 and 5"
              required
            />
          </div>

          {/* Feedback Textarea */}
          <div>
            <Label>Feedback</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              required
            />
          </div>

          {/* Submit Button */}

          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GiveReviewModal;

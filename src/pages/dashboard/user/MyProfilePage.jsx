import LoadingSpinner from '@/components/LoadingSpinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import uploadImage from '@/utils/uploadImage';
import { X } from 'lucide-react';
import { useState } from 'react';

const MyProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const axiosSecure = useAxiosSecure();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    if (!selectedImage) {
      toast({
        title: 'Error',
        description: 'Please select a profile photo.',
      });
      setLoading(false);
      return;
    }
    try {
      const imageUrl = await uploadImage(selectedImage);
      // Update user profile with name and photoURL
      await updateUserProfile(user.displayName, imageUrl);

      const { data } = await axiosSecure.patch(
        `/users/update/photo/${user.email}`,
        {
          photo: imageUrl,
        }
      );
      if (data.modifiedCount > 0) {
        toast({
          title: 'Success',
          description: 'Profile photo updated successfully.',
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Failed to update profile photo.',
        description: error.message,
      });
    } finally {
      setSelectedFile(null);
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-40 md:h-64 bg-indigo-500">
        <img
          src="https://i.ibb.co.com/jZ9TbYg/my-pro-cover.jpg" // Replace with an actual cover image
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <Card className="relative -mt-20 md:-mt-28 max-w-3xl mx-auto p-6 bg-white shadow-lg">
        <CardHeader className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.photoURL} alt={user.displayName} />
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            {/* Upload Button */}
            <div className="absolute bottom-0 right-0">
              <Label
                htmlFor="profilePic"
                className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded-md">
                Change
              </Label>
              <Input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Selected Image Preview */}
          {selectedFile && (
            <div className="relative mt-4">
              <img
                src={selectedFile}
                alt="Selected"
                className="w-32 h-32 rounded-full border border-gray-200 shadow"
              />
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                onClick={handleRemoveFile}>
                <X size={16} />
              </button>
            </div>
          )}

          {/* Name and Email */}
          <div className="mt-4 text-center">
            <CardTitle>{user.displayName}</CardTitle>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </CardHeader>

        {/* Details */}
        <CardContent className="mt-6 space-y-4">
          <Button
            onClick={handleProfileUpdate}
            className="w-full bg-clr-primary/50 hover:bg-clr-primary/60 text-clr-primary-text"
            disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Update Profile'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfilePage;

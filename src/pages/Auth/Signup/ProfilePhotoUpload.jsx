import { useState } from 'react';
import { X } from 'lucide-react';

const ProfilePhotoUpload = ({ setSelectedImage }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative">
        {image ? (
          <div className="relative w-24 h-24">
            <img
              src={image}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full border border-gray-300"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600">
              <X size={14} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="profile-upload"
            className="w-24 h-24 flex items-center justify-center bg-clr-primary2/10 rounded-full border border-gray-300 cursor-pointer hover:bg-gray-300">
            <span className="text-sm text-gray-500">Select Photo</span>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>
      <span>Profile Photo</span>
    </div>
  );
};

export default ProfilePhotoUpload;

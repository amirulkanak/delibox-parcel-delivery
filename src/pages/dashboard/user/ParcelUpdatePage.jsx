import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { useAxiosSecure } from '@/hooks/axios/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';

const ParcelUpdatePage = () => {
  const [loadingIcon, setLoadingIcon] = useState(false);
  const parcelID = useParams().id;
  const axiosSecure = useAxiosSecure();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    parcelType: '',
    parcelWeight: '',
    receiverName: '',
    receiverPhoneNumber: '',
    deliveryAddress: '',
    deliveryDate: '',
    latitude: '',
    longitude: '',
    price: '',
  });

  const [errors, setErrors] = useState({});

  const { data: parcelData, isLoading } = useQuery({
    queryKey: ['parcel', parcelID],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookedParcel/${parcelID}`);
      return data;
    },
  });

  useEffect(() => {
    if (parcelData) {
      setFormData({
        name: parcelData.user.name,
        email: parcelData.user.email,
        phoneNumber: parcelData.user.phone,
        parcelType: parcelData.parcelDetails.parcelType,
        parcelWeight: parcelData.parcelDetails.parcelWeight,
        receiverName: parcelData.receiverDetails.name,
        receiverPhoneNumber: parcelData.receiverDetails.phone,
        deliveryAddress: parcelData.receiverDetails.address,
        deliveryDate: parcelData.deliveryDate,
        latitude: parcelData.receiverDetails.latitude,
        longitude: parcelData.receiverDetails.longitude,
        price: parcelData.price,
      });
    }
  }, [parcelData]);

  const calculatePrice = (weight) => {
    if (weight <= 1) return 50;
    if (weight <= 2) return 100;
    return 150;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === 'parcelWeight') {
        const weight = parseFloat(value) || 0;
        updatedData.price = calculatePrice(weight);
      }

      return updatedData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phoneNumber)
      newErrors.phoneNumber = 'Phone number is required.';
    if (!formData.parcelType) newErrors.parcelType = 'Parcel type is required.';
    if (!formData.parcelWeight || isNaN(Number(formData.parcelWeight)))
      newErrors.parcelWeight = 'Parcel weight must be a valid number.';
    if (!formData.receiverName)
      newErrors.receiverName = "Receiver's name is required.";
    if (!formData.receiverPhoneNumber)
      newErrors.receiverPhoneNumber = "Receiver's phone number is required.";
    if (!formData.deliveryAddress)
      newErrors.deliveryAddress = 'Delivery address is required.';
    if (!formData.deliveryDate)
      newErrors.deliveryDate = 'Delivery date is required.';
    if (!formData.latitude || isNaN(Number(formData.latitude)))
      newErrors.latitude = 'Latitude must be a valid number.';
    if (!formData.longitude || isNaN(Number(formData.longitude)))
      newErrors.longitude = 'Longitude must be a valid number.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingIcon(true);

    if (!validateForm()) {
      setLoadingIcon(false);
      return;
    }

    const parcelData = {
      ...formData,
      parcelWeight: parseFloat(formData.parcelWeight),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    try {
      const { data } = await axiosSecure.patch(
        `/bookedParcel/update/${parcelID}`,
        parcelData
      );
      if (data.modifiedCount > 0) {
        toast({ description: 'Parcel updated successfully!' });
        setLoadingIcon(false);
        navigate('/dashboard/my-parcels');
      } else {
        toast({
          description: 'Failed to book parcel. Please try again.',
          variant: 'destructive',
        });
        setLoadingIcon(false);
      }
    } catch (error) {
      console.error('Error booking parcel:', error);
      toast({
        description: 'An error occurred. Please try again later.',
        variant: 'destructive',
      });
      setLoadingIcon(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl text-center">Update Parcel</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (Read-Only) */}
          <div>
            <Label>Name</Label>
            <Input value={formData.name} readOnly className="bg-gray-100" />
          </div>

          {/* Email (Read-Only) */}
          <div>
            <Label>Email</Label>
            <Input value={formData.email} readOnly className="bg-gray-100" />
          </div>

          {/* Other Fields */}
          {[
            { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
            { label: 'Parcel Type', name: 'parcelType', type: 'text' },
            {
              label: 'Parcel Weight (kg)',
              name: 'parcelWeight',
              type: 'number',
            },
            { label: "Receiver's Name", name: 'receiverName', type: 'text' },
            {
              label: "Receiver's Phone Number",
              name: 'receiverPhoneNumber',
              type: 'text',
            },
            {
              label: 'Delivery Address',
              name: 'deliveryAddress',
              type: 'textarea',
            },
            {
              label: 'Requested Delivery Date',
              name: 'deliveryDate',
              type: 'date',
            },
            {
              label: 'Delivery Address Latitude',
              name: 'latitude',
              type: 'number',
            },
            {
              label: 'Delivery Address Longitude',
              name: 'longitude',
              type: 'number',
            },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <Label>{label}</Label>
              {type === 'textarea' ? (
                <Textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full"
                />
              ) : (
                <Input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full"
                />
              )}
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Price (Read-Only) */}
          <div>
            <Label>Price (Tk)</Label>
            <Input value={formData.price} readOnly className="bg-gray-100" />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-clr-primary-text bg-clr-primary/80 hover:bg-clr-primary">
            {loadingIcon ? <LoadingSpinner /> : 'Update Parcel'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParcelUpdatePage;
